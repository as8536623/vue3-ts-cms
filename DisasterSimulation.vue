<template>
  <div ref="container" class="three-container"></div>
  
  <!-- 开发工具面板 -->
  <div class="tools" v-if="showDevTools">
    <el-switch
      v-model="isAuto"
      inline-prompt
      active-text="自动"
      inactive-text="手动"
    />
    
    <el-select 
      v-show="!isAuto" 
      v-model="disasterType" 
      style="width:200px;margin-left:20px;margin-right:20px;"
    >
      <el-option 
        v-for="(label, value) in DISASTER_TYPES" 
        :key="value"
        :value="Number(value)" 
        :label="label"
      />
    </el-select>
    
    <el-button v-show="!isAuto" type="danger" @click="createManualDisaster">创建灾难</el-button>
    <el-button v-show="!isAuto" type="danger" @click="expandingDisaster">扩大灾难</el-button>
    <el-button v-show="!isAuto" type="danger" @click="createExplosion">创建爆炸(点燃瓦斯专用)</el-button>

    <el-select 
      v-show="isAuto" 
      v-model="disasterAutoType" 
      style="width:200px;margin-left:20px;margin-right:20px;"
    >
      <el-option 
        v-for="(label, value) in AUTO_DISASTER_TYPES" 
        :key="value"
        :value="Number(value)" 
        :label="label"
      />
    </el-select>
    
    <el-button v-show="isAuto" type="primary" @click="togglePlayPause">
      {{ playing ? '暂停' : '播放' }}
    </el-button>

    <el-button type="success" @click="createPathLine">创建线路</el-button>
    <el-button @click="clearAllDisasters">清除测试结果</el-button>
  </div>

  <!-- 加载遮罩 -->
  <div class="mask" v-if="loading">
    <div class="loader"></div>
    <div class="text">{{ loadProgress }}</div>
  </div>

  <!-- 灾害类型切换按钮 -->
  <div class="switch">
    <div 
      v-for="(label, type) in MAIN_DISASTER_TYPES" 
      :key="type"
      :class="{ 'selected': disasterAutoType === Number(type), 'button': true }"
      @click="switchDisasterType(Number(type))"
    >
      {{ label }}
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, computed } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from "three/addons";
import { GLTFLoader } from "three/addons";
import { RoomEnvironment } from "three/addons";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import Proton from "three.proton.js";
import { Water } from "three/addons/objects/Water2.js";
import {
  Brush,
  Evaluator,
  ADDITION,
  SUBTRACTION,
  REVERSE_SUBTRACTION,
  INTERSECTION,
  DIFFERENCE,
  HOLLOW_SUBTRACTION,
  HOLLOW_INTERSECTION
} from "three-bvh-csg";
import * as YUKA from '@/components/libs/yuka.module.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { createConvexRegionHelper } from '@/components/libs/NavMeshHelper.js';
import { createGraphHelper } from '@/components/libs/GraphHelper.js';
import { ElMessage } from 'element-plus';
import { findNearestPoint } from "@/components/Math/findNearestPoint.js";
import {
  getThreePoints,
  getYUKAPoints,
  destroyCSS2DObject,
  getMinimumBoundingRectangle,
  getEulerRotation,
  getEulerRotation2,
  findClosestPointOnBoundary,
  getYUKAPoint, 
  getThreePoint
} from "@/components/Math/GeneralMethods.js";
import TWEEN from "three/addons/libs/tween.module.js";
import { createWater2Material, water3Material } from "@/components/shaderMaterials/Water1.js";
import { Drama } from "@/components/Class/Drama.js";

// 资源导入
import imgLine0 from '/line-0.png';
import imgP0 from '/p-0.png';
import imgP1 from '/p-1.png';
import imgS1 from '/textures/smoke1.png';
import imgS2 from '/textures/smoke2.png';
import imgS3 from '/textures/smoke3.png';
import bm from '/public/bottom.png';

// 常量定义
const DISASTER_TYPES = {
  1: '火灾',
  2: '瓦斯',
  3: '粉尘',
  4: '渗水',
  5: '塌方',
  6: '墙壁渗水',
  7: '冲击地压'
};

