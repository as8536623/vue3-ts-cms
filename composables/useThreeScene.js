import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons';
import { GLTFLoader } from 'three/addons';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { RoomEnvironment } from 'three/addons';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { CAMERA_CONFIG, TEXTURE_PATHS } from '../config/disaster-config.js';

export function useThreeScene(container) {
  const loading = ref(true);
  const loadProgress = ref('0%');
  
  // Three.js 核心对象
  let scene = null;
  let camera = null;
  let renderer = null;
  let labelRenderer = null;
  let controls = null;
  let loader = null;
  let textureLoader = null;
  let animationId = null;

  // 尺寸相关
  const wWidth = ref(0);
  const wHeight = ref(0);

  // 初始化场景
  const initScene = () => {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x081014, 0.1, 40000);
    scene.background = new THREE.Color(0x081014);
    
    // 添加环境光
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    
    return scene;
  };

  // 初始化相机
  const initCamera = () => {
    camera = new THREE.PerspectiveCamera(
      CAMERA_CONFIG.fov,
      wWidth.value / wHeight.value,
      CAMERA_CONFIG.near,
      CAMERA_CONFIG.far
    );
    camera.position.set(
      CAMERA_CONFIG.defaultPosition.x,
      CAMERA_CONFIG.defaultPosition.y,
      CAMERA_CONFIG.defaultPosition.z
    );
    return camera;
  };

  // 初始化渲染器
  const initRenderer = () => {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(wWidth.value, wHeight.value);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    if (container.value) {
      container.value.appendChild(renderer.domElement);
    }
    
    return renderer;
  };

  // 初始化CSS2D渲染器
  const initLabelRenderer = () => {
    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(wWidth.value, wHeight.value);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.left = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    
    if (container.value) {
      container.value.appendChild(labelRenderer.domElement);
    }
    
    return labelRenderer;
  };

  // 初始化控制器
  const initControls = () => {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(
      CAMERA_CONFIG.defaultTarget.x,
      CAMERA_CONFIG.defaultTarget.y,
      CAMERA_CONFIG.defaultTarget.z
    );
    controls.update();
    return controls;
  };

  // 初始化加载器
  const initLoaders = () => {
    loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./libs/draco/');
    loader.setDRACOLoader(dracoLoader);
    
    textureLoader = new THREE.TextureLoader();
    
    return { loader, textureLoader };
  };

  // 初始化环境
  const initEnvironment = () => {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  };

  // 获取容器尺寸
  const getContainerSize = () => {
    if (container.value) {
      const rect = container.value.getBoundingClientRect();
      wWidth.value = rect.width;
      wHeight.value = rect.height;
    }
  };

  // 窗口大小调整处理
  const onWindowResize = () => {
    getContainerSize();
    
    if (camera && renderer && labelRenderer) {
      camera.aspect = wWidth.value / wHeight.value;
      camera.updateProjectionMatrix();
      renderer.setSize(wWidth.value, wHeight.value);
      labelRenderer.setSize(wWidth.value, wHeight.value);
    }
  };

  // 渲染循环
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    
    if (controls) controls.update();
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
    if (labelRenderer && scene && camera) {
      labelRenderer.render(scene, camera);
    }
  };

  // 清理场景
  const disposeScene = (sceneToDispose) => {
    if (!sceneToDispose) return;
    
    sceneToDispose.traverse((object) => {
      if (object.isMesh) {
        if (object.geometry) {
          object.geometry.dispose();
        }
        
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => disposeMaterial(material));
          } else {
            disposeMaterial(object.material);
          }
        }
      }
    });
    
    while (sceneToDispose.children.length > 0) {
      sceneToDispose.remove(sceneToDispose.children[0]);
    }
  };

  // 销毁材质
  const disposeMaterial = (material) => {
    if (material.map) material.map.dispose();
    if (material.lightMap) material.lightMap.dispose();
    if (material.bumpMap) material.bumpMap.dispose();
    if (material.normalMap) material.normalMap.dispose();
    if (material.specularMap) material.specularMap.dispose();
    if (material.envMap) material.envMap.dispose();
    material.dispose();
  };

  // 初始化所有组件
  const init = () => {
    getContainerSize();
    initScene();
    initCamera();
    initRenderer();
    initLabelRenderer();
    initControls();
    initLoaders();
    initEnvironment();
    
    window.addEventListener('resize', onWindowResize);
    animate();
  };

  // 清理资源
  const cleanup = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    window.removeEventListener('resize', onWindowResize);
    
    if (renderer) {
      renderer.dispose();
    }
    
    disposeScene(scene);
  };

  return {
    // 响应式状态
    loading,
    loadProgress,
    wWidth,
    wHeight,
    
    // Three.js 对象
    scene,
    camera,
    renderer,
    labelRenderer,
    controls,
    loader,
    textureLoader,
    
    // 方法
    init,
    cleanup,
    disposeScene,
    onWindowResize,
    getContainerSize
  };
}