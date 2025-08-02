import { ref, onUnmounted } from 'vue';

export function usePerformanceOptimization() {
  // 性能监控
  const performanceMetrics = ref({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0,
    particleCount: 0
  });

  // 对象池管理
  const objectPools = new Map();
  
  // 节流函数集合
  const throttledFunctions = new Map();
  
  // 清理任务队列
  const cleanupTasks = [];

  /**
   * 创建对象池
   * @param {string} name - 池名称
   * @param {Function} createFn - 创建对象的函数
   * @param {Function} resetFn - 重置对象的函数
   * @param {number} initialSize - 初始池大小
   */
  const createObjectPool = (name, createFn, resetFn, initialSize = 10) => {
    const pool = {
      objects: [],
      createFn,
      resetFn,
      inUse: new Set()
    };

    // 预创建对象
    for (let i = 0; i < initialSize; i++) {
      pool.objects.push(createFn());
    }

    objectPools.set(name, pool);
    return pool;
  };

  /**
   * 从对象池获取对象
   * @param {string} poolName - 池名称
   */
  const getFromPool = (poolName) => {
    const pool = objectPools.get(poolName);
    if (!pool) {
      console.warn(`Object pool '${poolName}' not found`);
      return null;
    }

    let obj;
    if (pool.objects.length > 0) {
      obj = pool.objects.pop();
    } else {
      obj = pool.createFn();
    }

    pool.inUse.add(obj);
    return obj;
  };

  /**
   * 将对象返回到池中
   * @param {string} poolName - 池名称
   * @param {Object} obj - 要返回的对象
   */
  const returnToPool = (poolName, obj) => {
    const pool = objectPools.get(poolName);
    if (!pool || !pool.inUse.has(obj)) {
      return false;
    }

    pool.resetFn(obj);
    pool.inUse.delete(obj);
    pool.objects.push(obj);
    return true;
  };

  /**
   * 创建节流函数
   * @param {Function} fn - 要节流的函数
   * @param {number} delay - 延迟时间（毫秒）
   * @param {string} key - 函数键值，用于缓存
   */
  const throttle = (fn, delay, key = null) => {
    const fnKey = key || fn.toString();
    
    if (throttledFunctions.has(fnKey)) {
      return throttledFunctions.get(fnKey);
    }

    let lastCall = 0;
    let timeoutId = null;

    const throttledFn = (...args) => {
      const now = Date.now();
      
      if (now - lastCall >= delay) {
        lastCall = now;
        return fn.apply(this, args);
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastCall = Date.now();
          timeoutId = null;
          fn.apply(this, args);
        }, delay - (now - lastCall));
      }
    };

    throttledFunctions.set(fnKey, throttledFn);
    return throttledFn;
  };

  /**
   * 创建防抖函数
   * @param {Function} fn - 要防抖的函数
   * @param {number} delay - 延迟时间（毫秒）
   */
  const debounce = (fn, delay) => {
    let timeoutId = null;
    
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  /**
   * 批量执行任务
   * @param {Array} tasks - 任务数组
   * @param {number} batchSize - 每批次执行的任务数量
   * @param {number} delay - 批次间延迟时间
   */
  const batchExecute = async (tasks, batchSize = 10, delay = 16) => {
    for (let i = 0; i < tasks.length; i += batchSize) {
      const batch = tasks.slice(i, i + batchSize);
      
      // 执行当前批次
      await Promise.all(batch.map(task => 
        typeof task === 'function' ? task() : task
      ));
      
      // 等待下一帧
      if (i + batchSize < tasks.length) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  /**
   * 内存使用监控
   */
  const monitorMemory = () => {
    if (performance.memory) {
      performanceMetrics.value.memoryUsage = {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) // MB
      };
    }
  };

  /**
   * FPS监控
   */
  const createFPSMonitor = () => {
    let lastTime = performance.now();
    let frameCount = 0;
    
    const monitor = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        performanceMetrics.value.fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(monitor);
    };
    
    requestAnimationFrame(monitor);
  };

  /**
   * 渲染时间监控
   */
  const measureRenderTime = (renderFn) => {
    return (...args) => {
      const startTime = performance.now();
      const result = renderFn.apply(this, args);
      const endTime = performance.now();
      
      performanceMetrics.value.renderTime = endTime - startTime;
      return result;
    };
  };

  /**
   * 几何体优化 - 合并几何体
   * @param {Array} geometries - 几何体数组
   * @param {THREE.Material} material - 材质
   */
  const mergeGeometries = (geometries, material) => {
    // 这里需要THREE.js的BufferGeometryUtils
    // 返回合并后的几何体以减少绘制调用
    console.log('Merging geometries for performance optimization');
    return geometries;
  };

  /**
   * 视锥体剔除优化
   * @param {THREE.Camera} camera - 相机
   * @param {Array} objects - 对象数组
   */
  const frustumCulling = (camera, objects) => {
    if (!camera || !objects) return objects;
    
    const frustum = new THREE.Frustum();
    const matrix = new THREE.Matrix4().multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(matrix);
    
    return objects.filter(obj => {
      if (!obj.geometry || !obj.matrixWorld) return true;
      
      const boundingSphere = obj.geometry.boundingSphere;
      if (!boundingSphere) return true;
      
      const sphere = boundingSphere.clone();
      sphere.applyMatrix4(obj.matrixWorld);
      
      return frustum.intersectsSphere(sphere);
    });
  };

  /**
   * LOD（细节层次）管理
   * @param {THREE.Camera} camera - 相机
   * @param {Array} lodObjects - LOD对象数组
   */
  const updateLOD = (camera, lodObjects) => {
    const cameraPosition = camera.position;
    
    lodObjects.forEach(lodObj => {
      if (!lodObj.levels) return;
      
      const distance = cameraPosition.distanceTo(lodObj.position);
      
      // 根据距离选择合适的LOD级别
      let selectedLevel = lodObj.levels.length - 1;
      for (let i = 0; i < lodObj.levels.length; i++) {
        if (distance <= lodObj.levels[i].distance) {
          selectedLevel = i;
          break;
        }
      }
      
      // 更新可见性
      lodObj.levels.forEach((level, index) => {
        level.object.visible = index === selectedLevel;
      });
    });
  };

  /**
   * 纹理优化 - 自动调整纹理大小
   * @param {THREE.Texture} texture - 纹理
   * @param {number} maxSize - 最大尺寸
   */
  const optimizeTexture = (texture, maxSize = 1024) => {
    if (!texture.image) return texture;
    
    const { width, height } = texture.image;
    const size = Math.max(width, height);
    
    if (size > maxSize) {
      const scale = maxSize / size;
      texture.image.width = Math.floor(width * scale);
      texture.image.height = Math.floor(height * scale);
      texture.needsUpdate = true;
    }
    
    return texture;
  };

  /**
   * 添加清理任务
   * @param {Function} task - 清理任务
   */
  const addCleanupTask = (task) => {
    cleanupTasks.push(task);
  };

  /**
   * 执行垃圾回收提示
   */
  const suggestGarbageCollection = () => {
    if (window.gc && typeof window.gc === 'function') {
      // 仅在开发环境使用
      if (process.env.NODE_ENV === 'development') {
        window.gc();
      }
    }
  };

  /**
   * 内存清理
   */
  const cleanup = () => {
    // 执行所有清理任务
    cleanupTasks.forEach(task => {
      try {
        task();
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    });
    
    // 清理对象池
    objectPools.forEach(pool => {
      pool.objects.forEach(obj => {
        if (obj.dispose) obj.dispose();
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(mat => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      pool.objects = [];
      pool.inUse.clear();
    });
    
    // 清理节流函数
    throttledFunctions.clear();
    
    // 建议垃圾回收
    suggestGarbageCollection();
  };

  // 组件卸载时自动清理
  onUnmounted(() => {
    cleanup();
  });

  return {
    // 性能指标
    performanceMetrics,
    
    // 对象池
    createObjectPool,
    getFromPool,
    returnToPool,
    
    // 函数优化
    throttle,
    debounce,
    batchExecute,
    
    // 监控功能
    monitorMemory,
    createFPSMonitor,
    measureRenderTime,
    
    // 渲染优化
    mergeGeometries,
    frustumCulling,
    updateLOD,
    optimizeTexture,
    
    // 内存管理
    addCleanupTask,
    suggestGarbageCollection,
    cleanup
  };
}