const AUTO_DISASTER_TYPES = {
  1: '火灾蔓延',
  2: '瓦斯蔓延及明火爆炸',
  3: '粉尘蔓延及粉尘爆炸',
  4: '塌方',
  5: '渗水蔓延',
  6: '火灾蔓延及瓦斯蔓延',
  7: '冲击地压'
};

const MAIN_DISASTER_TYPES = {
  5: '水害模拟',
  1: '火灾模拟',
  2: '瓦斯爆炸',
  3: '粉尘爆炸',
  4: '顶板塌陷',
  7: '冲击地压'
};

// 配置对象
const CONFIG = {
  models: [
    { name: '地上', url: './models/dm.glb', rayNames: [], rayObjs: [], rayLabels: {}, onReady: null },
    { name: '地下', url: './models/2_3.glb', rayNames: [], rayObjs: [], rayLabels: {}, onReady: null },
    { name: '测试', url: './models/test2.glb', rayNames: [], rayObjs: [], rayLabels: {} },
    { name: '塌方', url: './models/t2.glb', rayNames: [], rayObjs: [], rayLabels: {}, onReady: null },
    { name: '寻路模型测试', url: './0_9.glb', rayNames: [], rayObjs: [], rayLabels: {}, onReady: null },
  ],
  options: {
    deviceMinDis: 65,
    heightThreshold: -30,
    heightThreshold2: 60,
    EPSILON: 1e-6
  }
};

// 响应式状态
const container = ref(null);
const isAuto = ref(true);
const disasterType = ref(1);
const disasterAutoType = ref(-1);
const playing = ref(false);
const loading = ref(true);
const loadProgress = ref('0%');
const showDevTools = ref(false); // 开发工具显示控制

// 3D场景相关状态
const sceneState = reactive({
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  labelRenderer: null,
  loader: null,
  textureLoader: null,
  raycaster: null,
  mouse: new THREE.Vector2(),
  wWidth: 0,
  wHeight: 0
});

// 灾害系统状态
const disasterState = reactive({
  disasters: [],
  emitters: [],
  testPoints: [],
  sp: null,
  ep: null,
  explodeCenter: null,
  drama: null
});

// 模型和资源状态
const resourceState = reactive({
  loaded: 0,
  ups: [],
  cameraModels: [],
  sensorModels: [],
  devicesInDisasters: [],
  mixer: null,
  mixerTFS: {},
  TFScene: null,
  TFAnimates: null
});

// 计算属性
const isAllModelsLoaded = computed(() => {
  return resourceState.loaded >= CONFIG.models.length;
});

// 核心管理器类
class SceneManager {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.labelRenderer = null;
    this.lineGroup = null;
    this.protonGroup = null;
    this.TFGroup = null;
    this.clock = new THREE.Clock();
  }

  init(container, width, height) {
    try {
      // 初始化场景
      this.scene = new THREE.Scene();
      
      // 初始化相机
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 9999999);
      this.camera.position.set(6273.000579565883, 6273.000579565884, 6273.000579565886);
      
      // 初始化渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(this.renderer.domElement);
      
      // 初始化CSS2D渲染器
      this.labelRenderer = new CSS2DRenderer();
      this.labelRenderer.setSize(width, height);
      this.labelRenderer.domElement.style.position = 'absolute';
      this.labelRenderer.domElement.style.top = '0px';
      this.labelRenderer.domElement.style.left = '0px';
      this.labelRenderer.domElement.style.pointerEvents = 'none';
      container.appendChild(this.labelRenderer.domElement);
      
      // 初始化轨道控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(10109.932845156862, 918.4428499191345, -3488.241327030576);
      this.controls.update();
      
      // 添加全局光
      this.scene.add(new THREE.AmbientLight(0xffffff, 1.0));
      
      // 初始化组
      this.lineGroup = new THREE.Group();
      this.protonGroup = new THREE.Group();
      this.TFGroup = new THREE.Group();
      
      this.scene.add(this.lineGroup);
      this.scene.add(this.protonGroup);
      this.scene.add(this.TFGroup);
      
      // 设置环境
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      
      return true;
    } catch (error) {
      console.error('场景初始化失败:', error);
      return false;
    }
  }

  resize(width, height) {
    if (!this.camera || !this.renderer || !this.labelRenderer) return;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.labelRenderer.setSize(width, height);
  }

  render() {
    if (!this.renderer || !this.scene || !this.camera) return;
    
    this.controls?.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer?.render(this.scene, this.camera);
  }

  dispose() {
    this.clearScene();
    this.renderer?.dispose();
    this.controls?.dispose();
  }

  clearScene() {
    if (!this.scene) return;
    
    this.scene.traverse((object) => {
      if (object.isMesh) {
        object.geometry?.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => this.disposeMaterial(material));
          } else {
            this.disposeMaterial(object.material);
          }
        }
      }
    });
    
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  }

  disposeMaterial(material) {
    if (material.map) material.map.dispose();
    if (material.lightMap) material.lightMap.dispose();
    if (material.bumpMap) material.bumpMap.dispose();
    if (material.normalMap) material.normalMap.dispose();
    if (material.specularMap) material.specularMap.dispose();
    if (material.envMap) material.envMap.dispose();
    material.dispose();
  }
}

