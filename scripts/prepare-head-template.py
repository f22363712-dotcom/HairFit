"""Derive the head/shoulders and fitted eyes from MakeHuman's CC0 graphical assets.

Inputs in ignored test-assets/head-reference; no user photos or MakeHuman program code.
"""
from pathlib import Path
import json
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / 'test-assets/head-reference'
OUT = ROOT / 'src/assets/head-template.js'
SCALE = .72
CENTER = np.array([0, 6.955, .56])

def obj(path, body_only=False):
    vertices, faces, uvs, uv_faces = [], [], [], []
    group = ''
    for line in path.read_text().splitlines():
        p = line.split()
        if not p: continue
        if p[0] == 'v': vertices.append(list(map(float, p[1:4])))
        if p[0] == 'vt': uvs.append(list(map(float, p[1:3])))
        if p[0] == 'g': group = p[1]
        if p[0] == 'f' and (not body_only or group == 'body'):
            faces.append([int(s.split('/')[0]) - 1 for s in p[1:]])
            uv_faces.append([int(s.split('/')[1]) - 1 for s in p[1:]])
    return np.array(vertices), faces, np.array(uvs), uv_faces

def pack(vertices, faces, uvs, uv_faces):
    used = sorted({(i, uv) for f, uf in zip(faces, uv_faces) for i, uv in zip(f, uf)})
    mapping = {pair: j for j, pair in enumerate(used)}
    normals = np.zeros_like(vertices)
    indices = []
    for f, uf in zip(faces, uv_faces):
        for j in range(1, len(f) - 1):
            tri = [f[0], f[j], f[j + 1]]
            n = np.cross(vertices[tri[1]] - vertices[tri[0]], vertices[tri[2]] - vertices[tri[0]])
            for i in tri: normals[i] += n
            indices.extend([mapping[(f[k], uf[k])] for k in [0, j, j + 1]])
    lengths = np.linalg.norm(normals, axis=1)
    normals /= np.maximum(lengths[:, None], 1e-9)
    vi, ui = np.array(used).T
    return {'positions': np.round(vertices[vi], 5).flatten().tolist(), 'indices': indices,
            'uvs': np.round(uvs[ui], 6).flatten().tolist(), 'normals': np.round(normals[vi], 6).flatten().tolist()}

base, faces, uvs, uv_faces = obj(INPUT / 'base.obj', True)
# Core graphical target supplies an adult male facial/jaw shape; it is not a fit to a user.
for line in (INPUT / 'asian-male-young.target').read_text().splitlines():
    p = line.split()
    if p and p[0].isdigit(): base[int(p[0])] += np.array(p[1:4], dtype=float)
selected_ids = [i for i,f in enumerate(faces) if min(base[v, 1] for v in f) >= 4.7]
selected = [faces[i] for i in selected_ids]
# Flatten only the open torso/arm cut edge into a level display-bust base.
# Facial openings and the anatomical jaw/neck remain untouched.
edges = {}
for f in selected:
    for a, b in zip(f, f[1:] + f[:1]):
        edge = tuple(sorted((a, b)))
        edges[edge] = edges.get(edge, 0) + 1
for (a, b), count in edges.items():
    if count == 1 and max(base[a, 1], base[b, 1]) < 5.2:
        base[a, 1] = base[b, 1] = 4.7
transformed = (base - CENTER) * SCALE
head = pack(transformed, selected, uvs, [uv_faces[i] for i in selected_ids])

# Fit the separately authored eyes using their asset's barycentric binding.
# A raw OBJ uses a different authoring pose; simply translating it is incorrect.
_, eye_faces, eye_uvs, eye_uv_faces = obj(INPUT / 'eyes.obj')
scales, fitted, active = np.ones(3), [], False
for line in (INPUT / 'eyes.mhclo').read_text().splitlines():
    p = line.split()
    if not p: continue
    if p[0] in ['x_scale', 'y_scale', 'z_scale']:
        axis = ['x_scale', 'y_scale', 'z_scale'].index(p[0])
        a, b = int(p[1]), int(p[2])
        scales[axis] = abs(base[a, axis] - base[b, axis]) / float(p[3])
    elif p[0] == 'verts': active = True
    elif active and p[0].isdigit() and len(p) == 9:
        ids = np.array(p[:3], dtype=int)
        weights = np.array(p[3:6], dtype=float)
        offset = np.array(p[6:9], dtype=float)
        fitted.append((base[ids] * weights[:, None]).sum(axis=0) + offset * scales)
    elif active: break
eyes_raw = (np.array(fitted) - CENTER) * SCALE
eyes = pack(eyes_raw, eye_faces, eye_uvs, eye_uv_faces)
eyes['centers'] = [np.round((eyes_raw[eyes_raw[:, 0] * sign > 0].min(axis=0) + eyes_raw[eyes_raw[:, 0] * sign > 0].max(axis=0)) / 2, 5).tolist() for sign in [-1, 1]]

# Radial scalp samples keep the existing editable hair attached to the new mesh.
# This lookup is for growth/collision, never a replacement for the rendered face.
positions = np.array(head['positions']).reshape(-1, 3)
triangles = positions[np.array(head['indices']).reshape(-1, 3)]
triangles = triangles[triangles[:, :, 1].max(axis=1) > -.65]
v0, e1, e2 = triangles[:, 0], triangles[:, 1] - triangles[:, 0], triangles[:, 2] - triangles[:, 0]
tvec = -v0
qvec = np.cross(tvec, e1)
longitude, latitude = 64, 32
radii = []
for iy in range(latitude + 1):
    theta = np.pi * iy / latitude
    for ix in range(longitude):
        phi = 2 * np.pi * ix / longitude
        direction = np.array([np.sin(theta) * np.cos(phi), np.cos(theta), np.sin(theta) * np.sin(phi)])
        pvec = np.cross(np.broadcast_to(direction, e2.shape), e2)
        det = np.einsum('ij,ij->i', e1, pvec)
        inv = np.divide(1., det, out=np.zeros_like(det), where=abs(det) > 1e-9)
        u = np.einsum('ij,ij->i', tvec, pvec) * inv
        v = (qvec @ direction) * inv
        t = np.einsum('ij,ij->i', e2, qvec) * inv
        hits = t[(abs(det) > 1e-9) & (u >= -1e-6) & (v >= -1e-6) & (u + v <= 1 + 1e-6) & (t > 0)]
        radius = hits.max() if len(hits) else 1 / np.sqrt((direction[0] / .54) ** 2 + (direction[1] / .89) ** 2 + (direction[2] / .66) ** 2)
        radii.append(round(float(radius), 5))

data = {'head': head, 'eyes': eyes, 'scalp': {'longitude': longitude, 'latitude': latitude, 'radii': radii}}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text('// Derived from MakeHuman hm08 base + high-poly eyes, CC0-1.0.\n// See public/models/head-template-provenance.json. Regenerate with scripts/prepare-head-template.py.\nexport const headTemplate=' + json.dumps(data, separators=(',', ':')) + ';\n')
print(json.dumps({'vertices': len(head['positions']) // 3, 'triangles': len(head['indices']) // 3, 'eyeVertices': len(eyes['positions']) // 3, 'eyeCenters': eyes['centers'], 'bytes': OUT.stat().st_size}))
