import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CameraSession } from '../lib/camera-session.js';
import { HandTracker } from '../lib/hand-tracker.js';
import { PinchGesture } from '../lib/pinch-gesture.js';
import { GesturePipeline } from '../lib/gesture-pipeline.js';
import { GestureDiagnostics } from '../lib/gesture-diagnostics.js';
import { createStudioFrameLoop } from '../lib/studio-frame-loop.js';
import { createModelConditionedGroom } from '../lib/model-conditioned-groom.js';
import { createConsultationCard, showConsultationCard } from '../lib/consultation-card.js';

/** Each copy includes every ancestor transform before a shared normalization. */
export function bakeReconstructedParts(source, height = 2.5) {
  source.updateMatrixWorld(true);
  const parts = [];
  const box = new THREE.Box3();
  source.traverse(node => {
    if (!node.isMesh || !node.geometry?.getAttribute('position')) return;
    const geometry = node.geometry.clone().applyMatrix4(node.matrixWorld);
    // Reflections reverse triangle winding, while transformed normals still point outward.
    if (node.matrixWorld.determinant() < 0) {
      if (geometry.index) {
        for (let i = 0; i < geometry.index.count; i += 3) {
          const second = geometry.index.getX(i + 1);
          geometry.index.setX(i + 1, geometry.index.getX(i + 2));
          geometry.index.setX(i + 2, second);
        }
      } else {
        const attributes = [...Object.values(geometry.attributes), ...Object.values(geometry.morphAttributes).flat()];
        for (const attribute of attributes) {
          for (let i = 0; i < attribute.count; i += 3) {
            for (let component = 0; component < attribute.itemSize; component++) {
              const second = attribute.getComponent(i + 1, component);
              attribute.setComponent(i + 1, component, attribute.getComponent(i + 2, component));
              attribute.setComponent(i + 2, component, second);
            }
          }
        }
      }
    }
    if (!geometry.getAttribute('normal')) geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    box.union(geometry.boundingBox);
    parts.push({ name: node.name || `部件 ${parts.length + 1}`, geometry });
  });
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  if (!parts.length || ![size.x, size.y, size.z, center.x, center.y, center.z].every(Number.isFinite) || size.y <= 0) {
    parts.forEach(part => part.geometry.dispose());
    throw new Error('模型没有可显示的几何部件');
  }
  const matrix = new THREE.Matrix4().makeRotationY(-Math.PI / 2)
    .multiply(new THREE.Matrix4().makeScale(height / size.y, height / size.y, height / size.y))
    .multiply(new THREE.Matrix4().makeTranslation(-center.x, -center.y, -center.z));
  for (const part of parts) {
    part.geometry.applyMatrix4(matrix);
    part.geometry.computeBoundingBox();
    part.geometry.computeBoundingSphere();
  }
  return parts;
}

export function copyCutPacket(geometry) {
  const position = geometry.getAttribute('position'), normal = geometry.getAttribute('normal');
  const pack = attribute => {
    const values = new Float32Array(attribute.count * 3);
    for (let i = 0; i < attribute.count; i++) {
      values[i * 3] = attribute.getX(i);
      values[i * 3 + 1] = attribute.getY(i);
      values[i * 3 + 2] = attribute.getZ(i);
    }
    return values;
  };
  const index = geometry.index ? new Uint32Array(geometry.index.count) : null;
  if (index) for (let i = 0; i < index.length; i++) index[i] = geometry.index.getX(i);
  return {
    positions: pack(position),
    normals: pack(normal),
    index
  };
}

function resultGeometry(packet) {
  if (!(packet?.positions instanceof Float32Array) || !(packet.normals instanceof Float32Array)
    || packet.positions.length !== packet.normals.length || packet.positions.length % 9
    || packet.positions.length > 3_000_000 || !packet.positions.every(Number.isFinite)
    || !packet.normals.every(Number.isFinite)
    || (packet.index !== null && !(packet.index instanceof Uint32Array))) throw new Error('试剪结果无效，原模型已保留');
  if (packet.index && (packet.index.length % 3 || packet.index.some(i => i >= packet.positions.length / 3))) throw new Error('试剪结果索引无效');
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(packet.positions, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(packet.normals, 3));
  if (packet.index) geometry.setIndex(new THREE.BufferAttribute(packet.index, 1));
  if (packet.positions.length) { geometry.computeBoundingBox(); geometry.computeBoundingSphere(); }
  return geometry;
}

