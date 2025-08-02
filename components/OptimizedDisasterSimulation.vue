<template>
  <div ref="container" class="three-container">
    <!-- 工具栏 - 仅在开发模式显示 -->
    <div class="tools" v-if="showDevTools">
      <el-switch
        v-model="isAuto"
        inline-prompt
        active-text="自动"
        inactive-text="手动"
      />
      
      <!-- 手动模式控制 -->
      <template v-if="!isAuto">
        <el-select v-model="disasterSystem.disasterType.value" style="width:200px;margin-left:20px;margin-right:20px;">
          <el-option :value="DISASTER_TYPES.FIRE" label="火灾"></el-option>
          <el-option :value="DISASTER_TYPES.GAS" label="瓦斯"></el-option>
          <el-option :value="DISASTER_TYPES.DUST" label="粉尘"></el-option>
          <el-option :value="DISASTER_TYPES.COLLAPSE" label="塌方"></el-option>
          <el-option :value="DISASTER_TYPES.WATER" label="渗水"></el-option>
          <el-option :value="DISASTER_TYPES.WALL_WATER" label="墙壁渗水"></el-option>
          <el-option :value="DISASTER_TYPES.IMPACT_PRESSURE" label="冲击地压"></el-option>
        </el-select>
        <el-button type="danger" @click="handleCreateDisaster">创建灾难</el-button>
        <el-button type="danger" @click="handleExpandDisaster">扩大灾难</el-button>
        <el-button type="danger" @click="handleCreateExplosion">创建爆炸</el-button>
      </template>
      
      <!-- 自动模式控制 -->
      <template v-if="isAuto">
        <el-select v-model="disasterSystem.disasterAutoType.value" style="width:200px;margin-left:20px;margin-right:20px;">
          <el-option :value="AUTO_DISASTER_TYPES.FIRE_SPREAD" label="火灾蔓延"></el-option>
          <el-option :value="AUTO_DISASTER_TYPES.FIRE_GAS_SPREAD" label="火灾蔓延及瓦斯蔓延"></el-option>
          <el-option :value="AUTO_DISASTER_TYPES.GAS_EXPLOSION" label="瓦斯蔓延及明火爆炸"></el-option>
          <el-option :value="AUTO_DISASTER_TYPES.DUST_EXPLOSION" label="粉尘蔓延及粉尘爆炸"></el-option>
          <el-option :value="AUTO_DISASTER_TYPES.COLLAPSE" label="塌方"></el-option>
          <el-option :value="AUTO_DISASTER_TYPES.WATER_SPREAD" label="渗水蔓延"></el-option>
          <el-option :value="AUTO_DISASTER_TYPES.IMPACT_PRESSURE" label="冲击地压"></el-option>
        </el-select>
        <el-button type="primary" @click="handlePlayPause">{{ disasterSystem.playing.value ? '暂停' : '播放' }}</el-button>
      </template>
      
      <el-button type="success" @click="handleCreateRoute">创建线路</el-button>
      <el-button @click="handleClearAll">清除测试结果</el-button>
    </div>

    <!-- 加载状态 -->
    <div class="mask" v-if="threeScene.loading.value">
      <div class="loader"></div>
      <div class="text">{{ threeScene.loadProgress.value }}</div>
    </div>

    <!-- 灾害类型切换按钮 -->
    <div class="switch">
      <div
        v-for="(type, key) in AUTO_DISASTER_TYPES"
        :key="key"
        :class="disasterSystem.disasterAutoType.value === type ? 'selected button' : 'button'"
        @click="handleDisasterTypeSwitch(type)"
      >
        {{ getDisasterTypeName(type) }}
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import * as THREE from 'three';
import TWEEN from 'three/addons/libs/tween.module.js';
import { ElMessage } from 'element-plus';

// 导入配置和Composables
import { 
  DISASTER_TYPES, 
  AUTO_DISASTER_TYPES, 
  MODEL_CONFIG, 
  ESCAPE_POINTS,
  TEXTURE_PATHS 
} from '../config/disaster-config.js';
import { useThreeScene } from '../composables/useThreeScene.js';
import { useParticleSystem } from '../composables/useParticleSystem.js';
import { useDisasterSystem } from '../composables/useDisasterSystem.js';

// 响应式引用
const container = ref(null);
const isAuto = ref(true);
const showDevTools = ref(false); // 生产环境设为false

// 使用Composables
const threeScene = useThreeScene(container);
const particleSystem = useParticleSystem(() => threeScene.scene);
const disasterSystem = useDisasterSystem();

