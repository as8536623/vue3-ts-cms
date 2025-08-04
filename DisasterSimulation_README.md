# 灾害模拟系统组件 - 重构版本

## 📖 概述

这是一个基于 Vue 3 + Three.js 的3D灾害模拟系统，支持火灾、瓦斯爆炸、粉尘、塌方、渗水等多种灾害类型的可视化模拟。该组件经过全面重构，采用模块化架构，具有更好的性能、可维护性和扩展性。

## 🚀 主要特性

- **多灾害类型支持**: 火灾、瓦斯、粉尘、塌方、渗水、冲击地压等
- **实时3D渲染**: 基于Three.js的高性能3D场景渲染
- **粒子系统**: 逼真的火焰、烟雾、爆炸效果
- **智能路径规划**: 基于YUKA的导航网格避难路径计算
- **模块化架构**: 高内聚低耦合的代码组织
- **性能优化**: 节流、内存管理、资源清理
- **响应式设计**: 支持多设备访问
- **错误处理**: 完善的错误边界和异常处理

## 🏗️ 架构设计

### 核心管理器

#### 1. SceneManager (场景管理器)
```javascript
class SceneManager {
  // 负责Three.js场景的初始化、渲染和资源管理
  init(container, width, height)    // 初始化场景
  render()                          // 渲染场景
  resize(width, height)             // 处理窗口大小变化
  dispose()                         // 清理资源
}
```

#### 2. ParticleManager (粒子系统管理器)
```javascript
class ParticleManager {
  // 管理所有粒子效果和材质
  createFireEmitter(size, center)   // 创建火焰效果
  createGasEmitter(size, center)    // 创建瓦斯效果
  createExplosion(point)            // 创建爆炸效果
  clearAllEmitters()                // 清理所有发射器
}
```

#### 3. DisasterManager (灾害管理器)
```javascript
class DisasterManager {
  // 管理灾害的创建、交互和扩散
  createDisaster(start, end, type)  // 创建灾害
  expandDisaster(disaster)          // 扩大灾害
  checkDisasterInteractions()       // 检查灾害间交互
  clearAllDisasters()               // 清理所有灾害
}
```

### 状态管理

使用Vue 3的`reactive`和`ref`进行状态管理：

```javascript
// 场景状态
const sceneState = reactive({
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  // ...
});

// 灾害状态
const disasterState = reactive({
  disasters: [],
  emitters: [],
  drama: null,
  // ...
});

// 资源状态
const resourceState = reactive({
  loaded: 0,
  cameraModels: [],
  sensorModels: [],
  // ...
});
```

## 🎮 使用方法

### 基本使用

```vue
<template>
  <div class="simulation-container">
    <DisasterSimulation />
  </div>
</template>

<script setup>
import DisasterSimulation from './components/DisasterSimulation.vue'
</script>
```

### 灾害类型

| 类型ID | 名称 | 描述 |
|--------|------|------|
| 1 | 火灾 | 火焰蔓延效果 |
| 2 | 瓦斯 | 瓦斯泄漏和爆炸 |
| 3 | 粉尘 | 粉尘扩散和爆炸 |
| 4 | 渗水 | 水灾模拟 |
| 5 | 塌方 | 顶板塌陷 |
| 6 | 墙壁渗水 | 墙面渗水 |
| 7 | 冲击地压 | 地压灾害 |

### 操作方式

1. **自动模式**: 选择灾害类型，系统自动播放预设场景
2. **手动模式**: 手动创建和控制灾害的发生和扩散
3. **路径规划**: 系统自动计算安全撤离路径

## ⚡ 性能优化

### 1. 事件节流
```javascript
// 节流函数，避免频繁触发
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
```

### 2. 内存管理
```javascript
// 完善的资源清理
const cleanupResources = () => {
  // 清理动画循环
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  // 清理事件监听器
  window.removeEventListener('resize', throttledResize);
  
  // 清理Three.js资源
  sceneManager?.dispose();
  particleManager?.dispose();
};
```