class ParticleManager {
  constructor() {
    this.proton = null;
    this.emitters = [];
    this.materials = {};
  }

  init(scene) {
    try {
      this.proton = new Proton();
      const protonGroup = new THREE.Group();
      scene.add(protonGroup);
      
      const protonSR = new Proton.SpriteRender(protonGroup);
      this.proton.addRender(protonSR);
      
      // 初始化材质
      this.initMaterials();
      
      return protonGroup;
    } catch (error) {
      console.error('粒子系统初始化失败:', error);
      return null;
    }
  }

  initMaterials() {
    const textureLoader = new THREE.TextureLoader();
    
    this.materials = {
      fire: new THREE.SpriteMaterial({
        map: textureLoader.load(imgP0),
        color: 0xff0000,
        blending: THREE.AdditiveBlending,
        fog: true,
        depthTest: false,
        transparent: true
      }),
      gas: new THREE.SpriteMaterial({
        map: textureLoader.load(imgP1),
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        fog: true,
        depthTest: false,
        transparent: true
      }),
      smoke1: new THREE.SpriteMaterial({
        map: textureLoader.load(imgS1),
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        fog: true,
        depthTest: false,
        transparent: true
      }),
      smoke2: new THREE.SpriteMaterial({
        map: textureLoader.load(imgS2),
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        fog: true,
        depthTest: false,
        transparent: true
      }),
      smoke3: new THREE.SpriteMaterial({
        map: textureLoader.load(imgS3),
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        fog: true,
        depthTest: false,
        transparent: true
      })
    };
  }

  createFireEmitter(size, center) {
    const emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(new Proton.Span(4, 16), new Proton.Span(0.1, 0.2));
    emitter.addInitialize(new Proton.Body(new THREE.Sprite(this.materials.fire)));
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(0.25, 1.25));
    emitter.addInitialize(new Proton.Position(new Proton.BoxZone(size.x, size.y, size.z)));
    emitter.addInitialize(new Proton.V(new Proton.Span(100, 200), new Proton.Vector3D(0, 1, 0), 30));
    emitter.addBehaviour(new Proton.RandomDrift(10, 10, 10, 0.05));
    emitter.addBehaviour(new Proton.Scale(new Proton.Span(5.5, 6.5), 0.5));
    emitter.addBehaviour(new Proton.G(-4));
    emitter.addBehaviour(new Proton.Color('#FF0000', ['#FF4500', '#FFA500', '#FFFF00'], Infinity, Proton.easeOutSine));

    emitter.p.x = center.x;
    emitter.p.y = center.y;
    emitter.p.z = center.z;

    emitter.emit();
    this.proton.addEmitter(emitter);
    this.emitters.push(emitter);