// 计算属性
const currentDisasterCount = computed(() => disasterSystem.disasters.value.length);

// 其他状态
let models = [];
let animationMixers = [];
let clock = new THREE.Clock();
let drama = null;

// 灾害类型名称映射
const disasterTypeNames = {
  [AUTO_DISASTER_TYPES.FIRE_SPREAD]: '火灾模拟',
  [AUTO_DISASTER_TYPES.GAS_EXPLOSION]: '瓦斯爆炸',
  [AUTO_DISASTER_TYPES.DUST_EXPLOSION]: '粉尘爆炸',
  [AUTO_DISASTER_TYPES.COLLAPSE]: '顶板塌陷',
  [AUTO_DISASTER_TYPES.WATER_SPREAD]: '水害模拟',
  [AUTO_DISASTER_TYPES.IMPACT_PRESSURE]: '冲击地压'
};

// 获取灾害类型显示名称
const getDisasterTypeName = (type) => {
  return disasterTypeNames[type] || `类型${type}`;
};

// 初始化模型加载
const initModelLoading = async () => {
  try {
    const promises = MODEL_CONFIG.map(model => loadModel(model));
    await Promise.all(promises);
    
    // 初始化寻路系统
    await disasterSystem.initNavigationSystem('./models/0_9.glb');
    
    threeScene.loading.value = false;
    console.log('All models and systems loaded successfully');
  } catch (error) {
    console.error('Error loading models:', error);
    ElMessage.error('模型加载失败');
  }
};

// 加载单个模型
const loadModel = (modelConfig) => {
  return new Promise((resolve, reject) => {
    if (!threeScene.loader) {
      reject(new Error('Loader not initialized'));
      return;
    }

    threeScene.loader.load(
      modelConfig.url,
      (gltf) => {
        threeScene.scene.add(gltf.scene);
        gltf.scene.position.set(0, 0, 0);
        
        // 处理动画
        if (gltf.animations && gltf.animations.length) {
          const mixer = new THREE.AnimationMixer(gltf.scene);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
          animationMixers.push(mixer);
        }
        
        // 处理模型特定的初始化
        handleModelSpecificInit(gltf, modelConfig);
        
        resolve(gltf);
      },
      (progress) => {
        const percentComplete = (progress.loaded / progress.total) * 100;
        threeScene.loadProgress.value = `${Math.round(percentComplete)}%`;
      },
      reject
    );
  });
};

// 处理模型特定的初始化
const handleModelSpecificInit = (gltf, modelConfig) => {
  switch (modelConfig.name) {
    case '地上':
      gltf.scene.position.set(13787.358, 1318.934, -3146.120);
      break;
    case '地下':
      // 处理地下模型的特殊逻辑
      break;
    // 添加其他模型的特殊处理
  }
};

// 创建地面
const createGround = () => {
  const geometry = new THREE.PlaneGeometry(80000, 80000);
  const texture = threeScene.textureLoader.load(TEXTURE_PATHS.BOTTOM);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(100, 100);
  
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    reflectivity: 0.46,
    ior: 1.45,
    roughness: 0.75,
    metalness: 0.5,
    transparent: true,
    map: texture,
    opacity: 1
  });

  const ground = new THREE.Mesh(geometry, material);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -550;
  
  threeScene.scene.add(ground);
};

// 事件处理函数
const handleCreateDisaster = () => {
  // 实现手动创建灾害的逻辑
  setupDisasterCreation();
};

const handleExpandDisaster = () => {
  disasterSystem.disasters.value.forEach(disaster => {
    disasterSystem.expandDisaster(disaster);
  });
  updateDisasterEffects();
};

const handleCreateExplosion = () => {
  setupExplosionCreation();
};

const handleCreateRoute = () => {
  setupRouteCreation();
};

const handleClearAll = () => {
  disasterSystem.clearAllDisasters();
  particleSystem.clearAllEmitters();
  clearAnimationMixers();
  
  if (drama) {
    drama.destroy();
    drama = null;
  }
  
  ElMessage.success('已清除所有测试结果');
};

const handlePlayPause = () => {
  if (!disasterSystem.playing.value) {
    // 开始播放
    drama = createDramaByType(disasterSystem.disasterAutoType.value);
    if (drama) {
      drama.play();
      disasterSystem.playing.value = true;
    }
  } else {
    // 暂停播放
    if (drama) {
      drama.pause();
      disasterSystem.playing.value = false;
    }
  }
};