### 3. 异步加载
```javascript
// 异步加载模型，提供进度反馈
const loadModelsAsync = () => {
  return new Promise((resolve, reject) => {
    // 配置DRACO压缩
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./libs/draco/');
    loader.setDRACOLoader(dracoLoader);
    
    // 批量加载模型
    models.forEach(model => {
      loader.load(model.url, onLoad, onProgress, onError);
    });
  });
};
```

## 🛠️ 开发指南

### 环境要求
- Vue 3.x
- Three.js
- Element Plus
- Node.js 16+

### 安装依赖
```bash
npm install three
npm install three.proton.js
npm install yuka
npm install element-plus
npm install three-bvh-csg
```

### 开发模式
```javascript
// 开发环境下显示调试工具
showDevTools.value = process.env.NODE_ENV === 'development';
```

### 添加新灾害类型

1. 在`DISASTER_TYPES`中添加新类型
2. 在`ParticleManager`中添加对应的粒子效果方法
3. 在`DisasterManager.createDisasterEffect`中添加处理逻辑

```javascript
// 示例：添加新的灾害类型
case 8: // 新灾害类型
  this.particleManager.createNewDisasterEmitter(size, center);
  break;
```

## 📱 响应式支持

组件支持多种设备和偏好设置：

```css
/* 移动设备适配 */
@media (max-width: 768px) {
  .switch {
    flex-wrap: wrap;
    height: auto;
  }
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .button {
    border: 1px solid currentColor;
  }
}

/* 减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
}
```

## 🐛 错误处理

### 错误边界
```javascript
const safeExecute = (func, errorMessage = '操作失败') => {
  try {
    return func();
  } catch (error) {
    console.error(errorMessage, error);
    ElMessage.error(errorMessage);
    return null;
  }
};
```

### 异常恢复
- 模型加载失败时继续加载其他模型
- 粒子系统异常时优雅降级
- 内存不足时自动清理资源

## 🔧 配置选项

```javascript
const CONFIG = {
  models: [
    // 模型配置
  ],
  options: {
    deviceMinDis: 65,        // 设备最小距离
    heightThreshold: -30,    // 高度阈值
    heightThreshold2: 60,    // 高度阈值2
    EPSILON: 1e-6           // 精度阈值
  }
};
```

## 📊 性能监控

### 内存使用监控
```javascript
// 监控内存使用情况
const monitorMemory = () => {
  if (performance.memory) {
    console.log('Used:', performance.memory.usedJSHeapSize);
    console.log('Total:', performance.memory.totalJSHeapSize);
    console.log('Limit:', performance.memory.jsHeapSizeLimit);
  }
};
```

### FPS监控
```javascript
// 监控帧率
let lastTime = 0;
let frames = 0;

const measureFPS = (currentTime) => {
  frames++;
  if (currentTime >= lastTime + 1000) {
    const fps = Math.round((frames * 1000) / (currentTime - lastTime));
    console.log('FPS:', fps);
    frames = 0;
    lastTime = currentTime;
  }
};
```

## 🚨 注意事项

1. **内存管理**: 确保在组件卸载时调用`cleanupResources()`
2. **性能优化**: 大场景时考虑使用LOD (Level of Detail)
3. **移动端**: 移动设备上可能需要降低粒子密度
4. **浏览器兼容**: 确保目标浏览器支持WebGL 2.0

## 📝 更新日志

### v2.0.0 (重构版本)
- ✅ 完全重构代码架构
- ✅ 采用模块化设计
- ✅ 优化性能和内存管理
- ✅ 增强错误处理
- ✅ 改进响应式设计
- ✅ 添加完善的文档

### v1.0.0 (原始版本)
- ✅ 基础3D场景渲染
- ✅ 多种灾害类型支持
- ✅ 粒子系统效果
- ✅ 路径规划功能

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License