    return emitter;
  }

  createGasEmitter(size, center) {
    const emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(new Proton.Span(8, 18), new Proton.Span(0.1, 0.2));
    emitter.addInitialize(new Proton.Body(new THREE.Sprite(this.materials.fire)));
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(0.25, 1.0));
    emitter.addInitialize(new Proton.Position(new Proton.BoxZone(size.x, size.y, size.z)));
    emitter.addInitialize(new Proton.V(new Proton.Span(100, 200), new Proton.Vector3D(0, 1, 0), 30));
    emitter.addBehaviour(new Proton.RandomDrift(10, 10, 10, 0.05));
    emitter.addBehaviour(new Proton.Scale(new Proton.Span(5, 5), 5));
    emitter.addBehaviour(new Proton.G(-1));
    emitter.addBehaviour(new Proton.Color('#ff007d', ['#ff74f1', '#ffb1ee', '#ffe7eb'], Infinity, Proton.easeOutSine));

    emitter.p.x = center.x;
    emitter.p.y = center.y;
    emitter.p.z = center.z;

    emitter.emit();
    this.proton.addEmitter(emitter);
    this.emitters.push(emitter);

    return emitter;
  }

  createExplosion(point) {
    const emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(new Proton.Span(1000, 1000), new Proton.Span(0.1, 0.1));
    emitter.addInitialize(new Proton.Body(new THREE.Sprite(this.materials.fire)));
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(0.25, 0.85));
    emitter.addInitialize(new Proton.Position(new Proton.BoxZone(0, 0, 0)));
    emitter.addInitialize(new Proton.V(new Proton.Span(500, 500), new Proton.Vector3D(0, 1, 0), 180));
    emitter.addBehaviour(new Proton.Scale(new Proton.Span(5.5, 6.5), 5.5));
    emitter.addBehaviour(new Proton.G(0));
    emitter.addBehaviour(new Proton.Color('#FF0000', ['#FF4500', '#FFA500', '#FFFF00'], Infinity, Proton.easeOutSine));
    
    emitter.emit('once');
    emitter.p.x = point.x;
    emitter.p.y = point.y;
    emitter.p.z = point.z;

    this.proton.addEmitter(emitter);

    emitter.addEventListener(Proton.PARTICLE_DEAD, () => {
      if (emitter.particles.length === 0) {
        emitter.stopEmit();
        this.proton.removeEmitter(emitter);
        emitter.destroy();
      }
    });
  }

  clearAllEmitters() {
    this.emitters.forEach(emitter => {
      emitter.stopEmit();
      emitter.removeAllParticles();
      this.proton.removeEmitter(emitter);
      emitter.destroy();
    });
    this.emitters = [];
  }

  update() {
    this.proton?.update();
  }

  dispose() {
    this.clearAllEmitters();
    this.proton = null;
    
    // 释放材质资源
    Object.values(this.materials).forEach(material => {
      material.map?.dispose();
      material.dispose();
    });
    this.materials = {};
  }
}

class DisasterManager {
  constructor() {
    this.disasters = [];
    this.particleManager = null;
  }

  init(particleManager) {
    this.particleManager = particleManager;
    this.disasters = [];
  }

  createDisaster(startPoint, endPoint, type, path = null) {
    try {
      const disaster = {
        id: THREE.MathUtils.generateUUID(),
        sp: startPoint.clone(),
        ep: endPoint.clone(),
        type: type,
        path: path || [startPoint, endPoint],
        created: Date.now(),
        playing: false,
        bb: null,
        bs: null
      };

      // 计算包围盒和包围球
      this.updateDisasterBounds(disaster);
      
      // 检查是否与其他灾害相互影响
      this.checkDisasterInteractions(disaster);
      
      this.disasters.push(disaster);
      
      // 创建视觉效果
      this.createDisasterEffect(disaster);
      
      return disaster;
    } catch (error) {
      console.error('创建灾害失败:', error);
      return null;
    }
  }

  updateDisasterBounds(disaster) {
    const points = disaster.path.map(p => new THREE.Vector3(p.x, p.y, p.z));
    disaster.bb = new THREE.Box3().setFromPoints(points);
    disaster.bs = new THREE.Sphere();
    disaster.bb.getBoundingSphere(disaster.bs);
  }

  checkDisasterInteractions(disaster) {
    for (const existingDisaster of this.disasters) {
      if (this.isAdjacent(disaster.bb, existingDisaster.bb)) {
        this.handleDisasterInteraction(disaster, existingDisaster);
      }
    }
  }

