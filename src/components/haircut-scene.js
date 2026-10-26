import { sampleVisiblePoint, sampleDetachedPoint, nextCutPosition } from '../lib/haircut-geometry.js';
import { sampleScalpDirections } from '../lib/scalp-sampling.js';
import { offsetChildHairPoint } from '../lib/hair-strand-shape.js';
import { REFERENCE_GROOM_FIBER_RADIUS } from '../lib/groom-head.js';
import { selectHairRenderProfile, createHairRenderStorage } from '../lib/hair-render-profile.js';
import { selectNativeAppearance } from '../lib/head-appearance.js';
import { measurePortrait, createPortraitGroom, createPortraitFace, createPortraitSkull, FACE_OVAL } from '../lib/portrait-model.js';
import { analyzePortraitImage } from '../lib/portrait-loader.js';
import { HandTracker } from '../lib/hand-tracker.js';
import { ScissorsGesture } from '../lib/scissors-gesture.js';
import { PinchGesture } from '../lib/pinch-gesture.js';
import { studioView } from '../lib/studio-view.js';
import { GesturePipeline } from '../lib/gesture-pipeline.js';
import { GestureDiagnostics } from '../lib/gesture-diagnostics.js';
import { CameraSession } from '../lib/camera-session.js';
import { createStudioFrameLoop } from '../lib/studio-frame-loop.js';
import { createConsultationCard, showConsultationCard } from '../lib/consultation-card.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createAnatomicalHead, createAnatomicalEyes, createEyeMaterial, anatomicalScalp, createHeadOcclusion, resolveHeadCollision } from '../lib/head-anatomy.js';

// ---------------------------------------------------------------------------
// 矢量图标库（严格遵循 ui-taste-elevation：100% 1.5px 单色细线矢量 SVG，严禁系统彩色 Emoji）
// ---------------------------------------------------------------------------
const STUDIO_SVGS = {
  scissorPoint: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
  scissorThin: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/></svg>`,
  scissorFast: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  webcam: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
  handGesture: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`,
  upload: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  undo: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>`,
  back: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  close: `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
};

// ---------------------------------------------------------------------------
// 配置
// ---------------------------------------------------------------------------
const ZONES = ['front', 'left', 'right', 'crown', 'back'];
const ZONE_LABELS = { front: '前额刘海', left: '左侧鬓区', right: '右侧鬓区', crown: '颅顶发冠', back: '后脑枕区' };

const LEGACY_SEG = 15;       // 中长发原生长轨迹，随后重采样
const GUIDE_COUNT = 1150;    // 引导发丝数量（黄金螺旋均匀分布）
const CHILDREN = 7;          // 每根引导发丝派生的发丝数
const MIN_CUT = 1.5;         // 最短保留段数
const FLOOR_Y = -1.96;

// 三档沙龙修剪模式（精细点剪 / 牙剪打薄 / 快速平剪）
const SCISSOR_MODES = {
  point: { label: '精细点剪', icon: STUDIO_SVGS.scissorPoint, radius: 14, stepTrim: 1.35, sampleRate: 0.55, tip: '小圈精修刘海与发梢细节' },
  thin:  { label: '牙剪打薄', icon: STUDIO_SVGS.scissorThin,  radius: 20, stepTrim: 1.05, sampleRate: 0.28, tip: '随机抽样修薄 28% 发丝，自然空气层次' },
  fast:  { label: '快速平剪', icon: STUDIO_SVGS.scissorFast,  radius: 26, stepTrim: 2.60, sampleRate: 0.88, tip: '大圈快速修短整体发长' }
};

// 三种可编辑发型预设。照片只提供配色与粗略长度提示。
const HAIR_ARCHETYPES = {
  crop: {
    label: '预设纹理短发',
    lengths: { front: 0.30, left: 0.24, right: 0.24, crown: 0.34, back: 0.28 },
    curlAmp: 0.006,
    curlFreq: 3.8,
    rootLift: 0.20
  },
  lob: {
    label: '法式层次锁骨中发',
    lengths: { front: 0.38, left: 0.78, right: 0.78, crown: 0.84, back: 0.90 },
    curlAmp: 0.008,
    curlFreq: 5.2,
    rootLift: 0.21
  },
  long: {
    label: '丰盈流光长卷发',
    lengths: { front: 0.44, left: 1.04, right: 1.04, crown: 1.08, back: 1.18 },
    curlAmp: 0.011,
    curlFreq: 6.0,
    rootLift: 0.20
  }
};

const FRAG_SEG_CAP = 64000;
const FRAG_CAP = 7500;

const COLORS = {
  porcelain: 0xe6d4c3,
  porcelainBlush: 0xdcbca8,
  porcelainShadow: 0xc2a896,
  scalp: 0x221712,
  hairRoot: 0x1e130c,
  hairTip: 0x5c3a24,
  cloth: 0x172332,
  stage: 0x141c18,
  backdrop: 0x0e1411,
  copper: 0xc87d55,
  fallen: 0x6b4732
};

const SHELL_C = new THREE.Vector3(0, 0.02, -0.02);
const NECK_Z = -0.14;
const NECK_R = 0.35;
const WHORL = new THREE.Vector3(0.03, 0.88, -0.28);

// ---------------------------------------------------------------------------
// 工具函数
// ---------------------------------------------------------------------------
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(e0, e1, x) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

// The rendered anatomical template and scalp lookup share one source mesh.
function headSurface(x,y,z,out) { return anatomicalScalp(x,y,z,out); }

function hairlineY(x, z) {
  const a = Math.abs(Math.atan2(x, z)) / Math.PI;
  if (a < 0.24) {
    const templeDip = Math.sin(smoothstep(0.0, 0.24, a) * Math.PI) * 0.025;
    return 0.34 + templeDip;
  }
  if (a < 0.46) {
    return THREE.MathUtils.lerp(0.35, 0.14, smoothstep(0.24, 0.46, a));
  }
  if (a < 0.58) {
    return THREE.MathUtils.lerp(0.14, 0.18, smoothstep(0.46, 0.58, a));
  }
  return THREE.MathUtils.lerp(0.18, -0.55, smoothstep(0.58, 0.90, a));
}

function hairMask(x, y, z) {
  const h = hairlineY(x, z);
  return smoothstep(h - 0.01, h + 0.04, y);
}

function scalpTintMask(x, y, z) {
  const h = hairlineY(x, z);
  return smoothstep(h + 0.04, h + 0.16, y);
}

function zoneOf(x, y, z) {
  const a = Math.abs(Math.atan2(x, z)) / Math.PI;
  if (a < 0.26 && y < 0.90) return 'front';
  if (y > 0.72) return 'crown';
  if (a > 0.68) return 'back';
  return x < 0 ? 'left' : 'right';
}

const _surfPt = new THREE.Vector3();
const _surfN = new THREE.Vector3();

function collide(p, clearance, outNormal = null) {
  let hit = false;
  if (p.y > -0.68) {
    const len = p.length();
    if (len > 1e-5) {
      const ux = p.x / len, uy = p.y / len, uz = p.z / len;
      headSurface(ux, uy, uz, _surfPt);
      const rHead = _surfPt.length();
      const minR = rHead + clearance;
      if (len < minR) {
        const scale = minR / len;
        p.multiplyScalar(scale);
        if (outNormal) outNormal.set(ux, uy, uz);
        hit = true;
      }
    }
  }
  if (p.y < -0.45) {
    const neckT = smoothstep(-0.45, -1.80, p.y);
    const neckCenterZ = NECK_Z + 0.055 * (1.0 - neckT);
    const neckRad = THREE.MathUtils.lerp(0.30, 0.42, neckT) + clearance;
    const nx = p.x;
    const nz = p.z - neckCenterZ;
    const r = Math.hypot(nx, nz);
    if (r < neckRad && r > 1e-6) {
      p.x = (nx / r) * neckRad;
      p.z = (nz / r) * neckRad + neckCenterZ;
      if (outNormal) outNormal.set(nx / r, 0, nz / r);
      hit = true;
    }
  }
  return hit;
}

// ---------------------------------------------------------------------------
// 发丝着色器（球面切线平滑各向异性光环 + 丝缎微圆弧横截面 + 羽毛级收尖）
// ---------------------------------------------------------------------------
const HAIR_VERT = /* glsl */`
  attribute vec3 aTangent;
  attribute float aSide;
  attribute float aT;
  attribute float aRand;
  uniform float uWidth;
  varying vec3 vTangent;
  varying vec3 vWorldPos;
  varying float vT;
  varying float vRand;
  varying float vSide;
  void main() {
    vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    vec3 T = normalize(mat3(modelMatrix) * aTangent);
    vec3 toCam = normalize(cameraPosition - worldPos);
    vec3 side = cross(T, toCam);
    float sl = length(side);
    side = sl > 1e-4 ? side / sl : vec3(1.0, 0.0, 0.0);
    float rootFullness = smoothstep(0.0, 0.04, aT) * 0.22 + 0.78;
    float tipTaper = pow(max(0.0, 1.0 - smoothstep(0.45, 1.0, aT)), 0.78);
    float w = uWidth * rootFullness * tipTaper * (0.88 + 0.24 * aRand);
    worldPos += side * aSide * w;
    vTangent = T;
    vWorldPos = worldPos;
    vT = aT;
    vRand = aRand;
    vSide = aSide;
    gl_Position = projectionMatrix * viewMatrix * vec4(worldPos, 1.0);
  }
`;

