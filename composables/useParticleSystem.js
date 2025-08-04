import { ref } from 'vue';
import * as THREE from 'three';
import Proton from 'three.proton.js';
import { EMITTER_CONFIG, TEXTURE_PATHS, DISASTER_TYPES } from '../config/disaster-config.js';

export function useParticleSystem(scene) {
  // 粒子系统相关
  let proton = null;
  let protonGroup = null;
  let protonSR = null;
  const emitters = ref([]);
  
  // 粒子材质
  let particleMaterial = null;
  let particleMaterial1 = null;
  let particleSmokeMaterials = [];

  // 初始化粒子系统
  const initParticleSystem = () => {
    proton = new Proton();
    protonGroup = new THREE.Group();
    scene.add(protonGroup);
    
    protonSR = new Proton.SpriteRender(protonGroup);
    proton.addRender(protonSR);
    
    return { proton, protonGroup };
  };

  // 初始化粒子材质
  const initParticleMaterials = () => {
    const textureLoader = new THREE.TextureLoader();
    
    // 基础粒子材质
    const particleTexture = textureLoader.load(TEXTURE_PATHS.PARTICLE_0);
    particleMaterial = new THREE.SpriteMaterial({
      map: particleTexture,
      color: 0xff0000,
      blending: THREE.AdditiveBlending,
      fog: true,
      depthTest: false,
      transparent: true
    });

    const particleTexture1 = textureLoader.load(TEXTURE_PATHS.PARTICLE_1);
    particleMaterial1 = new THREE.SpriteMaterial({
      map: particleTexture1,
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
      fog: true,
      depthTest: false,
      transparent: true
    });

    // 烟雾材质
    particleSmokeMaterials = [
      new THREE.SpriteMaterial({
        map: textureLoader.load(TEXTURE_PATHS.SMOKE_1),
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        fog: true,
        depthTest: false,
        transparent: true
      }),
      new THREE.SpriteMaterial({
        map: textureLoader.load(TEXTURE_PATHS.SMOKE_2),
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        fog: true,
        depthTest: false,
        transparent: true
      }),
      new THREE.SpriteMaterial({
        map: textureLoader.load(TEXTURE_PATHS.SMOKE_3),
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        fog: true,
        depthTest: false,
        transparent: true
      })
    ];
  };

  // 创建火灾粒子发射器
  const createFireEmitter = (size, center) => {
    const config = EMITTER_CONFIG.FIRE;
    const emitter = new Proton.Emitter();
    
    emitter.rate = new Proton.Rate(
      new Proton.Span(...config.rate.span),
      new Proton.Span(...config.rate.interval)
    );
    
    emitter.addInitialize(new Proton.Body(new THREE.Sprite(particleMaterial)));
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(...config.life));
    emitter.addInitialize(new Proton.Position(new Proton.BoxZone(size.x, size.y, size.z)));
    emitter.addInitialize(new Proton.V(
      new Proton.Span(...config.velocity),
      new Proton.Vector3D(0, 1, 0),
      30
    ));
    
    emitter.addBehaviour(new Proton.RandomDrift(10, 10, 10, 0.05));
    emitter.addBehaviour(new Proton.Scale(new Proton.Span(...config.scale), 0.5));
    emitter.addBehaviour(new Proton.G(config.gravity));
    emitter.addBehaviour(new Proton.Color(
      config.colors[0],
      config.colors.slice(1),
      Infinity,
      Proton.easeOutSine
    ));

    emitter.p.set(center.x, center.y, center.z);
    emitter.emit();
    
    proton.addEmitter(emitter);
    emitters.value.push(emitter);
    
    return emitter;
  };

  // 创建瓦斯粒子发射器
  const createGasEmitter = (size, center) => {
    const config = EMITTER_CONFIG.GAS;
    const emitter = new Proton.Emitter();
    
    emitter.rate = new Proton.Rate(
      new Proton.Span(...config.rate.span),
      new Proton.Span(...config.rate.interval)
    );
    
    emitter.addInitialize(new Proton.Body(new THREE.Sprite(particleMaterial)));
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(...config.life));
    emitter.addInitialize(new Proton.Position(new Proton.BoxZone(size.x, size.y, size.z)));
    emitter.addInitialize(new Proton.V(
      new Proton.Span(...config.velocity),
      new Proton.Vector3D(0, 1, 0),
      30
    ));
    
    emitter.addBehaviour(new Proton.RandomDrift(10, 10, 10, 0.05));
    emitter.addBehaviour(new Proton.Scale(new Proton.Span(...config.scale), config.scale[0]));
    emitter.addBehaviour(new Proton.G(config.gravity));
    emitter.addBehaviour(new Proton.Color(
      config.colors[0],
      config.colors.slice(1),
      Infinity,
      Proton.easeOutSine
    ));

    emitter.p.set(center.x, center.y, center.z);
    emitter.emit();
    
    proton.addEmitter(emitter);
    emitters.value.push(emitter);
    
    return emitter;
  };

  // 创建粉尘粒子发射器
  const createDustEmitter = (size, center) => {
    const config = EMITTER_CONFIG.DUST;
    const emitter = new Proton.Emitter();
    
    emitter.rate = new Proton.Rate(
      new Proton.Span(...config.rate.span),
      new Proton.Span(...config.rate.interval)
    );
    
    emitter.addInitialize(new Proton.Body(new THREE.Sprite(particleMaterial)));
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(...config.life));
    emitter.addInitialize(new Proton.Position(new Proton.BoxZone(size.x, size.y, size.z)));
    emitter.addInitialize(new Proton.V(
      new Proton.Span(...config.velocity),
      new Proton.Vector3D(0, 1, 0),
      30
    ));
    
    emitter.addBehaviour(new Proton.RandomDrift(10, 10, 10, 0.05));
    emitter.addBehaviour(new Proton.Scale(new Proton.Span(...config.scale), config.scale[0]));
    emitter.addBehaviour(new Proton.G(config.gravity));
    emitter.addBehaviour(new Proton.Color(
      config.colors[0],
      config.colors.slice(1),
      Infinity,
      Proton.easeOutSine
    ));

    emitter.p.set(center.x, center.y, center.z);
    emitter.emit();
    
    proton.addEmitter(emitter);
    emitters.value.push(emitter);
    
    return emitter;
  };

  // 创建爆炸效果
  const createExplosion = (point) => {
    const emitter = new Proton.Emitter();
    
    emitter.rate = new Proton.Rate(
      new Proton.Span(1000, 1000),
      new Proton.Span(0.1, 0.1)
    );
    
    emitter.addInitialize(new Proton.Body(new THREE.Sprite(particleMaterial)));
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(0.25, 0.85));
    emitter.addInitialize(new Proton.Position(new Proton.BoxZone(0, 0, 0)));
    emitter.addInitialize(new Proton.V(
      new Proton.Span(500, 500),
      new Proton.Vector3D(0, 1, 0),
      180
    ));
    
    emitter.addBehaviour(new Proton.Scale(new Proton.Span(5.5, 6.5), 5.5));
    emitter.addBehaviour(new Proton.G(0));
    emitter.addBehaviour(new Proton.Color(
      '#FF0000',
      ['#FF4500', '#FFA500', '#FFFF00'],
      Infinity,
      Proton.easeOutSine
    ));
    
    emitter.emit('once');
    emitter.p.set(point.x, point.y, point.z);
    
    proton.addEmitter(emitter);
    
    // 爆炸结束后清理
    emitter.addEventListener(Proton.PARTICLE_DEAD, () => {
      if (emitter.particles.length === 0) {
        emitter.stopEmit();
        proton.removeEmitter(emitter);
        emitter.destroy();
      }
    });
    
    return emitter;
  };

  // 创建烟雾效果
  const createSmokeEmitter = (position, duration = 2000) => {
    const emitter = new Proton.Emitter();
    
    emitter.rate = new Proton.Rate(
      new Proton.Span(800, 1600),
      new Proton.Span(0.1, 0.25)
    );
    
    emitter.addInitialize(new Proton.Body(particleSmokeMaterials));
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(2, 4));
    emitter.addInitialize(new Proton.Position(new Proton.BoxZone(400, 400, 400)));
    emitter.addInitialize(new Proton.V(
      new Proton.Span(50, 100),
      new Proton.Vector3D(0, 1, 0),
      400
    ));
    
    emitter.addBehaviour(new Proton.Scale(
      new Proton.Span(2, 3),
      new Proton.Span(2.5, 3.5)
    ));
    emitter.addBehaviour(new Proton.Alpha(1, 0));
    emitter.addBehaviour(new Proton.Gravity(0.3));
    emitter.addBehaviour(new Proton.Color(
      '#000000',
      ['#1c1c1c', '#373737', '#000000'],
      Infinity,
      Proton.easeOutSine
    ));
    
    emitter.emit('once');
    emitter.p.set(position.x, position.y, position.z);
    
    proton.addEmitter(emitter);
    emitters.value.push(emitter);
    
    return emitter;
  };

  // 创建水流粒子发射器
  const createWaterEmitter = (size, center, cfgKey = 'WATER') => {
    const config = EMITTER_CONFIG[cfgKey];
    if (!config) return null;
    const emitter = new Proton.Emitter();

    emitter.rate = new Proton.Rate(
      new Proton.Span(...config.rate.span),
      new Proton.Span(...config.rate.interval)
    );

    emitter.addInitialize(new Proton.Body(new THREE.Sprite(particleMaterial1)));// 使用偏蓝材质
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(...config.life));
    emitter.addInitialize(new Proton.Position(new Proton.BoxZone(size.x, size.y, size.z)));
    emitter.addInitialize(new Proton.V(
      new Proton.Span(...config.velocity),
      new Proton.Vector3D(0, 1, 0),
      30
    ));

    emitter.addBehaviour(new Proton.RandomDrift(10, 10, 10, 0.05));
    emitter.addBehaviour(new Proton.Scale(new Proton.Span(...config.scale), config.scale[0]));
    emitter.addBehaviour(new Proton.G(config.gravity));
    emitter.addBehaviour(new Proton.Color(
      config.colors[0],
      config.colors.slice(1),
      Infinity,
      Proton.easeOutSine
    ));

    emitter.p.set(center.x, center.y, center.z);
    emitter.emit();

    proton.addEmitter(emitter);
    emitters.value.push(emitter);
    return emitter;
  };

  // 塌方粉尘发射器（COLLAPSE）
  const createCollapseEmitter = (size, center) => {
    const config = EMITTER_CONFIG.COLLAPSE;
    if (!config) return null;
    return createDustEmitter(size, center); // 利用粉尘效果实现
  };

  // 冲击地压发射器（IMPACT_PRESSURE）
  const createImpactPressureEmitter = (size, center) => {
    const config = EMITTER_CONFIG.IMPACT_PRESSURE;
    if (!config) return null;

    const emitter = new Proton.Emitter();

    emitter.rate = new Proton.Rate(
      new Proton.Span(...config.rate.span),
      new Proton.Span(...config.rate.interval)
    );

    emitter.addInitialize(new Proton.Body(new THREE.Sprite(particleMaterial)));
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(...config.life));
    emitter.addInitialize(new Proton.Position(new Proton.BoxZone(size.x, size.y, size.z)));
    emitter.addInitialize(new Proton.V(
      new Proton.Span(...config.velocity),
      new Proton.Vector3D(0, -1, 0), // 向下冲击
      30
    ));

    emitter.addBehaviour(new Proton.RandomDrift(30, 30, 30, 0.05));
    emitter.addBehaviour(new Proton.Scale(new Proton.Span(...config.scale), config.scale[0]));
    emitter.addBehaviour(new Proton.G(config.gravity));
    emitter.addBehaviour(new Proton.Color(
      config.colors[0],
      config.colors.slice(1),
      Infinity,
      Proton.easeOutSine
    ));

    emitter.p.set(center.x, center.y, center.z);
    emitter.emit();

    proton.addEmitter(emitter);
    emitters.value.push(emitter);
    return emitter;
  };

  // 根据灾害类型创建发射器
  const createEmitterByType = (type, size, center) => {
    switch (type) {
      case DISASTER_TYPES.FIRE:
        return createFireEmitter(size, center);
      case DISASTER_TYPES.GAS:
        return createGasEmitter(size, center);
      case DISASTER_TYPES.DUST:
        return createDustEmitter(size, center);
      case DISASTER_TYPES.WATER:
        return createWaterEmitter(size, center, 'WATER');
      case DISASTER_TYPES.WALL_WATER:
        return createWaterEmitter(size, center, 'WALL_WATER');
      case DISASTER_TYPES.COLLAPSE:
        return createCollapseEmitter(size, center);
      case DISASTER_TYPES.IMPACT_PRESSURE:
        return createImpactPressureEmitter(size, center);
      default:
        return null;
    }
  };

  // 清除所有粒子发射器
  const clearAllEmitters = () => {
    emitters.value.forEach(emitter => {
      emitter.stopEmit();
      emitter.removeAllParticles();
      proton.removeEmitter(emitter);
      emitter.destroy();
    });
    
    // 清理粒子组
    if (protonGroup) {
      while (protonGroup.children.length > 0) {
        const child = protonGroup.children[0];
        protonGroup.remove(child);
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      }
    }
    
    emitters.value = [];
  };

  // 更新粒子系统
  const updateParticles = () => {
    if (proton) {
      proton.update();
    }
  };

  // 清理资源
  const cleanup = () => {
    clearAllEmitters();
    
    if (particleMaterial) particleMaterial.dispose();
    if (particleMaterial1) particleMaterial1.dispose();
    
    particleSmokeMaterials.forEach(material => {
      if (material) material.dispose();
    });
    
    if (proton) {
      proton.destroy();
      proton = null;
    }
  };

  return {
    // 状态
    emitters,
    
    // 方法
    initParticleSystem,
    initParticleMaterials,
    createFireEmitter,
    createGasEmitter,
    createDustEmitter,
    createWaterEmitter,
    createCollapseEmitter,
    createImpactPressureEmitter,
    createExplosion,
    createSmokeEmitter,
    createEmitterByType,
    clearAllEmitters,
    updateParticles,
    cleanup,
    
    // 对象
    get proton() { return proton; },
    get protonGroup() { return protonGroup; }
  };
}