  isAdjacent(box1, box2, epsilon = 0.1) {
    const xAdjacent = (Math.abs(box1.max.x - box2.min.x) < epsilon || Math.abs(box2.max.x - box1.min.x) < epsilon) &&
        ((box1.min.y <= box2.max.y && box1.max.y >= box2.min.y) &&
         (box1.min.z <= box2.max.z && box1.max.z >= box2.min.z));

    const yAdjacent = (Math.abs(box1.max.y - box2.min.y) < epsilon || Math.abs(box2.max.y - box1.min.y) < epsilon) &&
        ((box1.min.x <= box2.max.x && box1.max.x >= box2.min.x) &&
         (box1.min.z <= box2.max.z && box1.max.z >= box2.min.z));

    const zAdjacent = (Math.abs(box1.max.z - box2.min.z) < epsilon || Math.abs(box2.max.z - box1.min.z) < epsilon) &&
        ((box1.min.x <= box2.max.x && box1.max.x >= box2.min.x) &&
         (box1.min.y <= box2.max.y && box1.max.y >= box2.min.y));

    return xAdjacent || yAdjacent || zAdjacent;
  }

  handleDisasterInteraction(disaster1, disaster2) {
    // 火灾点燃瓦斯的逻辑
    if ((disaster1.type === 1 && disaster2.type === 2) || (disaster1.type === 2 && disaster2.type === 1)) {
      const gasDisaster = disaster1.type === 2 ? disaster1 : disaster2;
      const fireDisaster = disaster1.type === 1 ? disaster1 : disaster2;
      
      gasDisaster.type = 1; // 瓦斯变为火灾
      this.particleManager?.createExplosion(gasDisaster.bs.center);
    }
  }

  createDisasterEffect(disaster) {
    if (!this.particleManager || disaster.playing) return;

    const size = new THREE.Vector3();
    disaster.bb.getSize(size);
    const center = disaster.bs.center;

    switch (disaster.type) {
      case 1: // 火灾
        this.particleManager.createFireEmitter(size, center);
        break;
      case 2: // 瓦斯
        this.particleManager.createGasEmitter(size, center);
        break;
      // 其他类型的灾害效果...
    }

    disaster.playing = true;
  }

  expandDisaster(disaster) {
    // 扩大灾害的逻辑
    if (!disaster || disaster.type === 5 || disaster.type === 6) return;

    // 根据灾害类型和周围环境扩大影响范围
    const expandedPath = this.calculateExpandedPath(disaster);
    if (expandedPath.length > disaster.path.length) {
      disaster.path = expandedPath;
      this.updateDisasterBounds(disaster);
      this.createDisasterEffect(disaster);
    }
  }

  calculateExpandedPath(disaster) {
    // 简化的扩散算法，实际应该根据导航网格和物理规则计算
    const expandedPath = [...disaster.path];
    
    // 在现有路径基础上添加扩散点
    const lastPoint = disaster.path[disaster.path.length - 1];
    const direction = new THREE.Vector3()
      .subVectors(lastPoint, disaster.path[0])
      .normalize()
      .multiplyScalar(100);
    
    expandedPath.push(new THREE.Vector3().addVectors(lastPoint, direction));
    
    return expandedPath;
  }

  clearAllDisasters() {
    this.disasters = [];
    this.particleManager?.clearAllEmitters();
  }

  getDisasterById(id) {
    return this.disasters.find(disaster => disaster.id === id);
  }

  removeDisaster(id) {
    const index = this.disasters.findIndex(disaster => disaster.id === id);
    if (index !== -1) {
      this.disasters.splice(index, 1);
    }
  }
}

// 实例化管理器
let sceneManager;
let particleManager;
let disasterManager;

// 动画循环
let animationId = null;
const clock = new THREE.Clock();