function disposeSource(source) {
  const geometries = new Set(), materials = new Set(), textures = new Set();
  source.traverse(node => {
    if (node.geometry) geometries.add(node.geometry);
    for (const material of Array.isArray(node.material) ? node.material : [node.material]) {
      if (!material) continue;
      materials.add(material);
      Object.values(material).forEach(value => { if (value?.isTexture) textures.add(value); });
    }
  });
  geometries.forEach(item => item.dispose()); materials.forEach(item => item.dispose()); textures.forEach(item => item.dispose());
}

export function createReconstructedScene(root, sessionStore) {
  const job = sessionStore.state.reconstruction;
  const controller = new AbortController();
  const listen = (node, name, fn, options = {}) => node.addEventListener(name, fn, { ...options, signal: controller.signal });
  root.innerHTML = `<section class="reconstructed-studio" data-model-ready="false" data-cut-count="0" data-cut-busy="false">
    <style>
      .reconstructed-studio{height:100%;min-height:720px;background:#111a17;color:#f2efe7;padding:24px;box-sizing:border-box;font-family:inherit}
      .reconstructed-studio button,.reconstructed-studio select{font:inherit;background:#263b32;color:#f2efe7;border:1px solid #738579;border-radius:8px;padding:9px 13px;cursor:pointer}
      .reconstructed-studio button:disabled{opacity:.4;cursor:default}.reconstructed-studio header,.reconstructed-tools,.reconstructed-views{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
      .reconstructed-studio h2{margin:0;font-size:24px}.reconstructed-layout{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:20px;margin-top:20px}
      .reconstructed-viewport{position:relative;min-width:0;height:min(68vh,780px);min-height:450px;border-radius:16px;overflow:hidden;background:#17221d}
      .reconstructed-viewport canvas{display:block;width:100%;height:100%;touch-action:none}.reconstructed-sidebar{display:flex;flex-direction:column;gap:14px}.reconstructed-sidebar p{margin:0;line-height:1.6;font-size:14px}
      .reconstructed-source{width:112px;height:140px;object-fit:contain;background:#263b32;border-radius:8px}.reconstructed-sidebar label{display:grid;gap:8px;font-size:14px}
      .reconstructed-camera{width:100%;max-height:180px;object-fit:contain;transform:scaleX(-1);border-radius:8px}.reconstructed-camera[hidden]{display:none}
      .reconstructed-aim{position:absolute;width:24px;height:24px;border:2px solid #ecd5a7;border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;box-shadow:0 0 0 2px #14251d}
      .reconstructed-status{min-height:25px;margin-top:12px;color:#e8d6b7}.reconstructed-report{width:100%;height:120px;box-sizing:border-box;background:#0e1511;color:#d2dfd5;font:11px monospace;border:1px solid #617269;border-radius:6px}
      .reconstructed-muted{color:#b7c5ba}.reconstructed-studio select{max-width:100%}@media(max-width:760px){.reconstructed-layout{grid-template-columns:1fr}.reconstructed-studio{padding:14px}.reconstructed-viewport{height:58vh}.reconstructed-sidebar{max-width:100%}}
    </style>
    <header><button type="button" data-action="back">返回预览</button><h2>重建模型试剪</h2><span data-source-label></span></header>
    <div class="reconstructed-layout"><div><div class="reconstructed-viewport"><span class="reconstructed-aim" hidden></span></div>
    <div class="reconstructed-status" role="status" aria-live="polite">正在读取重建模型…</div>
    <div class="reconstructed-views"><button data-view="front">正面</button><button data-view="left">左侧</button><button data-view="right">右侧</button><button data-view="back">背面</button></div>
    </div><aside class="reconstructed-sidebar"><img class="reconstructed-source" alt="生成此三维模型的来源图" hidden>
    <p>发束沿重建发型轮廓生成，发根与走向为近似。单图看不到的后脑由模型推测，实际发量与长度请现场确认。</p>
    <label>选择头发部件<select data-hair-part aria-label="选择头发部件" disabled></select></label>
    <button data-action="confirm" disabled>确认这是头发</button>
    <p class="reconstructed-muted" data-part-hint>模型加载后，请核对高亮部件。</p>
    <label>试剪方式<select data-hair-mode><option value="bundles">发束与基础物理</option><option value="shell">几何外壳对照</option></select></label>
    <label>试剪范围<select data-radius><option value="0.035">小</option><option value="0.055" selected>中</option><option value="0.075">大</option></select></label>
    <p>鼠标左键点剪，右键拖动旋转。每次只剪一处，等待处理结束后继续。</p>
    <div class="reconstructed-tools"><button data-action="reset" disabled>恢复原模型</button><button data-action="export" disabled>生成沟通卡</button></div>
    <button data-action="camera">开启摄像头捏合试剪</button><video class="reconstructed-camera" autoplay muted playsinline hidden></video>
    <p data-camera-status class="reconstructed-muted">摄像头默认关闭。开启后，张开拇指与食指瞄准，捏合一次剪一处。</p>
    <p data-hand-feedback>捏合识别 0 次，已剪 0 次。</p>
    <div class="reconstructed-tools"><button data-action="diagnostic-start">开始数值诊断</button><button data-action="diagnostic-stop" disabled>结束诊断</button></div>
    <p class="reconstructed-muted">诊断只保留数值，不保存摄像头图像或手部坐标。</p><textarea class="reconstructed-report" aria-label="手势数值诊断报告" readonly></textarea>
    </aside></div></section>`;
  const ui = root.querySelector('.reconstructed-studio');
  const viewport = ui.querySelector('.reconstructed-viewport');
  const status = ui.querySelector('.reconstructed-status');
  const video = ui.querySelector('video');
  const cameraStatus = ui.querySelector('[data-camera-status]');
  const partSelect = ui.querySelector('[data-hair-part]');
  const confirmButton = ui.querySelector('[data-action="confirm"]');
  const reportField = ui.querySelector('textarea');
  const aim = ui.querySelector('.reconstructed-aim');
  const action = name => ui.querySelector(`[data-action="${name}"]`);
  ui.querySelector('[data-source-label]').textContent = job?.source === 'example' ? '已生成示例 · 本次无新增模型调用' : '由当前来源图重建';
  if (job?.sourceUrl) { const image = ui.querySelector('.reconstructed-source'); image.src = job.sourceUrl; image.hidden = false; }
  let disposed = false, loaded = false, confirmed = false, selected = null, cutWorker = null, pending = null;
  let epoch = 0, sequence = 0, cutCount = 0, radius = .055, raf = 0, dirty = true;
  let mouseUntil = 0, viewUntil = 0, resumedAt = performance.now(), cameraVersion = 0, pointer = null;
  let exporting = false, trialCounts = null;
  let groom = null, hairMode = 'bundles';
  let lastReportAt = -Infinity;
  const renderStats = { draws: 0, totalMs: 0, maxMs: 0 };
  const counts = { queued: 0, applied: 0, failed: 0, cancelled: 0, handQueued: 0, handApplied: 0, handFailed: 0 };
  const zoneCounts = { front: 0, left: 0, right: 0, crown: 0, back: 0 };
  let trialZones = { ...zoneCounts };
  const parts = [], falling = [];
  const diagnostics = new GestureDiagnostics({ continuous: true });
  const pipeline = new GesturePipeline({ recognizer: new PinchGesture(), diagnostics, onCut: (x, y) => cutAt(x, y, 'hand') });
  let renderer, controls, scene, camera;
  const clearIntent = () => { pipeline.reset(); aim.hidden = true; };
  function updateDataset() {
    ui.dataset.modelReady = String(loaded); ui.dataset.cutCount = String(cutCount);
    ui.dataset.cutBusy = String(!!pending); ui.dataset.hairConfirmed = String(confirmed);
    ui.dataset.hairPart = selected?.name || ''; ui.dataset.partCount = String(parts.length);
    ui.dataset.queuedCuts = String(counts.queued); ui.dataset.appliedCuts = String(counts.applied);
    ui.dataset.failedCuts = String(counts.failed); ui.dataset.cancelledCuts = String(counts.cancelled);
    ui.dataset.cameraReady = String(cameraSession.mayCut && handTracker.status === 'ready');
    ui.dataset.hairMode = hairMode; ui.dataset.bundleCount = String(groom?.stats?.bundleCount || 0);
    ui.querySelector('[data-hair-mode]').disabled = !!pending || cutCount > 0;
    partSelect.disabled = !loaded || !!pending || cutCount > 0;
    confirmButton.disabled = !selected || confirmed || !!pending;
    action('reset').disabled = !loaded; action('export').disabled = !loaded || !!pending || exporting;
  }
  function report() {
    if (!diagnostics.trialId) return;
    const delta = key => trialCounts?.[key] || 0;
    const value = { ...diagnostics.report(), reconstructed: true, representation: hairMode,
      groom: groom ? { ...groom.stats } : null, actualMeshCutApplied: delta('applied'),
      meshCutQueued: delta('queued'), meshCutFailed: delta('failed'), meshCutCancelled: delta('cancelled'),
      handMeshCutQueued: delta('handQueued'), handMeshCutApplied: delta('handApplied'), handMeshCutFailed: delta('handFailed'),
      appliedCutsByZone: { ...trialZones },
      renderPerformance: { draws: renderStats.draws, meanMs: renderStats.draws ? renderStats.totalMs / renderStats.draws : null,
        maxMs: renderStats.maxMs, pixelRatio: renderer?.getPixelRatio() ?? null },
      meshCutPending: !!pending && pending.trialId === diagnostics.trialId };
    reportField.value = JSON.stringify(value, null, 2);
  }
  function finishDiagnostics(reason = 'manual') {
    diagnostics.stop(performance.now(), reason); report();
    action('diagnostic-start').disabled = false; action('diagnostic-stop').disabled = true;
  }
  function closeCamera(reason = 'camera-stopped') {
    // Freeze the numeric trial before the stream or tracker disappears.
    if (diagnostics.active || diagnostics.waiting) finishDiagnostics(reason);
    cameraVersion++; clearIntent(); handTracker.stop(); cameraSession.stop();
    video.pause(); video.srcObject = null; video.hidden = true;
    action('camera').textContent = '开启摄像头捏合试剪'; cameraStatus.textContent = '摄像头已关闭，可继续用鼠标试剪。';
    resizeViewport();
    updateDataset();
  }
  const cameraSession = new CameraSession({ request: () => navigator.mediaDevices.getUserMedia({ video: true, audio: false }) });
  const handTracker = new HandTracker({
    onState: state => {
      if (disposed) return;
      if (state.status === 'error') { const message = state.message; closeCamera('tracker-error'); cameraStatus.textContent = message; }
    },
    onResult: frame => {
      if (disposed) return;
      const bounds = viewport.getBoundingClientRect();
      const result = pipeline.process(frame, {
        cameraReady: cameraSession.mayCut && handTracker.status === 'ready' && loaded && confirmed && !pending,
        visible: document.visibilityState === 'visible', focused: document.hasFocus(),
        mouseCutting: !!pointer || performance.now() < mouseUntil, viewChanging: performance.now() < viewUntil,
        dialogOpen: exporting || !!root.querySelector('dialog[open]'), resumedAt, viewport: bounds
      });
      aim.hidden = !result.aimPixels || result.status === 'blocked';
      if (!aim.hidden) { aim.style.left = `${result.aimPixels.x}px`; aim.style.top = `${result.aimPixels.y}px`; }
      cameraStatus.textContent = pending ? '正在处理几何试剪，请稍候再张开手指。' : result.snip
        ? (result.cutHit ? (hairMode === 'bundles' ? '已剪短发束，请张开手指继续。' : '已提交试剪，等待几何结果。') : '本次未命中头发，请重新张开手指瞄准。')
        : result.reason === 'stale' ? '画面结果延迟，本帧已跳过。请重新张开手指。'
        : result.status === 'blocked' ? '试剪暂停，请回到页面并保持视角静止。' : result.armed ? '已瞄准，捏合拇指与食指试剪。' : '请张开拇指与食指瞄准。';
      ui.querySelector('[data-hand-feedback]').textContent = `捏合识别 ${result.totals.recognized} 次，已剪 ${counts.handApplied} 次。`;
      // A growing JSON trace must not be serialized and laid out for every hand frame.
      if (diagnostics.active && performance.now() - lastReportAt >= 250) { lastReportAt = performance.now(); report(); }
    }
  });
  listen(action('back'), 'click', () => sessionStore.setScreen('result'));
  if (job?.status !== 'ready' || !job.modelUrl) { status.textContent = '重建模型尚未就绪，请返回预览查看进度。'; return { teardown() { disposed = true; controller.abort(); } }; }
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    scene = new THREE.Scene(); scene.background = new THREE.Color('#17221d');
    camera = new THREE.PerspectiveCamera(36, 1, .05, 100); camera.position.set(0, .12, 5.3);
    scene.add(new THREE.HemisphereLight(0xfff2df, 0x536b61, 2.3));
    const key = new THREE.DirectionalLight(0xffe7d0, 3); key.position.set(3, 5, 4); scene.add(key);
    const fill = new THREE.DirectionalLight(0xc6ded5, 1.6); fill.position.set(-4, 2, -2); scene.add(fill);
    viewport.prepend(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement); controls.enablePan = false;
    controls.minDistance = 2; controls.maxDistance = 9; controls.target.set(0, 0, 0);
    controls.mouseButtons = { LEFT: null, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE };
    listen(controls, 'change', () => { dirty = true; viewUntil = performance.now() + 250; clearIntent(); });
    controls.update();
  } catch { status.textContent = '当前浏览器无法显示三维模型，请换用支持 WebGL 的浏览器。'; renderer?.dispose(); return { teardown() { disposed = true; controller.abort(); } }; }

  function resizeViewport() {
    if (!renderer || !camera) return;
    const rect = viewport.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const ratio = cameraSession.status === 'ready' ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    if (renderer.getPixelRatio() !== ratio) renderer.setPixelRatio(ratio);
    renderer.setSize(rect.width, rect.height, false); camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix(); dirty = true;
  }
  const observer = new ResizeObserver(resizeViewport);
  observer.observe(viewport);
  const raycaster = new THREE.Raycaster();
  function invalidateWorker() {
    epoch++;
    if (pending) { counts.cancelled++; if (pending.trialId === diagnostics.trialId && trialCounts) trialCounts.cancelled++; clearTimeout(pending.timer); pending = null; }
    cutWorker?.terminate(); cutWorker = null; clearIntent(); updateDataset(); report();
  }
  function failCut(message) {
    if (!pending) return;
    const operation = pending; clearTimeout(operation.timer); counts.failed++;
    if (operation.input === 'hand') counts.handFailed++;
    if (operation.trialId === diagnostics.trialId && trialCounts) { trialCounts.failed++; if (operation.input === 'hand') trialCounts.handFailed++; }
    pending = null; cutWorker?.terminate(); cutWorker = null; epoch++;
    clearIntent(); status.textContent = message; updateDataset(); report();
  }
  function removeFalling(item) { scene.remove(item.mesh); item.mesh.geometry.dispose(); item.mesh.material.dispose(); }
  function attachWorker() {
    if (cutWorker) return;
    const worker = new Worker('/vendor/mesh-cut/worker.js'); cutWorker = worker;
    worker.onmessage = ({ data }) => {
      if (disposed || worker !== cutWorker || !pending || data.id !== pending.id || data.epoch !== epoch) return;
      if (data.error) { failCut('本次几何试剪失败，原模型已保留。请缩小范围重试。'); return; }
      let remaining, removed;
      try {
        if (!Number.isFinite(data.result?.removedTriangles) || data.result.removedTriangles < 0) throw new Error('invalid result');
        remaining = resultGeometry(data.result.remaining); removed = resultGeometry(data.result.removed);
      } catch { remaining?.dispose(); removed?.dispose(); failCut('试剪结果无效，原模型已保留。'); return; }
      const operation = pending; clearTimeout(operation.timer); pending = null;
      if (!removed.getAttribute('position').count) {
        remaining.dispose(); removed.dispose(); status.textContent = '本次没有移除几何，请换一处头发边缘再试。';
      } else {
        operation.mesh.geometry.dispose(); operation.mesh.geometry = remaining;
        const piece = new THREE.Mesh(removed, new THREE.MeshStandardMaterial({ color: 0x65412c, roughness: .9, side: THREE.DoubleSide }));
        scene.add(piece); falling.push({ mesh: piece, start: performance.now() });
        while (falling.length > 12) removeFalling(falling.shift());
        cutCount++; counts.applied++; if (operation.input === 'hand') counts.handApplied++;
        zoneCounts[operation.zone]++;
        if (operation.trialId === diagnostics.trialId && trialCounts) { trialCounts.applied++; trialZones[operation.zone]++; if (operation.input === 'hand') trialCounts.handApplied++; }
        status.textContent = `已完成 ${cutCount} 次几何试剪。试剪仅改变头发外壳，请与理发师确认实际长度。`;
      }
      dirty = true; clearIntent(); updateDataset(); report();
    };
    worker.onerror = worker.onmessageerror = () => { if (!disposed && worker === cutWorker) failCut('几何试剪处理失败，原模型已保留。'); };
  }
  function cutAt(x, y, input = 'mouse') {
    const miss = { affectedStrands: 0, queued: false };
    if (disposed || !loaded || !confirmed || !selected || pending || exporting || root.querySelector('dialog[open]')) return miss;
    const rect = viewport.getBoundingClientRect();
    if (!Number.isFinite(x) || !Number.isFinite(y) || x < 0 || y < 0 || x > rect.width || y > rect.height) return miss;
    raycaster.setFromCamera(new THREE.Vector2(x / rect.width * 2 - 1, 1 - y / rect.height * 2), camera);
    scene.updateMatrixWorld(true);
    if (hairMode === 'bundles') {
      if (!groom) return miss;
      const blocker = raycaster.intersectObjects(parts.filter(part => part !== selected).map(part => part.mesh), false)[0];
      const previousFar = raycaster.far;
      if (blocker) raycaster.far = blocker.distance;
      let result;
      try { result = groom.cut(raycaster, radius); }
      catch { status.textContent = '本次发束试剪未能处理，请换一处发梢重试。'; return miss; }
      finally { raycaster.far = previousFar; }
      if (!result?.affectedStrands) return miss;
      counts.queued++; counts.applied++; cutCount++;
      if (input === 'hand') { counts.handQueued++; counts.handApplied++; }
      if (diagnostics.active && trialCounts) {
        trialCounts.queued++; trialCounts.applied++;
        if (input === 'hand') { trialCounts.handQueued++; trialCounts.handApplied++; }
      }
      zoneCounts[Object.hasOwn(zoneCounts, result.zone) ? result.zone : 'crown']++;
      if (diagnostics.active && trialCounts) trialZones[Object.hasOwn(trialZones, result.zone) ? result.zone : 'crown']++;
      dirty = true; clearIntent(); updateDataset(); report();
      status.textContent = `本次剪短 ${result.affectedStrands} 撮发束，累计 ${cutCount} 次。`;
      return { ...result, queued: true };
    }
    const hit = raycaster.intersectObjects(parts.map(part => part.mesh), false)[0];
    if (!hit || hit.object !== selected.mesh) return miss;
    const normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
    const center = hit.point.clone().addScaledVector(normal, .02);
    const angle = Math.abs(Math.atan2(hit.point.x, hit.point.z));
    const zone = hit.point.y > .75 ? 'crown' : angle < Math.PI * .28 ? 'front'
      : angle > Math.PI * .72 ? 'back' : hit.point.x < 0 ? 'left' : 'right';
    try {
      attachWorker();
      const packet = copyCutPacket(selected.mesh.geometry), id = ++sequence;
      pending = { id, mesh: selected.mesh, input, zone, trialId: diagnostics.active ? diagnostics.trialId : null,
        timer: setTimeout(() => failCut('试剪处理超时，原模型已保留。请缩小范围重试。'), 15000) };
      const transfers = [packet.positions.buffer, packet.normals.buffer]; if (packet.index) transfers.push(packet.index.buffer);
      cutWorker.postMessage({ id, epoch, geometry: packet, center: center.toArray(), radius }, transfers);
      counts.queued++; if (input === 'hand') counts.handQueued++;
      if (pending.trialId && trialCounts) { trialCounts.queued++; if (input === 'hand') trialCounts.handQueued++; }
      clearIntent(); status.textContent = '正在处理几何试剪…'; updateDataset();
      return { affectedStrands: 1, queued: true };
    } catch { failCut('无法启动几何试剪，原模型已保留。'); return miss; }
  }
  function paintParts() {
    if (groom) { scene.remove(groom.group); groom.dispose(); groom = null; }
    for (const part of parts) {
      const hair = part === selected;
      part.mesh.visible = true;
      part.mesh.material.color.set(hair && confirmed ? 0x65412c : 0xd5c2a7);
      part.mesh.material.emissive.set(hair && !confirmed ? 0x415f32 : 0x000000);
    }
    if (confirmed && selected && hairMode === 'bundles') {
      try {
        groom = createModelConditionedGroom(selected.original, { headGeometries: parts.filter(part => part !== selected).map(part => part.original) });
        scene.add(groom.group); selected.mesh.visible = false;
      } catch {
        confirmed = false; status.textContent = '这个部件未能生成发束，请重新核对头发部件，或选择几何外壳对照。';
      }
    }
    dirty = true; updateDataset();
    ui.querySelector('[data-part-hint]').textContent = confirmed ? '已确认头发部件，可点剪。恢复原模型后可以重新选择。' : '高亮显示当前部件。请从不同角度核对，确认只包含头发后再试剪。';
  }
  listen(partSelect, 'change', () => { if (cutCount || pending) return; selected = parts[Number(partSelect.value)] || null; confirmed = false; clearIntent(); paintParts(); });
  listen(confirmButton, 'click', () => { if (selected && !pending) { confirmed = true; clearIntent(); paintParts(); if (confirmed) status.textContent = hairMode === 'bundles' ? '发束已生成。点选或捏合剪短发梢，右键旋转查看。' : '已确认头发部件。左键点剪，右键旋转查看。'; } });
  listen(ui.querySelector('[data-hair-mode]'), 'change', event => {
    if (cutCount || pending) return;
    hairMode = event.target.value === 'shell' ? 'shell' : 'bundles';
    invalidateWorker(); paintParts(); clearIntent();
  });
  listen(ui.querySelector('[data-radius]'), 'change', event => { radius = Math.max(.035, Math.min(.075, Number(event.target.value) || .055)); clearIntent(); });
  listen(action('reset'), 'click', () => {
    invalidateWorker();
    for (const part of parts) { part.mesh.geometry.dispose(); part.mesh.geometry = part.original.clone(); }
    groom?.reset();
    for (const zone of Object.keys(zoneCounts)) zoneCounts[zone] = 0;
    falling.splice(0).forEach(removeFalling); cutCount = 0; dirty = true; updateDataset(); report();
    status.textContent = '已恢复所有部件的原始几何。';
  });
  for (const button of ui.querySelectorAll('[data-view]')) listen(button, 'click', () => {
    const positions = { front: [0, .12, 5.3], left: [-5.3, .12, 0], right: [5.3, .12, 0], back: [0, .12, -5.3] };
    camera.position.set(...positions[button.dataset.view]); controls.target.set(0, 0, 0); controls.update();
    viewUntil = performance.now() + 400; clearIntent(); dirty = true; ui.dataset.view = button.dataset.view;
  });
  listen(renderer.domElement, 'pointerdown', event => { mouseUntil = performance.now() + 400; clearIntent(); pointer = { x: event.clientX, y: event.clientY, button: event.button }; });
  listen(renderer.domElement, 'pointerup', event => {
    mouseUntil = performance.now() + 400;
    if (pointer?.button === 0 && event.button === 0 && Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) < 6) {
      const bounds = viewport.getBoundingClientRect(); const result = cutAt(event.clientX - bounds.left, event.clientY - bounds.top);
      if (!result.queued && !pending) status.textContent = confirmed ? '请点在可见的头发上。脸部和其他部件不会被剪。' : '请先核对并确认头发部件。';
    }
    pointer = null;
  });
  listen(renderer.domElement, 'pointercancel', () => { pointer = null; clearIntent(); });
  listen(window, 'pointerup', () => { if (pointer) { pointer = null; mouseUntil = performance.now() + 400; clearIntent(); } });
  listen(renderer.domElement, 'contextmenu', event => event.preventDefault());
  listen(window, 'blur', () => { pointer = null; resumedAt = performance.now(); clearIntent(); });
  listen(window, 'focus', () => { resumedAt = performance.now(); clearIntent(); });
  listen(document, 'visibilitychange', () => { resumedAt = performance.now(); clearIntent(); });
  listen(action('camera'), 'click', async () => {
    if (cameraSession.status !== 'idle') { closeCamera(); return; }
    const version = ++cameraVersion; action('camera').textContent = '关闭摄像头'; cameraStatus.textContent = '等待摄像头授权…';
    await cameraSession.start();
    if (disposed || version !== cameraVersion) return;
    if (cameraSession.status !== 'ready') { closeCamera('camera-error'); cameraStatus.textContent = '摄像头未能开启，请检查权限。可继续用鼠标试剪。'; return; }
    video.srcObject = cameraSession.stream; video.hidden = false;
    try {
      await video.play();
      if (disposed || version !== cameraVersion) return;
      cameraStatus.textContent = '正在加载本地手部识别…';
      const ready = await handTracker.start();
      if (disposed || version !== cameraVersion) return;
      if (!ready) { closeCamera('tracker-error'); return; }
      resumedAt = performance.now(); clearIntent(); cameraSession.arm(true); updateDataset();
      resizeViewport();
      cameraStatus.textContent = '请张开拇指与食指瞄准，捏合一次剪一处。';
    } catch { if (!disposed && version === cameraVersion) { closeCamera('video-error'); cameraStatus.textContent = '无法播放摄像头画面，请检查设备后重试。'; } }
  });
  listen(action('diagnostic-start'), 'click', () => {
    trialCounts = Object.fromEntries(Object.keys(counts).map(key => [key, 0]));
    trialZones = Object.fromEntries(Object.keys(zoneCounts).map(key => [key, 0]));
    Object.assign(renderStats, { draws: 0, totalMs: 0, maxMs: 0 });
    diagnostics.arm(performance.now()); report(); action('diagnostic-start').disabled = true; action('diagnostic-stop').disabled = false;
  });
  listen(action('diagnostic-stop'), 'click', () => finishDiagnostics());
  listen(action('export'), 'click', async () => {
    if (pending || !loaded || exporting) return;
    exporting = true; clearIntent(); updateDataset(); status.textContent = '正在生成沟通卡…';
    try {
      renderer.render(scene, camera);
      const card = await createConsultationCard({ reference: job.sourceUrl, snapshot: renderer.domElement.toDataURL('image/png'),
        sections: {}, demo: job.source === 'example', archetype: hairMode === 'bundles' ? '模型轮廓发束' : '重建头发外壳', reconstructed: true,
        bundleHair: hairMode === 'bundles', cutCount, cutCounts: { ...zoneCounts } });
      if (!disposed) { showConsultationCard(root, card); status.textContent = '沟通卡已生成，不含摄像头画面。'; }
    } catch (error) { if (!disposed) status.textContent = error.message || '沟通卡未能生成，请稍后重试。'; }
    finally { exporting = false; if (!disposed) { resumedAt = performance.now(); clearIntent(); updateDataset(); } }
  });

  new GLTFLoader().loadAsync(job.modelUrl).then(gltf => {
    if (disposed) { disposeSource(gltf.scene); return; }
    try {
      const baked = bakeReconstructedParts(gltf.scene);
      for (const part of baked) {
        const material = new THREE.MeshStandardMaterial({ color: 0xd5c2a7, roughness: .87, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(part.geometry, material); mesh.name = part.name;
        parts.push({ ...part, mesh, original: part.geometry.clone() }); scene.add(mesh);
        const option = document.createElement('option'); option.value = String(parts.length - 1); option.textContent = part.name; partSelect.append(option);
      }
      const known = job.source === 'example' && job.hairPart ? parts.find(part => part.name === job.hairPart) : null;
      selected = known || parts[0]; confirmed = !!known;
      partSelect.value = String(parts.indexOf(selected)); loaded = true;
      paintParts(); status.textContent = known ? '已读取真实重建模型。示例头发部件已核对，可开始几何试剪。' : '已读取重建模型。请先从不同角度核对并确认头发部件。';
    } catch (error) { status.textContent = error.message || '模型无法显示，请返回预览重试。'; }
    finally { disposeSource(gltf.scene); }
  }).catch(() => { if (!disposed) status.textContent = '重建模型读取失败，请检查网络或返回预览查看任务。'; });

  const step = createStudioFrameLoop({
    track: time => { if (cameraSession.mayCut && handTracker.status === 'ready') handTracker.infer(video, time); },
    isCameraActive: () => cameraSession.status === 'ready' || !!groom, needsDraw: () => dirty || falling.length > 0 || !!groom,
    draw: time => {
      groom?.step(time);
      for (let i = falling.length - 1; i >= 0; i--) {
        const item = falling[i], age = (time - item.start) / 1000;
        if (age > 2.5) { falling.splice(i, 1); removeFalling(item); continue; }
        item.mesh.position.y = -1.2 * age * age; item.mesh.rotation.z = age * .3;
      }
      const before = performance.now(); renderer.render(scene, camera);
      const duration = performance.now() - before;
      if (diagnostics.active) { renderStats.draws++; renderStats.totalMs += duration; renderStats.maxMs = Math.max(renderStats.maxMs, duration); }
      dirty = false;
    }
  });
  const animate = time => { if (disposed) return; step(time); raf = requestAnimationFrame(animate); };
  raf = requestAnimationFrame(animate); updateDataset();
  return { teardown() {
    if (disposed) return;
    closeCamera('scene-disposed'); invalidateWorker(); disposed = true; controller.abort();
    cancelAnimationFrame(raf); observer.disconnect(); controls.dispose();
    falling.splice(0).forEach(removeFalling);
    groom?.dispose(); groom = null;
    for (const part of parts) { part.mesh.geometry.dispose(); part.original.dispose(); part.mesh.material.dispose(); }
    root.querySelector('.consultation-overlay')?.remove(); renderer.dispose(); renderer.domElement.remove();
  } };
}
