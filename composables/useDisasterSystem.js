import { ref, reactive } from 'vue';
import * as THREE from 'three';
import * as YUKA from '@/components/libs/yuka.module.js';
import { DISASTER_TYPES, AUTO_DISASTER_TYPES } from '../config/disaster-config.js';

export function useDisasterSystem() {
  // 灾害相关状态
  const disasters = ref([]);
  const disasterType = ref(DISASTER_TYPES.FIRE);
  const disasterAutoType = ref(AUTO_DISASTER_TYPES.FIRE_SPREAD);
  const playing = ref(false);
  const explodeCenter = ref(null);

  // 寻路相关
  let navMesh = null;
  let navMeshGroup = null;
  let graph = null;
  let nodes = [];
  let edges = [];
  let threeNodes = [];

  // 初始化寻路系统
  const initNavigationSystem = async (navMeshUrl) => {
    const yukaLoader = new YUKA.NavMeshLoader();
    try {
      navMesh = await yukaLoader.load(navMeshUrl);
      graph = navMesh.graph;
      
      // 获取导航节点
      graph.getNodes(nodes);
      nodes.forEach((node, index) => {
        const position = node.position;
        threeNodes[index] = new THREE.Vector3(position.x, position.y, position.z);
      });
      
      return navMesh;
    } catch (error) {
      console.error('Failed to load navigation mesh:', error);
      throw error;
    }
  };

  // 创建灾害数据结构
  const createDisaster = (startPoint, endPoint, type, delay = 0) => {
    if (!navMesh) {
      console.error('Navigation mesh not initialized');
      return null;
    }

    const path = navMesh.findPath(
      new YUKA.Vector3(startPoint.x, startPoint.y, startPoint.z),
      new YUKA.Vector3(endPoint.x, endPoint.y, endPoint.z)
    );

    if (!path.length) {
      console.warn('No path found between points');
      return null;
    }

    // 计算包围盒和包围球
    const boundingBox = new THREE.Box3().setFromPoints(path);
    const boundingSphere = new THREE.Sphere();
    boundingBox.getBoundingSphere(boundingSphere);

    const size = new THREE.Vector3();
    boundingBox.getSize(size);

    // 检查灾害交互
    const finalType = checkDisasterInteraction(type, boundingBox);

    const disaster = {
      id: THREE.MathUtils.generateUUID(),
      sp: startPoint.clone(),
      ep: endPoint.clone(),
      bs: boundingSphere,
      bb: boundingBox,
      path: path,
      type: finalType,
      originalType: type,
      isAllNode: true,
      playing: false,
      created: Date.now(),
      delay: delay
    };

    // 延迟添加灾害
    if (delay > 0) {
      setTimeout(() => {
        disasters.value.push(disaster);
        processDisasterEffects(disaster);
      }, delay);
    } else {
      disasters.value.push(disaster);
      processDisasterEffects(disaster);
    }

    return disaster;
  };

  // 检查灾害之间的交互
  const checkDisasterInteraction = (type, boundingBox) => {
    let finalType = type;

    // 如果是瓦斯，检查周围是否有火灾
    if (type === DISASTER_TYPES.GAS) {
      for (const disaster of disasters.value) {
        if (disaster.type === DISASTER_TYPES.FIRE) {
          if (boundingBox.intersectsBox(disaster.bb) || isAdjacent(boundingBox, disaster.bb)) {
            finalType = DISASTER_TYPES.FIRE;
            // 设置爆炸中心
            explodeCenter.value = boundingBox.getCenter(new THREE.Vector3());
            break;
          }
        }
      }
    }
    // 如果是火灾，点燃重合的瓦斯
    else if (type === DISASTER_TYPES.FIRE) {
      for (const disaster of disasters.value) {
        if (disaster.type === DISASTER_TYPES.GAS) {
          if (boundingBox.intersectsBox(disaster.bb) || isAdjacent(boundingBox, disaster.bb)) {
            disaster.type = DISASTER_TYPES.FIRE;
            explodeCenter.value = disaster.bs.center;
          }
        }
      }
    }

    return finalType;
  };

  // 判断两个包围盒是否相邻
  const isAdjacent = (box1, box2, epsilon = 0.1) => {
    const xAdjacent = (Math.abs(box1.max.x - box2.min.x) < epsilon || 
                      Math.abs(box2.max.x - box1.min.x) < epsilon) &&
                     ((box1.min.y <= box2.max.y && box1.max.y >= box2.min.y) &&
                      (box1.min.z <= box2.max.z && box1.max.z >= box2.min.z));

    const yAdjacent = (Math.abs(box1.max.y - box2.min.y) < epsilon || 
                      Math.abs(box2.max.y - box1.min.y) < epsilon) &&
                     ((box1.min.x <= box2.max.x && box1.max.x >= box2.min.x) &&
                      (box1.min.z <= box2.max.z && box1.max.z >= box2.min.z));

    const zAdjacent = (Math.abs(box1.max.z - box2.min.z) < epsilon || 
                      Math.abs(box2.max.z - box1.min.z) < epsilon) &&
                     ((box1.min.x <= box2.max.x && box1.max.x >= box2.min.x) &&
                      (box1.min.y <= box2.max.y && box1.max.y >= box2.min.y));

    return xAdjacent || yAdjacent || zAdjacent;
  };

  // 处理灾害效果
  const processDisasterEffects = (disaster) => {
    // 这里会调用粒子系统创建相应的效果
    // 具体实现会在主组件中处理
    console.log(`Processing disaster effect for type: ${disaster.type}`);
  };

  // 扩大灾害范围
  const expandDisaster = (disaster) => {
    if (!graph || !disaster.isAllNode) return;

    const path = disaster.path;
    const points = path.map(p => [p.x, p.y, p.z]);
    
    // 使用凸包算法找到关键点
    try {
      const QuickHull = await import('quickhull3d');
      const hull = points.length > 3 ? QuickHull.default(points) : [0, 1, 2];
      const flattenedHull = hull.flat();
      const uniqueHull = [...new Set(flattenedHull)];

      uniqueHull.forEach(hullIndex => {
        const point = path[hullIndex];
        if (point && point.index) {
          const node = nodes[point.index];
          if (node) {
            graph.getEdgesOfNode(node.index, edges);
            const expandedPath = findExpandedPath(disaster, point);
            if (expandedPath.length > 1) {
              createDisaster(
                expandedPath[0],
                expandedPath[expandedPath.length - 1],
                disaster.type,
                disaster
              );
            }
          }
        }
      });
    } catch (error) {
      console.error('Error expanding disaster:', error);
    }
  };

  // 查找扩展路径
  const findExpandedPath = (disaster, point) => {
    if (!edges.length) return [];

    const otherPoints = [];
    const box = disaster.bb;

    edges.forEach(edge => {
      const node = nodes[edge.to];
      if (node && !box.containsPoint(node.position)) {
        node.position.index = edge.to;
        otherPoints.push(node.position);
      }
    });

    // 过滤掉已在其他灾害中的点
    const filteredPoints = otherPoints.filter(p => {
      return !disasters.value.some(d => 
        d !== disaster && d.bb.containsPoint(p)
      );
    });

    return filteredPoints.length > 0 ? 
           [new YUKA.Vector3(point.x, point.y, point.z), ...filteredPoints] : 
           [];
  };

  // 查找路径
  const findPath = (startPoint, endPoint) => {
    if (!navMesh) return [];
    
    try {
      return navMesh.findPath(
        new YUKA.Vector3(startPoint.x, startPoint.y, startPoint.z),
        new YUKA.Vector3(endPoint.x, endPoint.y, endPoint.z)
      );
    } catch (error) {
      console.error('Path finding error:', error);
      return [];
    }
  };

  // 检查路径是否穿过灾害区域
  const isPathSafe = (path) => {
    for (let i = 0; i < path.length - 1; i++) {
      const start = path[i];
      const end = path[i + 1];
      
      for (const disaster of disasters.value) {
        if (lineIntersectsSphere(start, end, disaster.bs.center, disaster.bs.radius)) {
          return false;
        }
      }
    }
    return true;
  };

  // 检查线段是否穿过球体
  const lineIntersectsSphere = (start, end, sphereCenter, sphereRadius) => {
    const lineDir = new THREE.Vector3().subVectors(end, start);
    const lineLength = lineDir.length();
    lineDir.normalize();

    const sphereToStart = new THREE.Vector3().subVectors(start, sphereCenter);
    const a = lineDir.dot(lineDir);
    const b = 2 * lineDir.dot(sphereToStart);
    const c = sphereToStart.dot(sphereToStart) - sphereRadius * sphereRadius;

    const discriminant = b * b - 4 * a * c;

    if (discriminant >= 0) {
      const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
      const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
      return (t1 >= 0 && t1 <= lineLength) || (t2 >= 0 && t2 <= lineLength);
    }

    return false;
  };

  // 清除所有灾害
  const clearAllDisasters = () => {
    disasters.value = [];
    explodeCenter.value = null;
    playing.value = false;
  };

  // 根据ID移除灾害
  const removeDisaster = (disasterId) => {
    const index = disasters.value.findIndex(d => d.id === disasterId);
    if (index !== -1) {
      disasters.value.splice(index, 1);
    }
  };

  // 获取指定类型的灾害
  const getDisastersByType = (type) => {
    return disasters.value.filter(disaster => disaster.type === type);
  };

  // 计算路径总长度
  const calculatePathLength = (path) => {
    let totalLength = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const current = path[i];
      const next = path[i + 1];
      totalLength += Math.sqrt(
        Math.pow(next.x - current.x, 2) +
        Math.pow(next.y - current.y, 2) +
        Math.pow(next.z - current.z, 2)
      );
    }
    return totalLength;
  };

  return {
    // 响应式状态
    disasters,
    disasterType,
    disasterAutoType,
    playing,
    explodeCenter,

    // 方法
    initNavigationSystem,
    createDisaster,
    expandDisaster,
    findPath,
    isPathSafe,
    clearAllDisasters,
    removeDisaster,
    getDisastersByType,
    calculatePathLength,
    checkDisasterInteraction,
    isAdjacent,

    // 只读属性
    get navMesh() { return navMesh; },
    get nodes() { return nodes; },
    get threeNodes() { return threeNodes; },
    get graph() { return graph; }
  };
}