const animate = (time) => {
  animationId = requestAnimationFrame(animate);

  if (!sceneManager || !particleManager) return;

  try {
    // 更新粒子系统
    particleManager.update();

    // 更新控制器
    sceneManager.controls?.update();

    // 更新Tween动画
    TWEEN.update(time);

    // 渲染场景
    sceneManager.render();

    // 更新混合器（如果有动画）
    const delta = clock.getDelta();
    if (resourceState.mixer && disasterState.disasters.length === 0) {
      resourceState.mixer.update(delta);
    }

    // 更新塌方动画混合器
    Object.values(resourceState.mixerTFS).forEach(mixer => {
      if (mixer) mixer.update(delta);
    });

  } catch (error) {
    console.error('动画循环错误:', error);
  }
};

// 性能优化的事件处理
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// 节流的窗口大小调整
const throttledResize = throttle(onWindowResize, 100);

// 优化的鼠标事件处理
const handleMouseMove = throttle((event) => {
  if (!sceneState.raycaster || !sceneState.mouse) return;

  const rect = sceneState.renderer.domElement.getBoundingClientRect();
  sceneState.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  sceneState.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  sceneState.raycaster.setFromCamera(sceneState.mouse, sceneState.camera);
}, 16); // 约60fps

// 错误边界处理
const safeExecute = (func, errorMessage = '操作失败') => {
  try {
    return func();
  } catch (error) {
    console.error(errorMessage, error);
    ElMessage.error(errorMessage);
    return null;
  }
};

// 内存清理工具
const cleanupResources = () => {
  // 清理动画
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  // 清理事件监听器
  window.removeEventListener('resize', throttledResize);
  
  // 清理管理器
  sceneManager?.dispose();
  particleManager?.dispose();
  
  // 清理状态
  Object.keys(resourceState).forEach(key => {
    if (typeof resourceState[key] === 'object' && resourceState[key] !== null) {
      if (Array.isArray(resourceState[key])) {
        resourceState[key] = [];
      } else {
        resourceState[key] = null;
      }
    }
  });
};

// 优化的初始化函数
const optimizedInit = async () => {
  try {
    loading.value = true;
    loadProgress.value = '初始化场景...';

    // 获取容器尺寸
    const rect = container.value.getBoundingClientRect();
    sceneState.wWidth = rect.width;
    sceneState.wHeight = rect.height;

    // 初始化场景管理器
    sceneManager = new SceneManager();
    if (!sceneManager.init(container.value, sceneState.wWidth, sceneState.wHeight)) {
      throw new Error('场景初始化失败');
    }

    loadProgress.value = '初始化粒子系统...';
    
    // 初始化粒子管理器
    particleManager = new ParticleManager();
    if (!particleManager.init(sceneManager.scene)) {
      throw new Error('粒子系统初始化失败');
    }

    loadProgress.value = '初始化灾害系统...';
    
    // 初始化灾害管理器
    disasterManager = new DisasterManager();
    disasterManager.init(particleManager);

    loadProgress.value = '加载模型...';
    
    // 加载模型
    await loadModelsAsync();

    loadProgress.value = '完成初始化...';
    
    // 设置射线投射器
    sceneState.raycaster = new THREE.Raycaster();
    sceneState.mouse = new THREE.Vector2();

    // 绑定事件
    window.addEventListener('resize', throttledResize);
    sceneManager.renderer.domElement.addEventListener('mousemove', handleMouseMove);

    // 开始动画循环
    animate();

    loading.value = false;
    showDevTools.value = process.env.NODE_ENV === 'development';
    
    ElMessage.success('灾害模拟系统初始化完成');
    
  } catch (error) {
    console.error('初始化失败:', error);
    ElMessage.error(`初始化失败: ${error.message}`);
    loading.value = false;
  }
};