const handleDisasterTypeSwitch = (type) => {
  handleClearAll();
  disasterSystem.disasterAutoType.value = type;
  handlePlayPause();
};

// 设置灾害创建模式
const setupDisasterCreation = () => {
  // 添加鼠标事件监听器用于灾害创建
  const onMouseClick = (event) => {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    
    const rect = threeScene.renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, threeScene.camera);
    
    // 这里需要添加与导航网格的交互逻辑
    // 暂时省略具体实现
  };
  
  window.addEventListener('click', onMouseClick, { once: true });
};

// 设置爆炸创建模式
const setupExplosionCreation = () => {
  // 类似于灾害创建的逻辑
};

// 设置路线创建模式
const setupRouteCreation = () => {
  // 路线创建逻辑
};

// 更新灾害效果
const updateDisasterEffects = () => {
  disasterSystem.disasters.value.forEach(disaster => {
    if (!disaster.playing) {
      const size = new THREE.Vector3();
      disaster.bb.getSize(size);
      
      particleSystem.createEmitterByType(
        disaster.type,
        size,
        disaster.bs.center
      );
      
      disaster.playing = true;
    }
  });
};

// 创建剧本播放器
const createDramaByType = (type) => {
  // 这里需要实现具体的剧本逻辑
  // 返回一个包含play、pause、destroy方法的对象
  return {
    play: () => console.log(`Playing drama type: ${type}`),
    pause: () => console.log(`Pausing drama type: ${type}`),
    destroy: () => console.log(`Destroying drama type: ${type}`)
  };
};

// 清理动画混合器
const clearAnimationMixers = () => {
  animationMixers.forEach(mixer => {
    mixer.stopAllAction();
    mixer.uncacheAction();
  });
  animationMixers = [];
};

// 渲染循环
const animate = (time) => {
  requestAnimationFrame(animate);
  
  // 更新动画混合器
  const delta = clock.getDelta();
  animationMixers.forEach(mixer => mixer.update(delta));
  
  // 更新粒子系统
  particleSystem.updateParticles();
  
  // 更新TWEEN动画
  TWEEN.update(time);
  
  // 更新控制器
  if (threeScene.controls) {
    threeScene.controls.update();
  }
  
  // 渲染场景
  if (threeScene.renderer && threeScene.scene && threeScene.camera) {
    threeScene.renderer.render(threeScene.scene, threeScene.camera);
  }
  
  if (threeScene.labelRenderer && threeScene.scene && threeScene.camera) {
    threeScene.labelRenderer.render(threeScene.scene, threeScene.camera);
  }
};

// 监听灾害数量变化
watch(currentDisasterCount, (newCount, oldCount) => {
  console.log(`Disaster count changed from ${oldCount} to ${newCount}`);
});

// 生命周期钩子
onMounted(async () => {
  try {
    // 初始化Three.js场景
    threeScene.init();
    
    // 初始化粒子系统
    particleSystem.initParticleSystem();
    particleSystem.initParticleMaterials();
    
    // 创建地面
    createGround();
    
    // 加载模型
    await initModelLoading();
    
    // 开始动画循环
    animate();
    
    console.log('Disaster simulation initialized successfully');
  } catch (error) {
    console.error('Initialization failed:', error);
    ElMessage.error('初始化失败');
  }
});

onBeforeUnmount(() => {
  // 清理资源
  threeScene.cleanup();
  particleSystem.cleanup();
  clearAnimationMixers();
  
  if (drama) {
    drama.destroy();
  }
  
  console.log('Disaster simulation cleaned up');
});

// 暴露给模板的变量
defineExpose({
  threeScene,
  particleSystem,
  disasterSystem
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
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 100;
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
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 200;
}

.loader {
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  animation: loading 1s infinite;
}

.text {
  font-size: 20px;
  margin-top: 10px;
  font-family: monospace;
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
  z-index: 50;
}

.button {
  border: 0;
  background: transparent;
  font-size: 22px;
  height: 37px;
  line-height: 37px;
  text-align: center;
  color: #ccc;
  border-radius: 4px;
  min-width: 180px;
  font-family: MyFont2;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;
}

.button:hover {
  color: #fff;
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
}

.selected {
  color: #fff;
}

.selected div {
  display: block;
}

@keyframes loading {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tools {
    flex-wrap: wrap;
    height: auto;
    padding: 10px;
  }
  
  .switch {
    top: 8%;
    flex-wrap: wrap;
  }
  
  .button {
    min-width: 120px;
    font-size: 18px;
  }
}
</style>