const HAIR_FRAG = /* glsl */`
  uniform vec3 uLightDir;
  uniform vec3 uLightDir2;
  uniform vec3 uRoot;
  uniform vec3 uTip;
  varying vec3 vTangent;
  varying vec3 vWorldPos;
  varying float vT;
  varying float vRand;
  varying float vSide;

  float kk(vec3 T, vec3 H, float shift, float expo) {
    float d = clamp(dot(T, H) + shift, -1.0, 1.0);
    return pow(sqrt(max(0.0, 1.0 - d * d)), expo);
  }

  void main() {
    vec3 T = normalize(vTangent);
    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 L = normalize(uLightDir);
    vec3 L2 = normalize(uLightDir2);

    vec3 domeN = normalize(vWorldPos - vec3(0.0, -0.08, 0.02));
    vec3 meridianT = normalize(vec3(0.0, -1.0, 0.0) - domeN * domeN.y);
    if (dot(meridianT, T) < 0.0) meridianT = -meridianT;
    vec3 smoothT = normalize(mix(T, meridianT, 0.22 * (1.0 - 0.35 * vT)));

    float tl = dot(smoothT, L);
    float diff = sqrt(max(0.0, 1.0 - tl * tl));
    float tl2 = dot(smoothT, L2);
    float diff2 = sqrt(max(0.0, 1.0 - tl2 * tl2));
    float domeDiff = clamp(dot(domeN, L) * 0.5 + 0.5, 0.0, 1.0);

    float ribbonProfile = 0.88 + 0.12 * sqrt(max(0.0, 1.0 - vSide * vSide * 0.75));
    float rootAO = mix(0.80, 1.0, smoothstep(0.0, 0.28, vT));
    float depthAO = smoothstep(-0.75, 0.50, vWorldPos.y) * 0.16 + 0.84;
    float ao = rootAO * depthAO * ribbonProfile;

    // Keep adjacent short locks close in value instead of repeating black roots
    // and bright tips across every visible layer of the back of the head.
    vec3 base = mix(uRoot, uTip, 0.24 + 0.62 * smoothstep(0.12, 0.88, vT));
    base *= (0.96 + 0.08 * vRand);

    vec3 H = normalize(L + V);
    vec3 H2 = normalize(L2 + V);
    float shiftJitter = (vRand - 0.5) * 0.022;
    float specPrimary = kk(smoothT, H, -0.05 + shiftJitter, 82.0);
    float specSecondary = kk(smoothT, H, 0.07 + shiftJitter, 20.0);
    float specRim = kk(smoothT, H2, -0.04, 42.0);

    float wrapDiff = mix(0.45 + 0.55 * diff, domeDiff, 0.38);
    vec3 col = base * (wrapDiff * 0.94 + 0.28 * diff2) * ao;
    col += vec3(0.96, 0.90, 0.84) * specPrimary * 0.045 * ao;
    col += (uTip * 1.28 + vec3(0.10, 0.06, 0.03)) * specSecondary * 0.14 * ao;
    col += vec3(0.85, 0.70, 0.55) * specRim * 0.055 * ao;

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

// ---------------------------------------------------------------------------
// 固定图像区域提供颜色样本和短/中发提示，不测量头型或重建三维发型。
// ---------------------------------------------------------------------------
function analyzePortraitAndCropFace(img, faceCtx, W = 512, H = 512) {
  const probe = document.createElement('canvas');
  const PW = 256, PH = 256;
  probe.width = PW;
  probe.height = PH;
  const pctx = probe.getContext('2d');
  pctx.drawImage(img, 0, 0, PW, PH);
  const data = pctx.getImageData(0, 0, PW, PH).data;

  // 1. 采样面中双颊区域（x in [0.38..0.62], y in [0.40..0.52]）获取本人真实肤色
  let skinR = 0, skinG = 0, skinB = 0, skinCnt = 0;
  for (let y = Math.floor(PH * 0.40); y <= Math.floor(PH * 0.52); y += 2) {
    for (let x = Math.floor(PW * 0.37); x <= Math.floor(PW * 0.63); x += 2) {
      if (Math.abs(x - PW * 0.5) < PW * 0.04) continue; // 避开鼻孔暗部
      const idx = (y * PW + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (r > 110 && g > 80 && r > b) {
        skinR += r; skinG += g; skinB += b; skinCnt++;
      }
    }
  }
  if (skinCnt < 10) {
    skinR = 232; skinG = 205; skinB = 184;
  } else {
    skinR = Math.round(skinR / skinCnt);
    skinG = Math.round(skinG / skinCnt);
    skinB = Math.round(skinB / skinCnt);
  }

  // 2. 自动检测人脸皮肤边界（左右脸颊边缘、前额发际线与下巴底端，剔除米色背景与深色毛衣）
  const bgR = data[12], bgG = data[13], bgB = data[14];
  function isFaceSkin(x, y) {
    const idx = (y * PW + x) * 4;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    const distSkin = Math.hypot(r - skinR, g - skinG, b - skinB);
    const distBg = Math.hypot(r - bgR, g - bgG, b - bgB);
    const redness = (r - b) - (bgR - bgB);
    return distSkin < 52 && (distBg > 16 || redness > 8) && r > 95;
  }

  // 在眼鼻颊高度（y = 0.43 * PH）左右扫描面宽
  let leftX = Math.floor(PW * 0.34);
  let rightX = Math.floor(PW * 0.66);
  const midY = Math.floor(PH * 0.44);
  for (let x = Math.floor(PW * 0.45); x >= Math.floor(PW * 0.22); x--) {
    if (!isFaceSkin(x, midY) && !isFaceSkin(x, midY - 6)) { leftX = x + 2; break; }
  }
  for (let x = Math.floor(PW * 0.55); x <= Math.floor(PW * 0.78); x++) {
    if (!isFaceSkin(x, midY) && !isFaceSkin(x, midY - 6)) { rightX = x - 2; break; }
  }
  // 限制在合理人像解剖学范围
  const normL = Math.max(0.28, Math.min(0.37, leftX / PW));
  const normR = Math.min(0.72, Math.max(0.63, rightX / PW));
  const normTop = 0.215;    // 额头顶端
  const normBottom = 0.602; // 下巴尖底端（严格高于颈部与毛衣领口！）

  // 3. 从头顶固定区域的暗像素参考发色，转换至 Linear 色彩空间。
  const hairSamples = [];
  for (let y = Math.floor(PH * 0.11); y <= Math.floor(PH * 0.23); y += 2) {
    for (let x = Math.floor(PW * 0.36); x <= Math.floor(PW * 0.64); x += 2) {
      const idx = (y * PW + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      const distBg = Math.hypot(r - bgR, g - bgG, b - bgB);
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      if (distBg > 42 && luma < 118) {
        hairSamples.push({ r, g, b, luma });
      }
    }
  }
  hairSamples.sort((a, b) => a.luma - b.luma);

  let rootCol = new THREE.Color(0x160e09).convertSRGBToLinear();
  let tipCol = new THREE.Color(0x462b19).convertSRGBToLinear();
  if (hairSamples.length > 20) {
    const p18 = hairSamples[Math.floor(hairSamples.length * 0.18)];
    const p78 = hairSamples[Math.floor(hairSamples.length * 0.78)];
    rootCol.setRGB(
      Math.min(0.18, Math.max(0.04, (p18.r / 255) * 0.75)),
      Math.min(0.12, Math.max(0.03, (p18.g / 255) * 0.70)),
      Math.min(0.09, Math.max(0.02, (p18.b / 255) * 0.65))
    ).convertSRGBToLinear();
    tipCol.setRGB(
      Math.min(0.38, Math.max(0.18, (p78.r / 255) * 0.92)),
      Math.min(0.25, Math.max(0.11, (p78.g / 255) * 0.84)),
      Math.min(0.16, Math.max(0.06, (p78.b / 255) * 0.76))
    ).convertSRGBToLinear();
  }

  // 4. 用图像左下颌旁的暗像素比例提示短/中发预设，不推断卷度或后脑形状。
  let lowerSideHairHits = 0, lowerSideTotal = 0;
  for (let y = Math.floor(PH * 0.48); y <= Math.floor(PH * 0.62); y += 2) {
    for (let x = Math.floor(PW * 0.24); x <= Math.floor(PW * 0.31); x += 2) {
      const idx = (y * PW + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      const distBg = Math.hypot(r - bgR, g - bgG, b - bgB);
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      lowerSideTotal++;
      if (distBg > 32 && luma < 110) lowerSideHairHits++;
    }
  }
  const detectedArchetype = (lowerSideHairHits / Math.max(1, lowerSideTotal)) > 0.32 ? 'lob' : 'crop';

  // 5. 采样底部服装颜色（y in [0.78..0.92], x in [0.35..0.65]）用于 3D 肩座毛衣上色
  let clothR = 23, clothG = 35, clothB = 50, clothCnt = 0;
  for (let y = Math.floor(PH * 0.78); y <= Math.floor(PH * 0.92); y += 4) {
    for (let x = Math.floor(PW * 0.35); x <= Math.floor(PW * 0.65); x += 4) {
      const idx = (y * PW + x) * 4;
      clothR += data[idx]; clothG += data[idx + 1]; clothB += data[idx + 2]; clothCnt++;
    }
  }
  const clothColor = new THREE.Color(
    (clothR / Math.max(1, clothCnt)) / 255,
    (clothG / Math.max(1, clothCnt)) / 255,
    (clothB / Math.max(1, clothCnt)) / 255
  ).convertSRGBToLinear();

  // 6. 将精确裁剪的纯正脸区域（额头至下巴）绘制到 faceCanvas，并柔化额头上方 2D 刘海残影
  faceCtx.clearRect(0, 0, W, H);
  faceCtx.fillStyle = `rgb(${skinR}, ${skinG}, ${skinB})`;
  faceCtx.fillRect(0, 0, W, H);

  const sx = normL * img.width;
  const sy = normTop * img.height;
  const sw = (normR - normL) * img.width;
  const sh = (normBottom - normTop) * img.height;
  faceCtx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);

  // 额头顶部柔肤过渡（消除照片本身的 2D 刘海印在 3D 额头皮肤上，完全交由 3D 真实刘海发丝表现！）
  const foreheadClean = faceCtx.createLinearGradient(0, 0, 0, H * 0.315);
  foreheadClean.addColorStop(0, `rgba(${skinR}, ${skinG}, ${skinB}, 0.99)`);
  foreheadClean.addColorStop(0.75, `rgba(${skinR}, ${skinG}, ${skinB}, 0.92)`);
  foreheadClean.addColorStop(1, `rgba(${skinR}, ${skinG}, ${skinB}, 0)`);
  faceCtx.fillStyle = foreheadClean;
  faceCtx.fillRect(0, 0, W, H * 0.315);

  // 柔和椭圆形肤色边缘过渡，杜绝任何背景色残留
  const edgeGrad = faceCtx.createRadialGradient(W * 0.5, H * 0.52, W * 0.34, W * 0.5, H * 0.52, W * 0.49);
  edgeGrad.addColorStop(0, `rgba(${skinR}, ${skinG}, ${skinB}, 0)`);
  edgeGrad.addColorStop(1, `rgba(${skinR}, ${skinG}, ${skinB}, 1)`);
  faceCtx.fillStyle = edgeGrad;
  faceCtx.fillRect(0, 0, W, H);

  const skinColor = new THREE.Color(skinR / 255, skinG / 255, skinB / 255).convertSRGBToLinear();
  return { skinColor, rootCol, tipCol, clothColor, detectedArchetype };
}

// ---------------------------------------------------------------------------
// 组件主入口
// ---------------------------------------------------------------------------
export function createHaircutScene(root, sessionStore, options = {}) {
  let disposed = false;
  const portraitEnabled=options.experimentalPortrait===true;
  const hairProfile=selectHairRenderProfile(options),SEG=hairProfile.segments,HAIR_SIDES=hairProfile.sides;
  const archetypeLabel=key=>key==='portrait'?'本次融合图短发':key==='crop'&&hairProfile.experimental?'理想图短卷试作':HAIR_ARCHETYPES[key].label;
  let portraitProfile=null,portraitTask=null,portraitTexture=null,portraitMask=null,portraitFace=null,portraitWanted=true;
  let renderRequested=true;
  const requestRender=()=>{renderRequested=true;};
  const renderStats={draws:0,cpuRenderMs:0};
  const hasGenerated = !!sessionStore.state.generatedImage?.urlOrData;
  const hasPersonal = !!sessionStore.state.personalImage?.dataUrl;
  // Photos supply appearance colors; geometry comes from the generic anatomical template.
  let currentFaceSource = hasGenerated ? 'generated' : hasPersonal ? 'personal' : 'generated';
  let currentScissorMode = 'point';
  let currentHairArchetype = 'crop';
  let viewChanging=false;
  let snipVisualUntil=0;
  let onGroomRebuilt=()=>{};

  root.innerHTML = `
    <div class="scene-container">
      <div class="scene-header">
        <span class="eyebrow">03 / TRY A TRIM</span>
        <h2>在这里，先动手剪一剪。</h2>
        <p>${portraitEnabled?'照片驱动建模实验，尚未通过视觉验收。':'当前为预设试剪，照片驱动重建尚未通过验收。'}3D 修剪不会同步改动 AI 图片。</p>
        <p class="groom-source-note" id="groom-source-note" aria-live="polite">正在准备可剪发型参考。</p>
      </div>

      <div class="scene-toolbar">
        <div class="toolbar-group">
          <span class="toolbar-label">沙龙剪刀</span>
          <div class="scissor-btn-group" id="scissor-modes">
            ${Object.entries(SCISSOR_MODES).map(([key, cfg]) => `
              <button type="button" class="tool-chip ${key === currentScissorMode ? 'active' : ''}" data-mode="${key}" title="${cfg.tip}">
                ${cfg.icon}
                <span>${cfg.label}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="toolbar-group">
          <span class="toolbar-label">3D 发型基底</span>
          <div class="scissor-btn-group" id="hair-archetypes">
            ${hasGenerated&&portraitEnabled?'<button type="button" class="tool-chip" data-archetype="portrait" disabled>本次融合图短发 · 分析中</button>':''}
            ${Object.entries(HAIR_ARCHETYPES).map(([key, cfg]) => `
              <button type="button" class="tool-chip ${key === currentHairArchetype ? 'active' : ''}" data-archetype="${key}">
                <span>${archetypeLabel(key)}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="toolbar-group">
          <span class="toolbar-label">外观参考</span>
          <div class="scissor-btn-group" id="face-sources">
            <button type="button" class="tool-chip ${currentFaceSource === 'generated' ? 'active' : ''}" data-face="generated" title="从 AI 换发照片参考肤色与发色">
              <span>${portraitEnabled?'融合图外观':'AI 换发配色'}</span>
            </button>
            <button type="button" class="tool-chip ${currentFaceSource === 'personal' ? 'active' : ''}" data-face="personal" title="从本人原照片参考肤色与发色">
              <span>原照配色</span>
            </button>
            <button type="button" class="tool-chip ${currentFaceSource === 'clay' ? 'active' : ''}" data-face="clay" title="查看预设头部几何">
              <span>预设素模</span>
            </button>
            <label class="tool-chip tool-upload-chip" title="上传照片参考肤色与发色">
              ${STUDIO_SVGS.upload}
              <span>照片配色</span>
              <input type="file" id="scene-face-upload" accept="image/png,image/jpeg,image/webp" style="display:none" />
            </label>
          </div>
          <span class="toolbar-label" id="native-appearance-status" role="status">通用头模外观加载中</span>
        </div>

        <div class="toolbar-group">
          <span class="toolbar-label">交互与手势</span>
          <div class="scissor-btn-group">
            <button type="button" class="tool-chip tool-chip-accent" id="btn-toggle-gesture-cam" title="拇指与食指分开瞄准，捏合剪下一撮，松开准备下一剪">
              ${STUDIO_SVGS.webcam}
              <span>捏合剪发</span>
            </button>
          </div>
        </div>


      </div>

      <div class="scene-stage-canvas" id="canvas-3d-stage">
        <nav class="studio-view-controls" aria-label="试剪视角">
          ${['front','left','right','back'].map(name=>`<button type="button" class="tool-chip ${name==='front'?'active':''}" data-view="${name}" aria-pressed="${name==='front'}">${studioView(name).label}</button>`).join('')}
          <span>右键拖拽自由旋转</span>
        </nav>
        <div class="scene-hud" id="scene-hud">
          <div class="hud-title">
            <span>虚拟发段剩余比例</span>
            <span class="hud-count" id="hud-cut-count">已剪 0 段发丝</span>
          </div>
          <div class="hud-sections">
            ${ZONES.map((key) => `
              <div class="hud-row">
                <span class="hud-label">${ZONE_LABELS[key]}</span>
                <div class="hud-bar-container"><div class="hud-bar-fill" id="hud-bar-${key}" style="width:100%"></div></div>
                <span class="hud-val" id="hud-val-${key}">100%</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 摄像头隔空手势剪发画中画取景舱 (Mirrored PiP Gesture HUD) -->
        <div class="gesture-cam-dock" id="gesture-cam-dock" hidden>
          <div class="gesture-dock-head">
            <div class="gesture-status-dot" id="gesture-status-dot"></div>
            <span id="gesture-status-label">正在准备摄像头</span>
            <button type="button" class="gesture-close-btn" id="btn-close-gesture-dock" title="关闭手势剪发">${STUDIO_SVGS.close}</button>
          </div>
          <div class="gesture-video-box">
            <video id="gesture-webcam-video" autoplay playsinline muted></video>
            <canvas id="gesture-overlay-canvas" width="240" height="180"></canvas>
          </div>
          <div class="gesture-dock-foot">
            <button type="button" class="gesture-mini-btn" id="btn-snap-webcam-to-3d">用镜头照片作外观参考</button>
            <small class="gesture-help">掌心大致朝向镜头，拇指与食指分开瞄准，轻轻捏合剪下一撮。松开后再剪，其余手指自然放松。</small>
            <small id="gesture-last-action">松开瞄准，捏合剪下一撮头发</small>
            <button type="button" class="gesture-mini-btn" id="btn-gesture-diagnostic" disabled>开始动作诊断</button>
            <button type="button" class="gesture-mini-btn" id="btn-stop-gesture-diagnostic" hidden>结束记录</button>
            <small id="gesture-diagnostic-status">仅记录开合数值，不录制画面</small>
            <details id="gesture-diagnostic-details"><summary>查看本次诊断</summary><textarea id="gesture-diagnostic-report" aria-label="手势诊断报告" readonly rows="7"></textarea></details>
            <small id="gesture-model-status">本地模型尚未加载</small>
            <button type="button" class="gesture-mini-btn" id="btn-demo-gesture-wave">自动剪发演示（非手势识别）</button>
          </div>
        </div>

        <div class="hud-cut-feedback" id="hud-cut-feedback"></div>
        <div class="brush-ring" id="brush-ring">
          <div class="scissor-cursor-svg"><svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><g class="blade-upper"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12L20 20"/></g><g class="blade-lower"><circle cx="6" cy="18" r="3"/><path d="M8.12 15.88L20 4"/></g></svg></div>
        </div>
        <div class="hud-tip" id="hud-tip-text">
          <span><strong>左键轻扫发梢</strong> 或开启 <strong>捏合剪发</strong> · 切换上方视角可剪侧面与后脑</span>
        </div>
      </div>

      <div class="actions-row">
        <button id="btn-back-to-result" class="btn-primary">
          ${STUDIO_SVGS.back}
          <span>返回换发预览</span>
        </button>
        <button id="btn-export-card" class="btn-primary">保存理发沟通卡</button>
        <button id="btn-reset-scene" class="btn-secondary">
          ${STUDIO_SVGS.undo}
          <span>恢复当前发型完整长度</span>
        </button>
      </div>
    </div>
  `;

  const container = root.querySelector('#canvas-3d-stage');
  const brushRing = root.querySelector('#brush-ring');
  const toastEl = root.querySelector('#hud-cut-feedback');
  const cutCountEl = root.querySelector('#hud-cut-count');

  root.querySelector('#btn-back-to-result')?.addEventListener('click', () => {
    sessionStore.setScreen('result');
  });

  sessionStore.resetHairSections();

  // ---- 渲染器 -------------------------------------------------------------
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (err) {
    container.insertAdjacentHTML('beforeend', '<p class="scene-fallback">当前浏览器无法启动 WebGL，3D 剪发不可用。</p>');
    return { teardown() {} };
  }

  let width = container.clientWidth || 800;
  let height = container.clientHeight || 520;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.96;
  renderer.shadowMap.enabled = true;
  // Only the static head/collar cast shadows. Falling lines and hair ribbons do not.
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.backdrop);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const roomEnv = new RoomEnvironment();
  const envTexture = pmrem.fromScene(roomEnv, 0.04).texture;
  scene.environment = envTexture;
  scene.environmentIntensity = 0.42;
  if (typeof roomEnv.dispose === 'function') roomEnv.dispose();
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 50);
  camera.position.set(0.0, 0.16, 4.75); // 正面微仰高定人像机位，直观展现本人五官与发型

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, -0.18, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 2.9;
  controls.maxDistance = 7.6;
  controls.minPolarAngle = 0.25;
  controls.maxPolarAngle = 1.75;
  controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE };
  controls.update();
  controls.addEventListener('change',requestRender);

  // ---- 灯光（柔和影棚高定蝴蝶光 + 轮廓暖光） -------------------------------
  const keyDir = new THREE.Vector3(2.2, 3.6, 4.2).normalize();
  const rimDir = new THREE.Vector3(-3.6, 2.6, -3.0).normalize();
  const fillDir = new THREE.Vector3(-2.6, 0.6, 3.5).normalize();

  scene.add(new THREE.HemisphereLight(0xfff5ea, 0x18201c, 0.52));
  const keyLight = new THREE.DirectionalLight(0xfff4e6, 1.65);
  keyLight.position.copy(keyDir).multiplyScalar(8);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.left = -2.8;
  keyLight.shadow.camera.right = 2.8;
  keyLight.shadow.camera.top = 2.8;
  keyLight.shadow.camera.bottom = -2.8;
  keyLight.shadow.bias = -0.0004;
  keyLight.shadow.radius = 3.8;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xe4ecf5, 0.62);
  fillLight.position.copy(fillDir).multiplyScalar(7);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffd6ab, 1.05);
  rimLight.position.copy(rimDir).multiplyScalar(8);
  scene.add(rimLight);

  // ---- Anatomical head and shoulders from the licensed graphical template ----
  const tmp = new THREE.Vector3();
  const headGeo = createAnatomicalHead();
  {
    const pos=headGeo.attributes.position, colors=new Float32Array(pos.count*3);
    const c=new THREE.Color(),white=new THREE.Color(0xffffff),scalpCol=new THREE.Color(COLORS.scalp);
    for(let i=0;i<pos.count;i++){
      tmp.set(pos.getX(i),pos.getY(i),pos.getZ(i)).normalize();
      c.copy(white).lerp(scalpCol,scalpTintMask(tmp.x,tmp.y,tmp.z));
      colors[i*3]=c.r;colors[i*3+1]=c.g;colors[i*3+2]=c.b;
    }
    headGeo.setAttribute('color',new THREE.BufferAttribute(colors,3));
  }

  const nativeTextureState={skinReady:false,eyesReady:false,skinFailed:false,eyesFailed:false};
  let nativeTextureEpoch=1;
  const nativeAssetEpoch=nativeTextureEpoch;
  function nativeAssetLoaded(kind,texture){
    if(disposed||nativeAssetEpoch!==nativeTextureEpoch){texture.dispose();return;}
    const ready=(texture.image?.width||0)>0&&(texture.image?.height||0)>0;
    nativeTextureState[`${kind}Ready`]=ready;nativeTextureState[`${kind}Failed`]=!ready;
    applyNativeAppearance(nativeAssetEpoch);
  }
  function nativeAssetFailed(kind){
    if(disposed||nativeAssetEpoch!==nativeTextureEpoch)return;
    nativeTextureState[`${kind}Failed`]=true;applyNativeAppearance(nativeAssetEpoch);
  }
  const skinTexture=new THREE.TextureLoader().load('/models/head-skin.png',texture=>nativeAssetLoaded('skin',texture),undefined,()=>nativeAssetFailed('skin'));
  skinTexture.colorSpace=THREE.SRGBColorSpace;
  skinTexture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  const eyeTexture=new THREE.TextureLoader().load('/models/head-eyes.png',texture=>nativeAssetLoaded('eyes',texture),undefined,()=>nativeAssetFailed('eyes'));
  eyeTexture.colorSpace=THREE.SRGBColorSpace;
  const headMat = new THREE.MeshPhysicalMaterial({
    map:null,
    color:COLORS.porcelain,
    vertexColors: true,
    roughness: 0.70,
    metalness: 0.0,
    clearcoat: 0.0,
    clearcoatRoughness: 0.62,
    sheen: 0.14,
    sheenRoughness: 0.72,
    sheenColor: new THREE.Color(0xf6e8dc)
  });

  // ---- Native skin UVs with limited photo color reference ----
  const faceCanvas = document.createElement('canvas');
  faceCanvas.width = 512;
  faceCanvas.height = 512;
  const faceCtx = faceCanvas.getContext('2d');

  const faceUniforms = {
    uPortrait: {value:skinTexture}, uPortraitMask:{value:skinTexture}, uPortraitOn:{value:0},
    uPortraitFit:{value:new THREE.Vector3(.5,.45,2)},
    uUseSkin: {value:1},
    uSkinBase: {value:new THREE.Color(COLORS.porcelain)},
    uScalpRoot: {value:new THREE.Color(COLORS.hairRoot)},
    uClothColor: {value:new THREE.Color(COLORS.cloth)}
  };
  let headCompiledUniforms = null;
  let appearanceEpoch=0;
  const portraitDeclarations='\nuniform sampler2D uPortrait; uniform sampler2D uPortraitMask; uniform float uPortraitOn; uniform vec3 uPortraitFit;';
  const portraitFragment=`
    vec2 photoUV=vec2(uPortraitFit.x+vObjPos.x/uPortraitFit.z,1.0-uPortraitFit.y+(vObjPos.y-0.04595)/uPortraitFit.z);
    float photoMask=uPortraitOn*smoothstep(0.12,0.34,vObjPos.z)*(1.0-smoothstep(0.41,0.53,abs(vObjPos.x)))*smoothstep(-0.64,-0.56,vObjPos.y)*(1.0-smoothstep(0.38,0.50,vObjPos.y));
    photoMask*=step(0.0,photoUV.x)*step(photoUV.x,1.0)*step(0.0,photoUV.y)*step(photoUV.y,1.0);
  `;
  headMat.onBeforeCompile=shader=>{
    Object.assign(shader.uniforms,faceUniforms);
    headCompiledUniforms=shader.uniforms;
    shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vObjPos;').replace('#include <begin_vertex>','#include <begin_vertex>\nvObjPos=position;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>'+portraitDeclarations+'\nuniform float uUseSkin; uniform vec3 uSkinBase; uniform vec3 uScalpRoot; uniform vec3 uClothColor; varying vec3 vObjPos;').replace('#include <color_fragment>',`#include <color_fragment>
      diffuseColor.rgb *= uUseSkin>0.5?clamp(uSkinBase/vec3(0.62,0.47,0.35),vec3(0.72),vec3(1.25)):vec3(0.18);
      float scalpCoverage=(1.0-smoothstep(0.10,0.70,max(vColor.r,max(vColor.g,vColor.b))))*uUseSkin;
      diffuseColor.rgb=mix(diffuseColor.rgb,uScalpRoot*0.72,scalpCoverage);
      float collarLine=-0.85+0.14*vObjPos.x*vObjPos.x;
      float sweaterMask=1.0-smoothstep(collarLine-0.03,collarLine+0.03,vObjPos.y);
      diffuseColor.rgb=mix(diffuseColor.rgb,uClothColor,sweaterMask);
      ${portraitFragment}`).replace('#include <lights_physical_fragment>',`#include <lights_physical_fragment>
      material.roughness=mix(material.roughness,1.0,scalpCoverage);
      material.specularColor*=mix(1.0,0.08,scalpCoverage);
      material.specularF90*=mix(1.0,0.08,scalpCoverage);
      #ifdef USE_SHEEN
      material.sheenColor*=1.0-scalpCoverage;
      #endif`);
  };

  const head = new THREE.Mesh(headGeo, headMat);
  head.castShadow = true;
  head.receiveShadow = true;
  scene.add(head);
  let headGpuDiagnostic=null,headGpuDiagnosticKey='';
  if(options.debugAppearance)head.onAfterRender=()=>{
    const key=`${appearanceEpoch}:${headMat.version}:${skinTexture.version}:${Number(!!headMat.map)}`;
    if(key===headGpuDiagnosticKey)return;
    headGpuDiagnosticKey=key;
    try{
      const gl=renderer.getContext(),program=renderer.properties.get(headMat).currentProgram?.program;
      const read=name=>{const location=gl.getUniformLocation(program,name);if(location===null)return null;const value=gl.getUniform(program,location);return ArrayBuffer.isView(value)?Array.from(value):value;};
      const mapUnit=read('map'),active=gl.getParameter(gl.ACTIVE_TEXTURE);let nativeMapBound=null;
      if(Number.isInteger(mapUnit)){try{gl.activeTexture(gl.TEXTURE0+mapUnit);nativeMapBound=gl.getParameter(gl.TEXTURE_BINDING_2D)===renderer.properties.get(skinTexture).__webglTexture;}finally{gl.activeTexture(active);}}
      headGpuDiagnostic={useSkin:read('uUseSkin'),skinBase:read('uSkinBase'),scalpRoot:read('uScalpRoot'),diffuse:read('diffuse'),mapUnit,nativeMapBound};
    }catch(error){headGpuDiagnostic={error:error.message};}
  };

  // Ears are part of the anatomical head; fitted eyes share its reference pose.
  const eyes=new THREE.Mesh(createAnatomicalEyes(),createEyeMaterial());
  scene.add(eyes);
  let eyesUseNative=false;
  function projectEyes(material){
    const previous=material.onBeforeCompile;
    material.onBeforeCompile=shader=>{
      previous.call(material,shader);Object.assign(shader.uniforms,faceUniforms);
      shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vObjPos;').replace('#include <begin_vertex>','#include <begin_vertex>\nvObjPos=position;');
      shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vObjPos;'+portraitDeclarations).replace('#include <color_fragment>','#include <color_fragment>\n'+portraitFragment);
    };
    material.needsUpdate=true;
  }
  projectEyes(eyes.material);
  function applyNativeAppearance(resourceEpoch=nativeTextureEpoch){
    const state=selectNativeAppearance({source:currentFaceSource,...nativeTextureState,disposed,resourceCurrent:resourceEpoch===nativeTextureEpoch});
    if(!state.apply)return;
    const map=state.skinMap&&!portraitProfile?skinTexture:null;
    if(headMat.map!==map){headMat.map=map;headMat.needsUpdate=true;}
    headMat.color.set((state.skinMap&&!portraitProfile)||currentFaceSource==='clay'?0xffffff:COLORS.porcelain);
    faceUniforms.uUseSkin.value=Number(state.useSkin);
    if(eyesUseNative!==state.eyeMap){const previous=eyes.material;eyes.material=createEyeMaterial(state.eyeMap?eyeTexture:null);projectEyes(eyes.material);previous.dispose();eyesUseNative=state.eyeMap;}
    faceUniforms.uPortraitOn.value=Number(!!portraitProfile&&currentFaceSource==='generated');
    if(portraitFace){portraitFace.visible=true;portraitFace.material.map=currentFaceSource==='generated'?portraitTexture:null;portraitFace.material.color.set(currentFaceSource==='generated'?0xffffff:COLORS.porcelain);portraitFace.material.needsUpdate=true;}
    eyes.visible=!(portraitProfile&&currentFaceSource==='generated');
    const status=root.querySelector('#native-appearance-status');
    if(status)status.textContent=portraitProfile&&currentFaceSource==='generated'?'融合图正面外观已对齐，侧后方为近似':{loading:'通用头模外观加载中，暂用暖色素模',ready:'通用头模外观已加载',clay:'正在查看通用素模',fallback:'头模外观未能完整加载，暂用素模'}[state.status];
    root.dataset.nativeAppearance=state.status;requestRender();
  }

  const collarGeo = new THREE.CylinderGeometry(1.65, 1.69, 0.34, 72);
  const collarMat = new THREE.MeshStandardMaterial({ color: 0x0e1512, roughness: 0.35, metalness: 0.65 });
  const collar = new THREE.Mesh(collarGeo, collarMat);
  collar.position.set(0, FLOOR_Y + 0.17, NECK_Z);
  collar.scale.z=0.55;
  collar.castShadow = true;
  collar.receiveShadow = true;
  scene.add(collar);

  const floorGeo = new THREE.CylinderGeometry(2.3, 2.3, 0.08, 96);
  const floorMat = new THREE.MeshStandardMaterial({ color: COLORS.stage, roughness: 0.85, metalness: 0.0 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.position.y = FLOOR_Y - 0.04;
  floor.receiveShadow = true;
  scene.add(floor);

  const rimGeo = new THREE.TorusGeometry(2.3, 0.012, 8, 160);
  const rimMat = new THREE.MeshStandardMaterial({ color: COLORS.copper, roughness: 0.35, metalness: 1.0 });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = FLOOR_Y;
  scene.add(rim);

  // ---- 可剪发丝的预设生成系统，形状参数独立于照片 ----
  const P = SEG + 1;
  const strandCapacity = GUIDE_COUNT * CHILDREN;
  let strandCount = strandCapacity;
  const basePos = new Float32Array(strandCapacity * P * 3);
  const strandZone = new Uint8Array(strandCapacity);
  const strandRand = new Float32Array(strandCapacity);
  const strandWidth = new Float32Array(strandCapacity).fill(1);
  const strandPointWidth = hairProfile.experimental?new Float32Array(strandCapacity * P).fill(1):null;
  const cutIdx = new Float32Array(strandCapacity).fill(SEG);

  const zoneTotal = new Float32Array(ZONES.length);
  const zoneRemain = new Float32Array(ZONES.length);
  let cutCount = 0;

  const hairStorage = createHairRenderStorage(strandCapacity,hairProfile);
  let referenceBakes=0;
  const hairGeo = new THREE.BufferGeometry();
  const hairAttributes = Object.fromEntries(Object.entries(hairStorage.attributes).map(([name,attribute])=>[name,new THREE.BufferAttribute(attribute.array,attribute.itemSize)]));
  const dynamicHairAttributes = Object.values(hairAttributes);
  for(const [name,attribute] of Object.entries(hairAttributes)){attribute.setUsage(THREE.DynamicDrawUsage);hairGeo.setAttribute(name,attribute);}
  hairGeo.setIndex(new THREE.BufferAttribute(hairStorage.indices,1));
  const hairMat = hairStorage.createMaterial({root:COLORS.hairRoot,tip:COLORS.hairTip,vertexShader:HAIR_VERT,fragmentShader:HAIR_FRAG,keyDir,rimDir});
  const hairMesh = new THREE.Mesh(hairGeo, hairMat);
  hairMesh.frustumCulled = false;
  hairMesh.castShadow = false;
  scene.add(hairMesh);

  let buildingHair = false;
  function writeStrand(s) {
    hairStorage.write(basePos,s,cutIdx[s],strandRand[s],strandWidth[s],strandPointWidth);
    if(!buildingHair)for(const attribute of dynamicHairAttributes)attribute.addUpdateRange(s*P*HAIR_SIDES*attribute.itemSize,P*HAIR_SIDES*attribute.itemSize);
  }
  function markWholeHairUpdated(){
    for(const attribute of dynamicHairAttributes){attribute.clearUpdateRanges();attribute.addUpdateRange(0,strandCount*P*HAIR_SIDES*attribute.itemSize);attribute.needsUpdate=true;}
  }
  function finishHairBuild(metadata){
    zoneTotal.fill(0);
    for(let s=0;s<strandCount;s++)zoneTotal[strandZone[s]]+=SEG-MIN_CUT;
    zoneRemain.set(zoneTotal);cutIdx.fill(0);cutIdx.fill(SEG,0,strandCount);cutCount=0;
    for(let s=0;s<strandCount;s++)writeStrand(s);
    hairGeo.setDrawRange(0,strandCount*SEG*hairProfile.indicesPerSegment);
    hairMesh.userData.groomSource=metadata;root.dataset.groomId=metadata.groomId;root.dataset.groomMethod=metadata.method;
    root.querySelector('#groom-source-note').textContent=metadata.method==='generated-portrait-measured'
      ? '本次融合图驱动的短发近似模型，已测量正面轮廓与刘海；侧面深度和后脑发束为推断。支持浅背景、深色短发正面图。'
      : metadata.method==='manually-authored-reference-approximation'
      ? '实验模型未通过视觉验收，独立评分4/10。按示例理想图手工近似，侧面与后脑为合理近似；不代表任意上传照片的3D重建。'
      : '当前为通用预设发型，照片提供配色参考；侧面与后脑造型为近似。';
    buildingHair=false;markWholeHairUpdated();
    onGroomRebuilt();
  }

  function buildHairArchetype(archetypeKey) {
    requestRender();
    if(archetypeKey==='portrait'&&portraitProfile){
      currentHairArchetype='portrait';buildingHair=true;
      const groom=createPortraitGroom(portraitProfile,{segments:SEG});
      strandCount=groom.strandCount;basePos.set(groom.basePos);strandZone.set(groom.zoneIndices);strandRand.set(groom.randomValues);
      strandWidth.fill(1);if(strandPointWidth)strandPointWidth.fill(1);hairMat.uniforms.uWidth.value=.0032;
      finishHairBuild(groom.metadata);return;
    }
    currentHairArchetype = HAIR_ARCHETYPES[archetypeKey] ? archetypeKey : 'crop';
    const arch = HAIR_ARCHETYPES[currentHairArchetype];
    const isCrop = currentHairArchetype === 'crop';
    const rand = mulberry32(20261024);
    buildingHair=true;
    hairMat.uniforms.uWidth.value=hairProfile.experimental?(isCrop?REFERENCE_GROOM_FIBER_RADIUS:.0022):.0032;
    if(isCrop&&hairStorage.bakeCrop){
      referenceBakes++;
      const groom=hairStorage.bakeCrop({segments:SEG,mask:hairMask,classifyZone:zoneOf,collide});
      strandCount=groom.strandCount;basePos.set(groom.basePos);strandZone.set(groom.zoneIndices);
      strandRand.set(groom.randomValues);strandWidth.set(groom.widthScale);strandPointWidth.set(groom.pointWidthScale);
      finishHairBuild(groom.metadata);return;
    }
    strandCount=strandCapacity;strandWidth.fill(1);if(strandPointWidth)strandPointWidth.fill(1);

    function growStrand(rootPt, n, len, layerOffset, zone) {
      const pts = [rootPt.clone()];
      const partFlow = Math.tanh((rootPt.x - 0.01) / 0.15);
      const sideSign = rootPt.x >= 0.01 ? 1 : -1;
      const strandCurlPhase = rand() * Math.PI * 2;

      const comb = new THREE.Vector3().subVectors(rootPt, WHORL);
      comb.addScaledVector(n, -comb.dot(n));
      if (comb.lengthSq() < 1e-6) comb.set(0, 0, -1);
      comb.normalize();

      if (zone === 'front') {
        // 纹理微分碎盖 / 逗点卷刘海：自然垂落额前并带空气蓬松卷度
        const outerCurtain = smoothstep(0.08, 0.34, Math.abs(rootPt.x - 0.01));
        comb.set(partFlow * (0.08 + 0.24 * outerCurtain), -0.84, 0.52).normalize();
        comb.addScaledVector(n, -comb.dot(n)).normalize();
      } else if (zone === 'crown') {
        if (rootPt.z > -0.15) {
          const forwardFactor = smoothstep(-0.15, 0.55, rootPt.z);
          comb.x += partFlow * (isCrop ? 0.35 : 0.62) * forwardFactor;
          comb.z += (isCrop ? 0.38 : -0.45) * forwardFactor;
          comb.y -= 0.28;
          comb.addScaledVector(n, -comb.dot(n)).normalize();
        }
      } else if (zone === 'left' || zone === 'right') {
        comb.y = Math.min(comb.y, -0.58);
        comb.z = isCrop ? comb.z * 0.25 : Math.min(comb.z * 0.45, -0.18);
        comb.addScaledVector(n, -comb.dot(n)).normalize();
      } else if (zone === 'back') {
        comb.y = Math.min(comb.y, -0.62);
        comb.addScaledVector(n, -comb.dot(n)).normalize();
      }

      const rootLift = zone === 'crown' ? arch.rootLift : arch.rootLift * 0.85;
      const dir = new THREE.Vector3().copy(n).multiplyScalar(rootLift).addScaledVector(comb, 0.92).normalize();
      const segLen = len / LEGACY_SEG;
      const p = rootPt.clone();

      for (let k = 1; k <= LEGACY_SEG; k++) {
        const t = k / LEGACY_SEG;
        const grav = isCrop ? (0.06 + 0.07 * t) : (0.10 + 0.11 * t);
        dir.y -= grav;

        if (isCrop) {
          // Baseline preset curvature; no inferred photo geometry.
          dir.x += Math.sin(t * Math.PI * 1.85 + strandCurlPhase) * 0.020;
          dir.z += Math.cos(t * Math.PI * 1.65 + strandCurlPhase * 0.7) * 0.016;
        } else if (zone === 'left' || zone === 'right') {
          if (t > 0.38) {
            const cCurl = Math.sin(smoothstep(0.38, 1.0, t) * Math.PI) * 0.12;
            dir.x -= p.x * cCurl;
            dir.z += 0.042 * smoothstep(0.50, 1.0, t);
          }
        }
        dir.normalize();
        p.addScaledVector(dir, segLen);

        const bangArch = zone === 'front' ? Math.sin(t * Math.PI) * (isCrop ? 0.028 : 0.015) : 0;
        const clearance = 0.008 + bangArch + layerOffset * smoothstep(0.0, 0.30, t);
        if (collide(p, clearance, _surfN)) {
          const vn = dir.dot(_surfN);
          if (vn < 0) dir.addScaledVector(_surfN, -vn * 1.01).normalize();
        }

        // 防止侧发遮挡五官眼鼻区域
        if (zone !== 'front' && p.z > 0.16 && p.y < 0.42 && p.y > -0.58) {
          const faceBorderX = THREE.MathUtils.lerp(0.28, 0.46, smoothstep(0.42, 0.05, p.y)) * smoothstep(-0.58, 0.08, p.y);
          if (Math.abs(p.x) < faceBorderX) {
            const pushDir = Math.sign(p.x) || sideSign;
            p.x += pushDir * 0.028;
            dir.x += pushDir * 0.045;
            dir.normalize();
          }
        }
        pts.push(p.clone());
      }
      return Array.from({length:P},(_,step)=>{
        const u=step/SEG*LEGACY_SEG,lo=Math.min(LEGACY_SEG-1,Math.floor(u));
        return new THREE.Vector3().lerpVectors(pts[lo],pts[lo+1],u-lo);
      });
    }

    const guides = [];
    for (const { x: dx, y: dy, z: dz } of sampleScalpDirections(GUIDE_COUNT, hairMask, rand)) {
      const rootPt = headSurface(dx, dy, dz, new THREE.Vector3());
      const n = new THREE.Vector3(dx, dy, dz).normalize();
      const zone = zoneOf(dx, dy, dz);
      const spatialShell = Math.sin(dx * 7.5 + dz * 6.5) * 0.5 + 0.5;
      const layerOffset = 0.011 + spatialShell * 0.020 + rand() * 0.005;

      let baseLen = arch.lengths[zone];
      if (zone === 'front') {
        if (isCrop) {
          // 微分碎盖逗点卷刘海：自然垂在眉眼上方（绝不戳进眼睛）
          const curtainArch = smoothstep(0.06, 0.34, Math.abs(dx - 0.01));
          const rootHeightExtra = Math.max(0, rootPt.y - 0.52) * 0.72;
          baseLen = THREE.MathUtils.lerp(0.20, 0.32, curtainArch) + rootHeightExtra;
        } else {
          const curtainArch = smoothstep(0.08, 0.36, Math.abs(dx - 0.02));
          const rootHeightExtra = Math.max(0, rootPt.y - 0.50) * 1.02;
          baseLen = THREE.MathUtils.lerp(0.28, 0.52, curtainArch) + rootHeightExtra;
        }
      } else if ((zone === 'left' || zone === 'right') && isCrop) {
        // 渐层收短鬓角（Tapered Fade）：越靠耳周越利落干净，完全露出耳朵与下颌线！
        const heightFade = smoothstep(0.12, 0.68, dy);
        baseLen = THREE.MathUtils.lerp(0.065, 0.28, heightFade);
      } else if (zone === 'back' && isCrop) {
        const backFade = smoothstep(-0.35, 0.62, dy);
        baseLen = THREE.MathUtils.lerp(0.055, 0.31, backFade);
      }
      const len = baseLen * (0.76 + rand() * 0.42);
      guides.push({
        pts: growStrand(rootPt, n, len, layerOffset, zone), zone, layerOffset, n
      });
    }

    const strandDir = new THREE.Vector3();
    const bitan = new THREE.Vector3();
    const lockNorm = new THREE.Vector3();
    const p = new THREE.Vector3();
    let s = 0;
    for (const g of guides) {
      const lockPhase1 = rand() * 6.28;
      const lockPhase2 = rand() * 6.28;
      const lockWaveAmp = arch.curlAmp * (0.75 + rand() * 0.55);

      strandDir.subVectors(g.pts[2], g.pts[0]).normalize();
      bitan.crossVectors(g.n, strandDir);
      if (bitan.lengthSq() < 1e-5) bitan.crossVectors(g.n, new THREE.Vector3(0, 0, 1));
      if (bitan.lengthSq() < 1e-5) bitan.set(1, 0, 0);
      bitan.normalize();
      lockNorm.copy(g.n);

      for (let c = 0; c < CHILDREN; c++, s++) {
        const ribbonSpread = ((c / (CHILDREN - 1)) - 0.5) * 0.052 + (rand() - 0.5) * 0.010;
        const radialSpread = (rand() - 0.5) * 0.009;
        const microPhase = rand() * 6.28;
        const childLenScale = 0.82 + 0.22 * rand();

        for (let k = 0; k < P; k++) {
          const t = k / SEG;
          const uSeg = Math.min(SEG, t * childLenScale * SEG);
          const k0 = Math.min(SEG - 1, Math.floor(uSeg));
          const frac = uSeg - k0;
          p.lerpVectors(g.pts[k0], g.pts[k0 + 1], frac);

          const wave = Math.sin(t * arch.curlFreq + lockPhase1) * lockWaveAmp * Math.pow(t, 0.75);
          const micro = Math.sin(t * 9.0 + microPhase) * 0.0022 * t * (1.0 - t);
          offsetChildHairPoint(p, bitan, lockNorm, {
            lateral: ribbonSpread, radial: radialSpread, progress: t, wave: wave + micro,
            depthWave: Math.cos(t * (arch.curlFreq * 0.85) + lockPhase2) * lockWaveAmp * 0.65 * t,
            clearance: 0.006 + g.layerOffset * smoothstep(0.0, 0.30, t)
          }, collide);
          const bi = (s * P + k) * 3;
          basePos[bi] = p.x; basePos[bi + 1] = p.y; basePos[bi + 2] = p.z;
        }
        strandZone[s] = ZONES.indexOf(g.zone);
        strandRand[s] = rand();
      }
    }

    finishHairBuild({groomId:`procedural-${currentHairArchetype}-v1`,method:'editable-procedural-preset',rear:'procedural-preset'});
  }

  buildHairArchetype(currentHairArchetype);

  // ---- 用生成图或正面照参考配色，头模与发型形状仍来自预设 ----
  function updateFaceSource(source, customDataUrl = null, autoAdaptHair = false) {
    currentFaceSource = source;
    portraitTask?.cancel();portraitTask=null;
    const request=++appearanceEpoch;
    if (source === 'clay') {
      faceUniforms.uSkinBase.value.set(COLORS.porcelain);
      applyNativeAppearance();
      return;
    }
    applyNativeAppearance();

    const url = customDataUrl
      || (source === 'generated'
        ? (sessionStore.state.generatedImage?.urlOrData || sessionStore.state.personalImage?.dataUrl)
        : (sessionStore.state.personalImage?.dataUrl || sessionStore.state.generatedImage?.urlOrData))
      || '/test-assets/last-generated-preview.png';

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      if(disposed || request!==appearanceEpoch)return;
      requestRender();
      const analysis = analyzePortraitAndCropFace(img, faceCtx, 512, 512);
      faceUniforms.uSkinBase.value.copy(analysis.skinColor);
      faceUniforms.uClothColor.value.copy(analysis.clothColor);

      // 参考照片的发色，并可采用粗略的短/中发提示。
      if ((source === 'generated' || autoAdaptHair) && !portraitProfile) {
        hairMat.uniforms.uRoot.value.copy(analysis.rootCol);
        hairMat.uniforms.uTip.value.copy(analysis.tipCol);
        faceUniforms.uScalpRoot.value.copy(analysis.rootCol);
        if (autoAdaptHair && !portraitProfile && analysis.detectedArchetype !== currentHairArchetype) {
          buildHairArchetype(analysis.detectedArchetype);
          root.querySelectorAll('#hair-archetypes .tool-chip').forEach((b) => {
            b.classList.toggle('active', b.getAttribute('data-archetype') === currentHairArchetype);
          });
        }
      }
      if(portraitEnabled&&source==='generated'&&hasGenerated&&!customDataUrl&&!portraitProfile){
        const note=root.querySelector('#groom-source-note');note.textContent='正在本地分析融合图的脸部与头发轮廓，首次加载约需数秒。';
        try{
          const task=analyzePortraitImage(img);portraitTask=task;
          const {landmarks,triangles}=await task.promise;
          if(disposed||request!==appearanceEpoch)return;
          portraitTask=null;
          const probe=document.createElement('canvas');probe.width=probe.height=512;
          const ctx=probe.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,512,512);
          portraitProfile=measurePortrait({...ctx.getImageData(0,0,512,512),width:512,height:512,landmarks});
          portraitTexture=new THREE.CanvasTexture(probe);portraitTexture.colorSpace=THREE.SRGBColorSpace;
          faceUniforms.uPortrait.value=portraitTexture;faceUniforms.uPortraitFit.value.set(portraitProfile.center,portraitProfile.eyeY,portraitProfile.scale);
          const maskCanvas=document.createElement('canvas');maskCanvas.width=maskCanvas.height=512;
          const maskCtx=maskCanvas.getContext('2d');maskCtx.beginPath();
          FACE_OVAL.forEach((index,i)=>{const point=landmarks[index];i?maskCtx.lineTo(point.x*512,point.y*512):maskCtx.moveTo(point.x*512,point.y*512);});
          maskCtx.closePath();maskCtx.fillStyle='#fff';maskCtx.fill();
          portraitMask=new THREE.CanvasTexture(maskCanvas);faceUniforms.uPortraitMask.value=portraitMask;
          const faceData=createPortraitFace(portraitProfile,triangles),faceGeometry=new THREE.BufferGeometry();
          const skull=createPortraitSkull(portraitProfile,faceData,{positions:Array.from(headGeo.attributes.position.array),indices:Array.from(headGeo.index.array)});
          headGeo.boundsTree?.dispose();delete headGeo.boundsTree;
          headGeo.setAttribute('position',new THREE.BufferAttribute(skull.positions,3));headGeo.setIndex(skull.indices);
          const skinColors=new Float32Array(skull.positions.length).fill(1),skinUV=new Float32Array(skull.positions.length/3*2);
          for(let i=0;i<skull.positions.length;i+=3){const mask=scalpTintMask(skull.positions[i],skull.positions[i+1],skull.positions[i+2]);skinColors.fill(1-mask*.92,i,i+3);}
          headGeo.setAttribute('color',new THREE.BufferAttribute(skinColors,3));headGeo.setAttribute('uv',new THREE.BufferAttribute(skinUV,2));
          headGeo.computeVertexNormals();headGeo.computeBoundingSphere();createHeadOcclusion(head,camera);
          faceGeometry.setAttribute('position',new THREE.BufferAttribute(faceData.positions,3));
          faceGeometry.setAttribute('uv',new THREE.BufferAttribute(faceData.uv,2));faceGeometry.setIndex(faceData.indices);faceGeometry.computeVertexNormals();
          portraitFace=new THREE.Mesh(faceGeometry,new THREE.MeshBasicMaterial({map:portraitTexture,side:THREE.DoubleSide,toneMapped:false}));scene.add(portraitFace);
          const hairColor=new THREE.Color(...portraitProfile.hairColor.map(v=>v/255)).convertSRGBToLinear();
          hairMat.uniforms.uRoot.value.copy(hairColor).multiplyScalar(.70);hairMat.uniforms.uTip.value.copy(hairColor).multiplyScalar(1.16);
          faceUniforms.uScalpRoot.value.copy(hairColor).multiplyScalar(.70);
          const button=root.querySelector('[data-archetype="portrait"]');button.disabled=false;button.textContent='本次融合图短发';
          if(portraitWanted){buildHairArchetype('portrait');root.querySelectorAll('#hair-archetypes .tool-chip').forEach(b=>b.classList.toggle('active',b===button));}
          applyNativeAppearance();requestRender();
        }catch(error){
          if(disposed||request!==appearanceEpoch)return;
          portraitTask=null;note.textContent='融合图建模未完成，当前显示预设。请使用正面、浅背景的深色短发图，或重新进入重试。';
          root.dataset.portraitError=error.message;
          const button=root.querySelector('[data-archetype="portrait"]');button.textContent='融合图建模未完成';
        }
      }
    };
    img.onerror=()=>{if(!disposed&&request===appearanceEpoch)root.querySelector('#groom-source-note').textContent='融合图读取失败，当前显示预设。请返回预览确认图片仍可访问。';};
    img.src = url;
  }

  // 初始化时参考 AI 换发图的配色与粗略长度提示。
  updateFaceSource(currentFaceSource, null, true);

  // ---- 掉落发段（预分配，零 GC）------------------------------------------
  const fragPos = new Float32Array(FRAG_SEG_CAP * 6);
  const fragLocal = new Float32Array(FRAG_SEG_CAP * 6);
  const segOwner = new Int32Array(FRAG_SEG_CAP).fill(-1);
  const fStart = new Int32Array(FRAG_CAP);
  const fCount = new Int32Array(FRAG_CAP);
  const fState = new Uint8Array(FRAG_CAP);
  const fC = new Float32Array(FRAG_CAP * 3);
  const fV = new Float32Array(FRAG_CAP * 3);
  const fAxis = new Float32Array(FRAG_CAP * 3);
  const fAng = new Float32Array(FRAG_CAP);
  const fSpin = new Float32Array(FRAG_CAP);
  const fRad = new Float32Array(FRAG_CAP);
  let segCursor = 0, segHigh = 0, fragCursor = 0;
  let emittedFragmentSegments = 0;

  const fragGeo = new THREE.BufferGeometry();
  const fragPosAttr = new THREE.BufferAttribute(fragPos, 3);
  fragPosAttr.setUsage(THREE.DynamicDrawUsage);
  fragGeo.setAttribute('position', fragPosAttr);
  fragGeo.setDrawRange(0, 0);
  const fragMat = new THREE.LineBasicMaterial({ color: COLORS.fallen });
  const fragLines = new THREE.LineSegments(fragGeo, fragMat);
  fragLines.frustumCulled = false;
  scene.add(fragLines);

  function killFragment(f) {
    const start = fStart[f], end = start + fCount[f];
    for (let i = start; i < end; i++) {
      if (segOwner[i] !== f) continue;
      segOwner[i] = -1;
      fragPos.fill(0, i * 6, i * 6 + 6);
    }
    fState[f] = 0;
    fCount[f] = 0;
  }

  function spawnFragment(s, fromFloat, toFloat) {
    const from = Math.max(0, Math.floor(fromFloat));
    const to = Math.min(SEG, Math.ceil(toFloat));
    const segs = to - from;
    if (segs <= 0 || (toFloat - fromFloat) < 0.35) return;

    const f = fragCursor;
    fragCursor = (fragCursor + 1) % FRAG_CAP;
    if (fCount[f] > 0) killFragment(f);

    if (segCursor + segs > FRAG_SEG_CAP) segCursor = 0;
    const start = segCursor;
    segCursor += segs;
    segHigh = Math.max(segHigh, segCursor);
    for (let i = start; i < start + segs; i++) {
      const o = segOwner[i];
      if (o >= 0) killFragment(o);
    }

    let cx = 0, cy = 0, cz = 0;
    const detachedStart = {x:0,y:0,z:0}, detachedEnd = {x:0,y:0,z:0};
    for (let k = from; k <= to; k++) {
      sampleDetachedPoint(basePos,s,SEG,fromFloat,toFloat,k,detachedStart);
      cx += detachedStart.x; cy += detachedStart.y; cz += detachedStart.z;
    }
    const cnt = segs + 1;
    cx /= cnt; cy /= cnt; cz /= cnt;

    let rad = 0;
    for (let j = 0; j < segs; j++) {
      const slot = start + j;
      segOwner[slot] = f;
      sampleDetachedPoint(basePos,s,SEG,fromFloat,toFloat,from+j,detachedStart);
      sampleDetachedPoint(basePos,s,SEG,fromFloat,toFloat,from+j+1,detachedEnd);
      const o = slot * 6;
      fragLocal[o] = detachedStart.x - cx; fragLocal[o + 1] = detachedStart.y - cy; fragLocal[o + 2] = detachedStart.z - cz;
      fragLocal[o + 3] = detachedEnd.x - cx; fragLocal[o + 4] = detachedEnd.y - cy; fragLocal[o + 5] = detachedEnd.z - cz;
      fragPos[o] = detachedStart.x; fragPos[o + 1] = detachedStart.y; fragPos[o + 2] = detachedStart.z;
      fragPos[o + 3] = detachedEnd.x; fragPos[o + 4] = detachedEnd.y; fragPos[o + 5] = detachedEnd.z;
      rad = Math.max(rad, Math.hypot(fragLocal[o + 3], fragLocal[o + 4], fragLocal[o + 5]));
    }

    emittedFragmentSegments += segs;
    fStart[f] = start;
    fCount[f] = segs;
    fState[f] = 1;
    fRad[f] = rad;
    const i3 = f * 3;
    fC[i3] = cx; fC[i3 + 1] = cy; fC[i3 + 2] = cz;

    tmp.set(cx - SHELL_C.x, cy - SHELL_C.y, cz - SHELL_C.z).normalize();
    fV[i3] = tmp.x * 0.5 + (Math.random() - 0.5) * 0.4;
    fV[i3 + 1] = tmp.y * 0.5 + 0.25 + (Math.random() - 0.5) * 0.2;
    fV[i3 + 2] = tmp.z * 0.5 + (Math.random() - 0.5) * 0.4;

    tmp.set(Math.random() - 0.5, (Math.random() - 0.5) * 0.3, Math.random() - 0.5).normalize();
    fAxis[i3] = tmp.x; fAxis[i3 + 1] = tmp.y; fAxis[i3 + 2] = tmp.z;
    fAng[f] = 0;
    fSpin[f] = (1 + Math.random() * 3) * (Math.random() < 0.5 ? -1 : 1);
    fragDirty = true;
  }

  function killAllFragments() {
    fragPos.fill(0);
    segOwner.fill(-1);
    fState.fill(0);
    fCount.fill(0);
    segCursor = 0; segHigh = 0; fragCursor = 0; emittedFragmentSegments = 0;
    fragDirty = true;
  }

  // ---- 剪发逻辑 -----------------------------------------------------------
  let hairDirty = false;
  let fragDirty = false;
  let hudDirty = true;

  function cutStrand(s, cutAt) {
    const old = cutIdx[s];
    cutIdx[s] = cutAt;
    zoneRemain[strandZone[s]] -= old - cutAt;
    cutCount++;
    spawnFragment(s, cutAt, old);
    writeStrand(s);
    hairDirty = true;
    hudDirty = true;
  }

  const occluded=createHeadOcclusion(head,camera);

  const viewProj = new THREE.Matrix4();
  let strokeSeed = 0;

  const visiblePoint = {x:0,y:0,z:0};
  function brushTest(ax, ay, bx, by, doCut, intent = 'drag') {
    camera.updateMatrixWorld();
    viewProj.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    const e = viewProj.elements;
    const W = width, H = height;
    const modeCfg = SCISSOR_MODES[currentScissorMode] || SCISSOR_MODES.point;
    const R = modeCfg.radius;
    const R2 = R * R;
    const sdx = bx - ax, sdy = by - ay;
    const len2 = sdx * sdx + sdy * sdy;
    let hits = 0;
    if (doCut) strokeSeed = (strokeSeed + 1) % 997;

    for (let s = 0; s < strandCount; s++) {
      const cut = cutIdx[s];
      if (cut <= MIN_CUT + 0.05) continue;
      const base = s * P;
      const kMax = Math.ceil(cut);

      for (let k = kMax; k >= 1; k--) {
        sampleVisiblePoint(basePos,s,SEG,cut,k,visiblePoint);
        const {x,y,z} = visiblePoint;
        const w = e[3] * x + e[7] * y + e[11] * z + e[15];
        if (w <= 0) continue;
        const sx = ((e[0] * x + e[4] * y + e[8] * z + e[12]) / w * 0.5 + 0.5) * W;
        const sy = (-(e[1] * x + e[5] * y + e[9] * z + e[13]) / w * 0.5 + 0.5) * H;
        let t = len2 > 0 ? ((sx - ax) * sdx + (sy - ay) * sdy) / len2 : 0;
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        const ddx = sx - (ax + sdx * t), ddy = sy - (ay + sdy * t);
        const dist2 = ddx * ddx + ddy * ddy;
        if (dist2 > R2) continue;
        if (occluded(x, y, z)) continue;
        hits++;
        if (!doCut) return hits;

        const hash = ((s * 0.6180339887 + strokeSeed * 0.314159) % 1);
        const sampleRate = intent === 'snip' && currentScissorMode !== 'thin' ? 1 : modeCfg.sampleRate;
        if (hash > sampleRate) break;

        const radialWeight = 1.0 - Math.sqrt(dist2) / R;
        const nextCut = nextCutPosition({current:cut,hit:k,minimum:MIN_CUT,stepTrim:modeCfg.stepTrim,weight:radialWeight,jitter:(strandRand[s]-.5)*1.1,intent});
        if (nextCut < cut - 0.08) {
          cutStrand(s, nextCut);
        }
        break;
      }
    }
    return hits;
  }

  // ---- HUD ----------------------------------------------------------------
  function zonePercents() {
    const out = {};
    ZONES.forEach((key, i) => {
      out[key] = zoneTotal[i] ? Math.round((zoneRemain[i] / zoneTotal[i]) * 100) : 100;
    });
    return out;
  }

  function updateHUD() {
    const pct = zonePercents();
    ZONES.forEach((key) => {
      const bar = root.querySelector(`#hud-bar-${key}`);
      const val = root.querySelector(`#hud-val-${key}`);
      if (bar) bar.style.width = `${pct[key]}%`;
      if (val) val.textContent = `${pct[key]}%`;
    });
    if (cutCountEl) cutCountEl.textContent = `已剪 ${cutCount} 段发丝`;
  }

  let toastTimer = null;
  function showToast(text) {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.classList.add('active');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('active'), 1600);
  }

  // ---- 指针与手势光标控制 -------------------------------------------------
  let cutting = false;
  let activePointerId = null;
  let lastX = 0, lastY = 0;

  function localPoint(e) {
    const rect = container.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top];
  }

  function moveRing(x, y) {
    const r = (SCISSOR_MODES[currentScissorMode] || SCISSOR_MODES.point).radius;
    brushRing.style.width = `${r * 2}px`;
    brushRing.style.height = `${r * 2}px`;
    brushRing.style.margin = `${-r}px 0 0 ${-r}px`;
    brushRing.style.transform = `translate(${x}px, ${y}px)`;
  }

  // ---- Real local finger-landmark input; automatic demo remains a separate opt-in. ----
  let gestureActive = false;
  let gestureDemoMode = false;
  let gestureDemoPhase = 0;
  const gestureNow=options.gestureNow || (()=>performance.now());
  let gestureFocused = document.hasFocus();
  let acceptFramesAfter = gestureNow();
  const gestureDock = root.querySelector('#gesture-cam-dock');
  const gestureVideo = root.querySelector('#gesture-webcam-video');
  const gestureCanvas = root.querySelector('#gesture-overlay-canvas');
  const gestureCtx = gestureCanvas.getContext('2d');
  const gestureBtn = root.querySelector('#btn-toggle-gesture-cam');
  const gestureStatusLabel = root.querySelector('#gesture-status-label');
  const modelStatusLabel = root.querySelector('#gesture-model-status');
  const gestureOutcome = root.querySelector('#gesture-last-action');
  const diagnosticButton=root.querySelector('#btn-gesture-diagnostic');
  const diagnosticStopButton=root.querySelector('#btn-stop-gesture-diagnostic');
  const diagnosticStatus=root.querySelector('#gesture-diagnostic-status');
  const diagnosticReport=root.querySelector('#gesture-diagnostic-report');
  const diagnostics=new GestureDiagnostics({continuous:true});
  let diagnosticBaseline={recognized:0,hits:0};
  const scissors = new PinchGesture();
  // Read-only reference. It consumes the same eligible frames and never cuts geometry.
  const legacyScissors = new ScissorsGesture({space:'world',requireFoldedRing:true,relativeCloseRatio:.5});
  const pipeline=new GesturePipeline({recognizer:scissors,reference:legacyScissors,diagnostics,now:gestureNow,onCut:(x,y)=>{
    cameraSession.arm(true);
    try{return cameraSession.mayCut?snipAt(x,y):{affectedStrands:0};}
    finally{cameraSession.arm(false);}
  }});
  const handTracker = (options.createHandTracker || (config=>new HandTracker(config)))({
    now:gestureNow,
    onState: state => {
      diagnostics.mark('model-'+state.status,gestureNow());
      if (state.status === 'error') { if(diagnostics.active||diagnostics.waiting)finishDiagnostic('model-error');cameraSession.stop();resetGestureIntent(); }
      refreshGestureStatus();
    },
    onResult: handleHandResult
  });
  const cameraSession = new CameraSession({
    request: options.requestCamera || (() => navigator.mediaDevices.getUserMedia({ video: {width:{ideal:640},height:{ideal:480},facingMode:'user'}, audio:false })),
    update: state => {
      diagnostics.mark('camera-'+state.status,gestureNow());
      if (gestureVideo.srcObject !== state.stream) gestureVideo.srcObject = state.stream;
      if (state.status !== 'ready') resetGestureIntent();
      refreshGestureStatus();
    }
  });
  function refreshGestureStatus() {
    gestureActive = gestureDemoMode || cameraSession.status !== 'idle' || handTracker.status !== 'idle';
    const ratio=Math.min(window.devicePixelRatio || 1,gestureActive?1:1.5);
    if(renderer.getPixelRatio()!==ratio){renderer.setPixelRatio(ratio);renderer.setSize(width,height);requestRender();}
    gestureDock.hidden = !gestureActive;
    gestureBtn.classList.toggle('active',gestureActive);
    // A numeric trial may wait for permission/loading; actual capture and cutting still require ready.
    diagnosticButton.disabled=gestureDemoMode || (!(diagnostics.active||diagnostics.waiting) &&
      (!['pending','ready'].includes(cameraSession.status)||!['loading','ready'].includes(handTracker.status)));
    diagnosticButton.textContent=diagnostics.active||diagnostics.waiting?'更新诊断报告':'开始动作诊断';
    diagnosticStopButton.hidden=!(diagnostics.active||diagnostics.waiting);
    modelStatusLabel.textContent = handTracker.status === 'ready'
      ? '模型已加载 · 正在测量响应速度'
      : handTracker.status === 'loading' ? '正在加载本地手部模型…' : '本地模型尚未启动';
    if (gestureDemoMode) gestureStatusLabel.textContent = '自动剪发演示 · 非手势识别';
    else if (handTracker.status === 'error') gestureStatusLabel.textContent = handTracker.message;
    else if (cameraSession.status === 'error') gestureStatusLabel.textContent = '摄像头不可用，请关闭后重试或用鼠标试剪';
    else if (cameraSession.status === 'pending') gestureStatusLabel.textContent = '等待摄像头授权，尚未剪发';
    else if (handTracker.status === 'loading') gestureStatusLabel.textContent = '正在准备捏合识别，尚未剪发';
    else if (cameraSession.status === 'ready') gestureStatusLabel.textContent = '请让拇指与食指分开，移动瞄准';
    else gestureStatusLabel.textContent = '摄像头已关闭';
  }
  function resetGestureIntent() {
    pipeline.reset();
    snipVisualUntil=0;
    // Guard initialization: called by camera updates only after construction.
    if (typeof cameraSession !== 'undefined') cameraSession.arm(false);
    brushRing.classList.remove('visible','cutting');
    gestureCtx.clearRect(0,0,240,180);
  }

  let orbitDragging=false,lastViewMotion=0;
  function invalidateViewInput(reason){
    cancelPointerCut();acceptFramesAfter=gestureNow();resetGestureIntent();
    diagnostics.mark(reason,acceptFramesAfter);
  }
  onGroomRebuilt=(reason='groom-rebuilt')=>{
    invalidateViewInput(reason);killAllFragments();hudDirty=true;sessionStore.resetHairSections();
  };
  function onOrbitStart(){orbitDragging=true;viewChanging=true;lastViewMotion=gestureNow();invalidateViewInput('view-moving');}
  function onOrbitChange(){
    if(viewChanging)lastViewMotion=gestureNow();
    root.querySelectorAll('[data-view]').forEach(button=>{button.classList.remove('active');button.setAttribute('aria-pressed','false');});
  }
  function onOrbitEnd(){orbitDragging=false;lastViewMotion=gestureNow();}
  controls.addEventListener('start',onOrbitStart);
  controls.addEventListener('change',onOrbitChange);
  controls.addEventListener('end',onOrbitEnd);
  root.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
    const view=studioView(button.dataset.view);if(!view)return;
    viewChanging=true;orbitDragging=false;invalidateViewInput('view-changed');
    // Flush residual orbit damping before assigning the selected view.
    const damping=controls.enableDamping;controls.enableDamping=false;controls.update();
    camera.position.set(...view.position);controls.target.set(...view.target);controls.update();controls.enableDamping=damping;
    lastViewMotion=gestureNow();requestRender();
    root.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
    if(gestureActive)gestureStatusLabel.textContent='已切换到'+view.label+'，松开手指后瞄准';
  }));
  function toggleGestureCam() {
    if (gestureActive) { stopGestureCam(); return; }
    gestureDemoMode = false;
    acceptFramesAfter = gestureNow();
    gestureFocused = document.hasFocus();
    cameraSession.start();
    handTracker.start();
  }
  function stopGestureCam(reason='camera-closed') {
    if(diagnostics.active||diagnostics.waiting)finishDiagnostic(reason);
    gestureDemoMode = false;
    handTracker.stop(); cameraSession.stop(); resetGestureIntent();
    refreshGestureStatus();
  }
  function canUseHand() {
    return gestureFocused && document.hasFocus() && document.visibilityState === 'visible' && !cutting && !root.querySelector('dialog[open]');
  }
  const HAND_LINKS = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]];
  function drawHand(points,closed) {
    gestureCtx.clearRect(0,0,240,180);
    if (!points) return;
    gestureCtx.strokeStyle = closed ? '#e0a27f' : '#80c4a9'; gestureCtx.lineWidth = 1.5;
    for (const [a,b] of HAND_LINKS) {
      gestureCtx.beginPath();gestureCtx.moveTo((1-points[a].x)*240,points[a].y*180);
      gestureCtx.lineTo((1-points[b].x)*240,points[b].y*180);gestureCtx.stroke();
    }
    for (let i=0;i<points.length;i++) {
      gestureCtx.fillStyle = i===4 || i===8 ? '#fff3de' : '#80c4a9';
      gestureCtx.beginPath();gestureCtx.arc((1-points[i].x)*240,points[i].y*180,i===4||i===8?4:2,0,Math.PI*2);gestureCtx.fill();
    }
  }
  function handleHandResult(frame) {
    const health=frame.runtime;
    const healthLabel=health?.status==='healthy'?'响应达标':health?.status==='slow'?'响应偏慢':health?.status==='no-hand'?'等待手进入画面':'测量响应中';
    modelStatusLabel.textContent = (handTracker.warmup?.delegate || '未知设备') + ' · '+healthLabel+' · 相机响应 ' + Math.round(frame.latencyMs ?? frame.inferenceMs) + ' ms · 本地处理 ' + Math.round(frame.inferenceMs) + ' ms';
    const result=pipeline.process(frame,{cameraReady:cameraSession.status==='ready',visible:document.visibilityState==='visible',
      focused:gestureFocused&&document.hasFocus(),mouseCutting:cutting,viewChanging,dialogOpen:!!root.querySelector('dialog[open]'),resumedAt:acceptFramesAfter,viewport:{width,height}});
    cameraSession.arm(result.armed);
    drawHand(result.eligible&&result.gates.fresh?result.landmarks:null,result.status==='snip'||result.status==='closed');
    const labels = {'no-hand':'未检测到手，请将整只手放入画面','not-scissors':'让食指自然伸出，拇指靠近食指指尖',uncertain:'识别短暂不稳，保持自然动作',opening:'请先分开拇指与食指',open:'已松开 · 移动瞄准发梢',closing:'正在捏合',closed:'松开拇指与食指，准备下一剪',snip:'咔嚓 · 已识别一次捏合'};
    const blockedLabels={'camera-not-ready':'正在准备摄像头','page-hidden':'返回试剪画面后继续','page-unfocused':'点击试剪画面继续手势',
      'mouse-cutting':'松开鼠标后继续捏合剪发','view-moving':'视角调整中，松开手指后再剪','dialog-open':'关闭弹窗后继续手势','before-resume':'画面已切换，请先松开拇指与食指',
      'viewport-invalid':'等待试剪画面恢复尺寸','stale':'画面延迟，请先松开拇指与食指','invalid-hand-data':'识别数据异常，本次动作已取消','cut-error':'剪发执行异常，请恢复发型后重试',
      'metric-unavailable':'手部深度暂不可用，请先松开手指','metric-uncertain':'手部识别短暂不稳，保持自然动作','uncertainty-expired':'请松开手指，恢复识别','camera-palm-motion':'手掌转动较大，请松开手指重新瞄准'};
    gestureStatusLabel.textContent = blockedLabels[result.reason] || labels[result.status] || '请先松开拇指与食指';
    if(result.reason==='edge-on')gestureStatusLabel.textContent='请让掌心大致朝向镜头，避免侧着手';
    if(result.armed&&result.reason==='between-thresholds')gestureStatusLabel.textContent='拇指与食指正在靠拢';
    if(result.snip)snipVisualUntil=gestureNow()+140;
    if(!result.eligible)snipVisualUntil=0;
    if(result.aimPixels){moveRing(result.aimPixels.x,result.aimPixels.y);brushRing.classList.add('visible');brushRing.classList.toggle('cutting',gestureNow()<snipVisualUntil);}
    else if(gestureNow()<snipVisualUntil)brushRing.classList.add('visible','cutting');
    else brushRing.classList.remove('visible','cutting');
    gestureOutcome.textContent='累计识别 '+result.totals.recognized+' 次 · 剪到头发 '+result.totals.hits+' 次';
    if(diagnostics.active)diagnosticStatus.textContent='本轮记录中 · 识别 '+diagnostics.snips+' 次 · 剪到 '+diagnostics.hits+' 次 · 超时 '+diagnostics.staleFrames+' 帧';
  }
  function publishDiagnostic(){
    const report={...diagnostics.report(),runtime:{delegate:handTracker.warmup?.delegate||null,videoWidth:gestureVideo.videoWidth,videoHeight:gestureVideo.videoHeight,intervalMs:handTracker.intervalMs,poseSpace:scissors.space,requireFoldedRing:scissors.requireFoldedRing,openGap:scissors.openGap,closeGap:scissors.closeGap,relativeCloseRatio:scissors.relativeCloseRatio,maxCloseGap:scissors.maxCloseGap,openDwellMs:scissors.openDwellMs,closeDwellMs:scissors.closeDwellMs,cooldownMs:scissors.cooldownMs,referenceSpace:legacyScissors.space,referenceRequireFoldedRing:legacyScissors.requireFoldedRing,referenceOpenDwellMs:legacyScissors.openDwellMs,referenceCooldownAtOpen:legacyScissors.cooldownAtOpen,referenceRelativeCloseRatio:legacyScissors.relativeCloseRatio}};
    report.runtime.clock=options.gestureNow?'controlled':'real';report.runtime.inputSource=options.inputSource||'camera';
    report.runtime.health=handTracker.runtime?.snapshot(gestureNow())||null;
    report.runtime.inferenceTiming='detectForVideo including image ingestion and graph synchronization';
    report.runtime.maxUncertaintyMs=scissors.maxUncertaintyMs;
    report.runtime.gestureKind='pinch';
    report.runtime.distancePolicy='projected thumb-index contact / projected palm width; stable camera palm basis required while armed; world and camera depth are diagnostic only';
    report.sceneTotals={...pipeline.totals};report.baselineTotals={...diagnosticBaseline};
    diagnosticReport.value=JSON.stringify(report,null,2);
    diagnosticStatus.textContent=(report.recording?'报告已更新，仍在记录':'记录已结束')+' · 本轮识别 '+report.snips+' 次 · 剪到 '+report.hits+' 次';
    refreshGestureStatus();
  }
  function finishDiagnostic(reason='manual'){
    diagnostics.stop(gestureNow(),reason);publishDiagnostic();
  }
  diagnosticButton.addEventListener('click',()=>{
    if(diagnosticButton.disabled)return;
    if(diagnostics.active||diagnostics.waiting){publishDiagnostic();return;}
    acceptFramesAfter=gestureNow();resetGestureIntent();diagnosticBaseline={...pipeline.totals};
    diagnostics.arm(acceptFramesAfter);diagnosticReport.value='';
    diagnosticStatus.textContent='正在记录，等待手进入画面；更新报告不会结束记录';
    refreshGestureStatus();
  });
  diagnosticStopButton.addEventListener('click',()=>finishDiagnostic('manual'));
  function stepGestureTracking(dt) {
    if (!gestureActive) return;
    if (gestureDemoMode) {
      gestureDemoPhase += dt*1.6;
      const x=(.5+Math.sin(gestureDemoPhase*1.2)*.20)*width;
      const y=(.16+Math.cos(gestureDemoPhase*1.8)*.06)*height;
      const cuttingNow=Math.sin(gestureDemoPhase*5)>.55;
      if (canUseHand()) {moveRing(x,y);brushRing.classList.add('visible');brushTest(x,y,x,y,cuttingNow);}
      return;
    }
    if (!canUseHand()) {
      resetGestureIntent();
      // Diagnostics may inspect a visible camera while chat has focus; cutting stays disarmed.
      if(!(document.visibilityState==='visible'&&(diagnostics.waiting||diagnostics.active)))return;
    }
    if (cameraSession.status === 'ready') handTracker.infer(gestureVideo,gestureNow());
  }
  const disarm = () => {diagnostics.mark(document.hidden?'page-hidden':'focus-lost',gestureNow());orbitDragging=false;lastViewMotion=gestureNow();cancelPointerCut();gestureFocused=false;acceptFramesAfter=Infinity;resetGestureIntent();if(gestureActive)gestureStatusLabel.textContent='点击试剪画面继续手势';};
  const resumeHand = () => {diagnostics.mark('focus-resumed',gestureNow());gestureFocused=document.hasFocus();acceptFramesAfter=gestureNow();resetGestureIntent();};
  const visibilityChanged = () => {document.hidden ? disarm() : resumeHand();};
  window.addEventListener('blur',disarm);window.addEventListener('focus',resumeHand);
  document.addEventListener('visibilitychange',visibilityChanged);
  gestureBtn.addEventListener('click',toggleGestureCam);
  root.querySelector('#btn-close-gesture-dock').addEventListener('click',()=>stopGestureCam());
  root.querySelector('#btn-demo-gesture-wave').addEventListener('click',()=>{
    stopGestureCam('demo-selected');gestureDemoMode=true;refreshGestureStatus();
  });

  root.querySelector('#btn-snap-webcam-to-3d')?.addEventListener('click', () => {
    if (!gestureVideo || !gestureVideo.videoWidth) {
      showToast('当前为手势轨迹演示模式，连接物理摄像头后可抓拍真容');
      return;
    }
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d');
    ctx.translate(512, 0);
    ctx.scale(-1, 1);
    const vw = gestureVideo.videoWidth, vh = gestureVideo.videoHeight;
    const minD = Math.min(vw, vh);
    ctx.drawImage(gestureVideo, (vw - minD) * 0.5, (vh - minD) * 0.5, minD, minD, 0, 0, 512, 512);
    const dataUrl = c.toDataURL('image/jpeg', 0.92);
    sessionStore.setPersonalImage({ name: 'live-webcam.jpg', type: 'image/jpeg', dataUrl });
    updateFaceSource('personal', dataUrl, false);
    showToast('已更新照片外观参考');
  });

  // ---- 工具栏事件绑定 -----------------------------------------------------
  root.querySelectorAll('#scissor-modes .tool-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      if (!SCISSOR_MODES[mode]) return;
      currentScissorMode = mode;
      root.querySelectorAll('#scissor-modes .tool-chip').forEach((b) => b.classList.toggle('active', b === btn));
      showToast(`已切换剪刀：${SCISSOR_MODES[mode].label}（${SCISSOR_MODES[mode].tip}）`);
    });
  });

  root.querySelectorAll('#hair-archetypes .tool-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      const arch = btn.getAttribute('data-archetype');
      if (!HAIR_ARCHETYPES[arch]&&!(arch==='portrait'&&portraitProfile)) return;
      portraitWanted=arch==='portrait';
      buildHairArchetype(arch);
      root.querySelectorAll('#hair-archetypes .tool-chip').forEach((b) => b.classList.toggle('active', b === btn));
      showToast(`已切换 3D 发型基底：${archetypeLabel(arch)}`);
    });
  });

  root.querySelectorAll('#face-sources .tool-chip[data-face]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const faceType = btn.getAttribute('data-face');
      updateFaceSource(faceType, null, faceType === 'generated');
      root.querySelectorAll('#face-sources .tool-chip[data-face]').forEach((b) => b.classList.toggle('active', b === btn));
      const labelMap = { generated: '已参考 AI 换发照片配色', personal: '已参考本人照片配色', clay: '通用解剖素模' };
      showToast(`已切换：${labelMap[faceType] || '3D 模式'}`);
    });
  });

  root.querySelector('#scene-face-upload')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result;
      if (typeof dataUrl === 'string') {
        sessionStore.setPersonalImage({ name: file.name, type: file.type, dataUrl });
        updateFaceSource('personal', dataUrl, false);
        root.querySelectorAll('#face-sources .tool-chip[data-face]').forEach((b) => {
          b.classList.toggle('active', b.getAttribute('data-face') === 'personal');
        });
        showToast('已从照片更新肤色参考');
      }
    };
    reader.readAsDataURL(file);
  });

  function onPointerDown(e) {
    if (viewChanging || e.button !== 0 || e.target.closest('button, input, a, .gesture-cam-dock')) return;
    const [x, y] = localPoint(e);
    if (brushTest(x, y, x, y, false) === 0) return;
    e.stopPropagation();
    e.preventDefault();
    cutting = true;
    activePointerId=e.pointerId;
    acceptFramesAfter=gestureNow();resetGestureIntent();diagnostics.mark('mouse-started',acceptFramesAfter);
    lastX = x; lastY = y;
    try { container.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
    brushRing.classList.add('visible', 'cutting');
    moveRing(x, y);
    brushTest(x, y, x, y, true);
  }

  function onPointerMove(e) {
    if(viewChanging){cancelPointerCut();brushRing.classList.remove('visible');return;}
    if(cutting&&e.buttons===0)cancelPointerCut();
    const [x, y] = localPoint(e);
    moveRing(x, y);
    if (cutting) {
      brushTest(lastX, lastY, x, y, true);
      lastX = x; lastY = y;
      return;
    }
    if (e.buttons !== 0) {
      brushRing.classList.remove('visible');
      return;
    }
    const over = brushTest(x, y, x, y, false) > 0;
    brushRing.classList.toggle('visible', over);
    container.style.cursor = over ? 'none' : 'grab';
  }

  function cancelPointerCut() {
    if (!cutting) return;
    cutting = false;
    try { if(activePointerId!==null)container.releasePointerCapture(activePointerId); } catch (_) { /* capture may already be lost */ }
    activePointerId=null;
    acceptFramesAfter=gestureNow();resetGestureIntent();diagnostics.mark('mouse-ended',acceptFramesAfter);
    brushRing.classList.remove('cutting');
    sessionStore.setHairSections(zonePercents());
  }
  function onPointerUp() { cancelPointerCut(); }

  function onPointerLeave() {
    if (!cutting && !gestureActive) brushRing.classList.remove('visible');
  }

  container.addEventListener('pointerdown', onPointerDown, { capture: true });
  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerup', onPointerUp);
  container.addEventListener('pointercancel', onPointerUp);
  container.addEventListener('lostpointercapture', onPointerUp);
  container.addEventListener('pointerleave', onPointerLeave);

  root.querySelector('#btn-reset-scene')?.addEventListener('click', () => {
    cutIdx.fill(SEG);
    buildingHair=true;
    for (let s = 0; s < strandCount; s++) writeStrand(s);
    buildingHair=false;markWholeHairUpdated();
    zoneRemain.set(zoneTotal);
    cutCount = 0;
    onGroomRebuilt('groom-reset');
    hairDirty = true;
    showToast('已恢复完整发型长度');
  });

  function onResize() {
    cancelPointerCut();
    width = container.clientWidth || width;
    height = container.clientHeight || height;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    requestRender();
    acceptFramesAfter=gestureNow();resetGestureIntent();diagnostics.mark('viewport-changed',acceptFramesAfter);
    if(gestureActive)gestureStatusLabel.textContent='画面尺寸已改变，请先松开拇指与食指';
  }
  window.addEventListener('resize', onResize);

  // ---- 动画循环 -----------------------------------------------------------
  const clock = new THREE.Clock();
  const q = new THREE.Quaternion();
  const axis = new THREE.Vector3();
  const v = new THREE.Vector3();

  function writeFragmentVertices(f, landed) {
    const i3 = f * 3;
    axis.set(fAxis[i3], fAxis[i3 + 1], fAxis[i3 + 2]);
    q.setFromAxisAngle(axis, fAng[f]);
    const start = fStart[f], end = start + fCount[f];
    for (let slot = start; slot < end; slot++) {
      if (segOwner[slot] !== f) continue;
      for (let j = 0; j < 2; j++) {
        const o = slot * 6 + j * 3;
        v.set(fragLocal[o], fragLocal[o + 1], fragLocal[o + 2]).applyQuaternion(q);
        fragPos[o] = v.x + fC[i3];
        fragPos[o + 1] = landed ? FLOOR_Y + 0.004 + ((slot * 0.618 + j * 0.3) % 1) * 0.012 : v.y + fC[i3 + 1];
        fragPos[o + 2] = v.z + fC[i3 + 2];
      }
    }
  }

  function updateFragments(dt) {
    const drag = Math.exp(-1.6 * dt);
    for (let f = 0; f < FRAG_CAP; f++) {
      if (fState[f] !== 1) continue;
      const i3 = f * 3;

      fV[i3 + 1] -= 6.0 * dt;
      fV[i3] *= drag; fV[i3 + 1] *= drag; fV[i3 + 2] *= drag;
      fC[i3] += fV[i3] * dt;
      fC[i3 + 1] += fV[i3 + 1] * dt;
      fC[i3 + 2] += fV[i3 + 2] * dt;
      fAng[f] += fSpin[f] * dt;

      if (fC[i3 + 1] > -0.35) {
        tmp.set(fC[i3],fC[i3+1],fC[i3+2]);
        if(resolveHeadCollision(tmp,.006,_surfN)){
          fC[i3]=tmp.x;fC[i3+1]=tmp.y;fC[i3+2]=tmp.z;
          fV[i3]+=_surfN.x*.45;fV[i3+2]+=_surfN.z*.45;
        }
      }
      if (fC[i3 + 1] < -0.5 && fC[i3 + 1] > FLOOR_Y) {
        const nx = fC[i3], nz = fC[i3 + 2] - NECK_Z;
        const r = Math.hypot(nx, nz);
        if (r < NECK_R && r > 1e-6) {
          fC[i3] = (nx / r) * NECK_R;
          fC[i3 + 2] = (nz / r) * NECK_R + NECK_Z;
          fV[i3] += (nx / r) * 0.3;
          fV[i3 + 2] += (nz / r) * 0.3;
        }
      }

      if (fC[i3 + 1] - fRad[f] * 0.3 <= FLOOR_Y) {
        if (Math.hypot(fC[i3], fC[i3 + 2]) < 2.25) {
          fState[f] = 2;
          writeFragmentVertices(f, true);
          fragDirty = true;
          continue;
        }
        if (fC[i3 + 1] < -7) {
          killFragment(f);
          fragDirty = true;
          continue;
        }
      }

      writeFragmentVertices(f, false);
      fragDirty = true;
    }
  }

  function syncBuffers() {
    if(hairDirty||fragDirty||hudDirty)requestRender();
    if (hairDirty) {for(const attribute of dynamicHairAttributes)attribute.needsUpdate=true;hairDirty=false;}
    if (fragDirty) {fragPosAttr.needsUpdate=true;fragGeo.setDrawRange(0,segHigh*2);fragDirty=false;}
    if (hudDirty) {updateHUD();hudDirty=false;}
  }
  // All discrete inputs use this operation; it updates real geometry and falling segments.
  function snipAt(x,y) {
    if(disposed || !Number.isFinite(x) || !Number.isFinite(y) || x<0 || y<0 || x>width || y>height) return {affectedStrands:0,removedSegments:0,fallingSegments:0};
    const started=performance.now();
    const countBefore=cutCount, lengthBefore=zoneRemain.reduce((a,b)=>a+b,0), fragmentsBefore=emittedFragmentSegments;
    brushTest(x,y,x,y,true,'snip');
    const report={affectedStrands:cutCount-countBefore,removedSegments:lengthBefore-zoneRemain.reduce((a,b)=>a+b,0),fallingSegments:emittedFragmentSegments-fragmentsBefore,durationMs:performance.now()-started};
    if(report.affectedStrands>0){sessionStore.setHairSections(zonePercents());showToast('咔嚓，剪下一撮头发');}
    else showToast('没有碰到可修剪的头发，请把准星移到发梢');
    syncBuffers();
    return report;
  }
  function captureStill() {
    syncBuffers();
    const visible=fragLines.visible;
    try{fragLines.visible=false;renderer.render(scene,camera);return renderer.domElement.toDataURL('image/png');}
    finally{fragLines.visible=visible;requestRender();}
  }

  const animate=createStudioFrameLoop({
   isCameraActive:()=>gestureActive,
   observe:()=>{
    const dt=Math.min(clock.getDelta(),.05);
    controls.update();
    if(viewChanging&&!orbitDragging&&gestureNow()-lastViewMotion>=120){viewChanging=false;invalidateViewInput('view-settled');}
    if(gestureDemoMode)stepGestureTracking(dt);
    if(fState.includes(1))updateFragments(dt);
    if(gestureActive&&handTracker.runtime?.snapshot(gestureNow()).status==='paused')modelStatusLabel.textContent='采样已暂停 · 等待新画面，旧的响应测量已过期';
   },
   track:()=>{if(!gestureDemoMode)stepGestureTracking(0);},
   needsDraw:()=>renderRequested||hairDirty||fragDirty||hudDirty||fState.includes(1),
   draw:()=>{
    syncBuffers();
    const started=performance.now();
    renderer.render(scene,camera);
    renderStats.draws++;renderStats.cpuRenderMs+=performance.now()-started;
    renderRequested=false;
   }
  });
  renderer.setAnimationLoop(animate);

  root.querySelector('#btn-export-card')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    try {
      const snapshot = captureStill();
      const reference = sessionStore.state.generatedImage?.urlOrData;
      if (!reference) throw new Error('请先生成换发预览，再保存沟通卡');
      const card = await createConsultationCard({ reference, snapshot, sections:zonePercents(), demo:sessionStore.state.generatedImage?.source === 'demo', archetype:archetypeLabel(currentHairArchetype) });
      showConsultationCard(root, card);
    } catch(error) { showToast(error.message || '暂时无法生成沟通卡，请重试'); }
    finally { fragLines.visible = true; button.disabled = false; }
  });

  // ---- 销毁 ---------------------------------------------------------------
  function teardown() {
    if (disposed) return;
    disposed = true;
    nativeTextureEpoch++;
    stopGestureCam('teardown');
    renderer.setAnimationLoop(null);
    clearTimeout(toastTimer);
    diagnostics.stop(gestureNow(),'teardown');
    window.removeEventListener('resize', onResize);
    container.removeEventListener('pointerdown', onPointerDown, { capture: true });
    container.removeEventListener('pointermove', onPointerMove);
    container.removeEventListener('pointerup', onPointerUp);
    container.removeEventListener('pointercancel', onPointerUp);
    container.removeEventListener('lostpointercapture', onPointerUp);
    container.removeEventListener('pointerleave', onPointerLeave);
    window.removeEventListener('blur', disarm);
    window.removeEventListener('focus', resumeHand);
    document.removeEventListener('visibilitychange', visibilityChanged);
    controls.removeEventListener('start',onOrbitStart);controls.removeEventListener('change',onOrbitChange);controls.removeEventListener('end',onOrbitEnd);
    controls.removeEventListener('change',requestRender);controls.dispose();

    const geometries = new Set();
    const materials = new Set();
    scene.traverse((obj) => {
      if (obj.geometry) geometries.add(obj.geometry);
      if (obj.material) (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach((m) => materials.add(m));
    });
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    envTexture.dispose();
    portraitTask?.cancel();portraitTexture?.dispose();portraitMask?.dispose();
    skinTexture.dispose();eyeTexture.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }

  return { teardown, snipAt, captureStill, getPerformanceSnapshot:()=>({...renderStats,flyingFragments:fState.reduce((n,s)=>n+Number(s===1),0),landedFragments:fState.reduce((n,s)=>n+Number(s===2),0),width,height,pixelRatio:renderer.getPixelRatio(),
    hairGeometry:{profile:hairProfile.name,experimental:hairProfile.experimental,segments:SEG,verticesPerPoint:HAIR_SIDES,strands:strandCount,triangles:hairGeo.drawRange.count/3,referenceBakes,groomId:hairMesh.userData.groomSource?.groomId},
    appearance:{source:currentFaceSource,status:root.dataset.nativeAppearance,...nativeTextureState,useSkin:faceUniforms.uUseSkin.value,skinBase:faceUniforms.uSkinBase.value.toArray(),scalpRoot:faceUniforms.uScalpRoot.value.toArray(),
      mapPresent:!!headMat.map,nativeMap:headMat.map===skinTexture,imageReady:!!skinTexture.image?.complete&&(skinTexture.image?.width||0)>0,imageWidth:skinTexture.image?.width||0,imageHeight:skinTexture.image?.height||0,
      colorSpace:skinTexture.colorSpace,textureVersion:skinTexture.version,rendererTextureCount:renderer.info.memory.textures,uniformSamplerMatchesNative:headCompiledUniforms?.map?.value===skinTexture,gpuDebugEnabled:!!options.debugAppearance,gpu:headGpuDiagnostic}}) };
}