// 异步加载模型
const loadModelsAsync = () => {
  return new Promise((resolve, reject) => {
    const models = CONFIG.models;
    const loader = new GLTFLoader();
    
    // 配置DRACO压缩加载器
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    let loadedCount = 0;
    const totalModels = models.length;

    const updateProgress = () => {
      loadedCount++;
      loadProgress.value = `加载模型 ${loadedCount}/${totalModels} (${Math.round(loadedCount / totalModels * 100)}%)`;
      
      if (loadedCount >= totalModels) {
        resolve();
      }
    };

    models.forEach((model, index) => {
      loader.load(
        model.url,
        (gltf) => {
          safeExecute(() => {
            sceneManager.scene.add(gltf.scene);
            gltf.scene.position.set(0, 0, 0);

            // 处理模型特定逻辑
            if (model.onReady) {
              model.onReady(gltf);
            }

            // 处理射线拾取对象
            model.rayObjs = [];
            model.rayLabels = {};
            
            gltf.scene.traverse((child) => {
              if (child.isMesh && model.rayNames.includes(child.name)) {
                model.rayObjs.push(child);
                child.userData.label = createLabelObject(child.name, child);
              }
            });

            updateProgress();
          }, `模型 ${model.name} 处理失败`);
        },
        (progress) => {
          // 加载进度回调
          const percent = Math.round((progress.loaded / progress.total) * 100);
          loadProgress.value = `加载 ${model.name}: ${percent}%`;
        },
        (error) => {
          console.error(`模型 ${model.name} 加载失败:`, error);
          updateProgress(); // 即使失败也要更新计数
        }
      );
    });
  });
};

// 创建标签对象
const createLabelObject = (name, object) => {
  const div = document.createElement('div');
  div.className = 'label';
  div.id = name;
  div.innerHTML = `
    <div class="title">设备</div>
    <div class="story">
      <div class="item">电压：10V</div>
      <div class="item">电流：10A</div>
    </div>
  `;

  const label = new CSS2DObject(div);
  label.position.set(0, 0, 0);
  label.center.set(0.5, 1);
  object.add(label);
  label.visible = false;

  return label;
};

// 重新定义的方法
const init = optimizedInit;

// 初始化开发工具
const initDevTools = () => {
  showDevTools.value = true;
  // 监听窗口大小变化
  window.addEventListener('resize', onWindowResize);
};

// 窗口大小变化监听
const onWindowResize = () => {
  if (sceneManager && particleManager) {
    const width = container.value.clientWidth;
    const height = container.value.clientHeight;
    sceneManager.resize(width, height);
    particleManager.update(); // 更新粒子系统
  }
};

// 切换灾害类型
const switchDisasterType = (type) => {
  disasterAutoType.value = type;
  // 根据灾害类型创建灾难
  if (isAuto.value) {
    const disaster = disasterManager.createDisaster(
      new THREE.Vector3(0, 0, 0), // 默认起始点
      new THREE.Vector3(0, 0, 0), // 默认结束点
      type
    );
    if (disaster) {
      ElMessage.success(`已创建 ${DISASTER_TYPES[type]} 灾难`);
    }
  }
};

// 创建手动灾难
const createManualDisaster = () => {
  const startPoint = new THREE.Vector3(0, 0, 0); // 示例起始点
  const endPoint = new THREE.Vector3(0, 0, 0); // 示例结束点
  const type = disasterType.value;

  const disaster = disasterManager.createDisaster(startPoint, endPoint, type);
  if (disaster) {
    ElMessage.success(`已创建 ${DISASTER_TYPES[type]} 灾难`);
  }
};

// 扩大灾难
const expandingDisaster = () => {
  const disaster = disasterManager.disasters.find(d => d.playing);
  if (disaster) {
    disasterManager.expandDisaster(disaster);
    ElMessage.success(`已扩大 ${DISASTER_TYPES[disaster.type]} 灾难`);
  } else {
    ElMessage.warning('请先创建一个正在播放的灾难');
  }
};

// 创建爆炸
const createExplosion = () => {
  const disaster = disasterManager.disasters.find(d => d.playing);
  if (disaster) {
    if (disaster.type === 2) { // 瓦斯爆炸
      disasterManager.createDisasterEffect(disaster);
      ElMessage.success('已创建瓦斯爆炸');
    } else {
      ElMessage.warning('当前灾难不是瓦斯爆炸类型，无法创建爆炸');
    }
  } else {
    ElMessage.warning('请先创建一个正在播放的灾难');
  }
};

// 播放/暂停
const togglePlayPause = () => {
  playing.value = !playing.value;
  if (playing.value) {
    // 开始播放
    particleManager.update();
    sceneManager.render();
  } else {
    // 暂停播放
    TWEEN.removeAll();
  }
};

