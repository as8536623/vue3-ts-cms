// 灾害类型枚举
export const DISASTER_TYPES = {
  FIRE: 1,
  GAS: 2,
  DUST: 3,
  WATER: 4,
  COLLAPSE: 5,
  WALL_WATER: 6,
  IMPACT_PRESSURE: 7
};

// 灾害自动类型枚举
export const AUTO_DISASTER_TYPES = {
  FIRE_SPREAD: 1,
  GAS_EXPLOSION: 2,
  DUST_EXPLOSION: 3,
  COLLAPSE: 4,
  WATER_SPREAD: 5,
  FIRE_GAS_SPREAD: 6,
  IMPACT_PRESSURE: 7
};

// 模型配置
export const MODEL_CONFIG = [
  { name: '地上', url: './models/dm.glb', rayNames: [], rayObjs: [], rayLabels: {} },
  { name: '地下', url: './models/2_3.glb', rayNames: [], rayObjs: [], rayLabels: {} },
  { name: '测试', url: './models/test2.glb', rayNames: [], rayObjs: [], rayLabels: {} },
  { name: '塌方', url: './models/t2.glb', rayNames: [], rayObjs: [], rayLabels: {} },
  { name: '寻路模型测试', url: './0_9.glb', rayNames: [], rayObjs: [], rayLabels: {} }
];

// 应用配置选项
export const APP_OPTIONS = {
  deviceMinDis: 65,
  heightThreshold: -30,
  heightThreshold2: 60,
  EPSILON: 1e-6
};

// 默认逃离点
export const ESCAPE_POINTS = {
  GROUND: { x: 14199.42, y: 2298.950, z: -3067.824 },
  UNDERGROUND: { x: 13447.365, y: 402.112, z: -4636.603 }
};

// 粒子发射器配置
export const EMITTER_CONFIG = {
  FIRE: {
    rate: { span: [4, 16], interval: [0.1, 0.2] },
    life: [0.25, 1.25],
    velocity: [100, 200],
    scale: [5.5, 6.5],
    colors: ['#FF0000', '#FF4500', '#FFA500', '#FFFF00'],
    gravity: -4
  },
  GAS: {
    rate: { span: [8, 18], interval: [0.1, 0.2] },
    life: [0.25, 1.0],
    velocity: [100, 200],
    scale: [5, 5],
    colors: ['#ff007d', '#ff74f1', '#ffb1ee', '#ffe7eb'],
    gravity: -1
  },
  DUST: {
    rate: { span: [8, 18], interval: [0.1, 0.2] },
    life: [0.25, 1.0],
    velocity: [100, 200],
    scale: [4, 4],
    colors: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
    gravity: -1
  }
};

// 相机配置
export const CAMERA_CONFIG = {
  fov: 75,
  near: 0.1,
  far: 9999999,
  defaultPosition: { x: 6273.000579565883, y: 6273.000579565884, z: 6273.000579565886 },
  defaultTarget: { x: 10109.932845156862, y: 918.4428499191345, z: -3488.241327030576 }
};

// 材质资源路径
export const TEXTURE_PATHS = {
  LINE: '/line-0.png',
  PARTICLE_0: '/p-0.png',
  PARTICLE_1: '/p-1.png',
  SMOKE_1: '/textures/smoke1.png',
  SMOKE_2: '/textures/smoke2.png',
  SMOKE_3: '/textures/smoke3.png',
  BOTTOM: '/public/bottom.png'
};