// 创建线路
const createPathLine = () => {
  const startPoint = new THREE.Vector3(0, 0, 0); // 示例起始点
  const endPoint = new THREE.Vector3(0, 0, 0); // 示例结束点

  const line = new THREE.LineSegments(
    new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 5 }),
    new THREE.BufferGeometry().setFromPoints([startPoint, endPoint])
  );
  sceneManager.scene.add(line);
  ElMessage.success('已创建线路');
};

// 清除所有灾难
const clearAllDisasters = () => {
  disasterManager.clearAllDisasters();
  ElMessage.success('已清除所有灾难');
};

// 自动灾难类型变化
const disasterAutoTypeChange = () => {
  if (isAuto.value) {
    switchDisasterType(disasterAutoType.value);
  }
};

// 监听器
onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  cleanupResources();
});
</script>

<style scoped>
.three-container {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background-color: transparent;
}

.tools {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40px;
  line-height: 40px;
  width: 100vw;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: rgba(8, 16, 20, 0.9);
  z-index: 2000;
}

.text {
  font-size: 24px;
  margin-top: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}

.loader {
  font-weight: bold;
  font-family: monospace;
  display: inline-grid;
  font-size: 30px;
}

.loader:before,
.loader:after {
  content: "Loading...";
  grid-area: 1/1;
  -webkit-mask-size: 100% 5px, 100% 100%;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: l35-1 1s infinite;
}

.loader:before {
  -webkit-mask-image:
    linear-gradient(#fff 0 0),
    linear-gradient(#fff 0 0);
}

.loader:after {
  -webkit-mask-image:
    linear-gradient(#fff 0 0);
  animation:
    l35-1 1s infinite,
    l35-2 0.2s infinite cubic-bezier(0.5, 200, 0.5, -200);
}

.switch {
  position: absolute;
  width: 100%;
  height: 37px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  left: 0;
  top: 12%;
  z-index: 100;
}

.button {
  border: 0;
  background: transparent;
  font-size: 18px;
  height: 37px;
  line-height: 37px;
  text-align: center;
  color: #ccc;
  border-radius: 4px;
  min-width: 150px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 5px;
  padding: 0 10px;
}

.button:hover {
  color: #fff;
  transform: translateY(-2px);
}

.button div {
  width: 136px;
  height: 42px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  background-repeat: no-repeat;
  background-image: url("../assets/img/bg_tab_select.png");
  display: none;
  transition: opacity 0.3s ease;
}

.selected {
  color: #fff !important;
  font-weight: bold;
}

.selected div {
  display: block;
  opacity: 1;
}

:deep(.label) {
  width: 200px;
  height: 120px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.95);
  transform: translate(-50%, 0);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

:deep(.label .title) {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: rgba(59, 130, 246, 0.1);
  color: #1e40af;
  font-weight: 600;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
}

:deep(.label .story) {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 15px;
  color: #374151;
}

:deep(.label .item) {
  text-align: left;
  margin: 2px 0;
  font-size: 14px;
}

/* 动画关键帧 */
@keyframes l35-1 {
  0% { -webkit-mask-position: 0 20px, 0 0; }
  20% { -webkit-mask-position: 0 8px, 0 0; }
  40% { -webkit-mask-position: 0 100%, 0 0; }
  60% { -webkit-mask-position: 0 3px, 0 0; }
  80% { -webkit-mask-position: 0 15px, 0 0; }
  100% { -webkit-mask-position: 0 0, 0 0; }
}

@keyframes l35-2 {
  100% { transform: translate(0.1px); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .switch {
    top: 5%;
    flex-wrap: wrap;
    height: auto;
  }
  
  .button {
    min-width: 120px;
    font-size: 16px;
    margin: 2px;
  }
  
  .tools {
    flex-wrap: wrap;
    height: auto;
    padding: 10px;
  }
  
  :deep(.label) {
    width: 180px;
    height: 100px;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .button {
    border: 1px solid currentColor;
  }
  
  .selected {
    background-color: currentColor;
    color: white;
  }
}

/* 减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
  
  .button:hover {
    transform: none;
  }
  
  .loader:before,
  .loader:after {
    animation: none;
  }
}
</style>