import * as THREE from 'three';
import { answerReactionPose } from './answer-reaction.js';
import { WORLD_ENTITIES, WATER_BOWL, worldEntityPosition } from './world.js';
import { MAZE, MAZE_LAYOUTS, ENCOUNTERS, CREATURES, START, EXIT, CLUE, TREASURE, creaturePosition } from './core.js';

// Tile coordinates are x east, y south; the world maps these onto x and z.
export function createMazeRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#101e26');
  scene.fog = new THREE.Fog('#101e26', 19, 36);
  const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 70);
  const raycaster = new THREE.Raycaster();
  const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const projected = new THREE.Vector3();
  const look = new THREE.Vector3(START.x, 0, START.y);
  const matrix = new THREE.Matrix4();
  const resources = new Set();
  let lastSize = '';
  let heading = 0;
  let lastView = 'maze';
  const material = (color, options = {}) => {
    const result = new THREE.MeshStandardMaterial({ color, roughness: 0.9, ...options });
    resources.add(result); return result;
  };
  const layoutId=MAZE_LAYOUTS.find(layout=>layout.tiles===MAZE)?.id;
  const palette=layoutId==='moon'?['#4b4c70','#68688a','#2b304b']:layoutId==='ember'?['#645044','#80674e','#3d302b']:['#34515a','#405c65','#22373e'];
  const stone = material(palette[0]);
  const capStone = material(palette[1]);
  const floorStone = material('#22373e');
  const floorAccent = material('#304850');
  const brass = material('#c09550', { metalness: 0.45, roughness: 0.55 });
  const ink = material('#111b26');
  const amber = material('#ffd78a', { emissive: '#ffb541', emissiveIntensity: 1.5 });
  const cyan = material('#9ce9d7', { emissive: '#3aaf9d', emissiveIntensity: 1.0 });
  const purple = material('#aa8cde', { emissive: '#7250a2', emissiveIntensity: 0.65 });
  const red = material('#dd766c', { emissive: '#b13932', emissiveIntensity: 0.4 });
  const geometry = (value) => { resources.add(value); return value; };
  const box = (w, h, d) => geometry(new THREE.BoxGeometry(w, h, d));
  const sphere = (r) => geometry(new THREE.SphereGeometry(r, 12, 8));
  const mesh = (geo, mat, parent, x = 0, y = 0, z = 0) => {
    const result = new THREE.Mesh(geo, mat); result.position.set(x, y, z); parent.add(result); return result;
  };
  scene.add(new THREE.HemisphereLight('#c6e9e5', '#263a49', 2.1));
  const moon = new THREE.DirectionalLight('#b6d4e4', 1.9); moon.position.set(-5, 12, 5); scene.add(moon);
  const warm = new THREE.DirectionalLight('#ffd2a1', 0.9); warm.position.set(7, 4, -3); scene.add(warm);

  const wallCells = [], floorCells = [], details = [];
  MAZE.forEach((row, y) => [...row].forEach((cell, x) => {
    (cell === '#' ? wallCells : floorCells).push({ x, y });
    if (cell !== '#' && (x * 7 + y * 11) % 9 === 0) details.push({ x, y });
  }));
  const instance = (geo, mat, cells, height) => {
    const instanced = new THREE.InstancedMesh(geo, mat, cells.length);
    cells.forEach((cell, index) => { matrix.makeTranslation(cell.x, height, cell.y); instanced.setMatrixAt(index, matrix); });
    instanced.instanceMatrix.needsUpdate = true; scene.add(instanced); return instanced;
  };
  const groundTiles = instance(box(0.98, 0.14, 0.98), material('#ffffff'), floorCells, -0.08);
  floorCells.forEach((cell, index) => groundTiles.setColorAt(index, new THREE.Color(cell.x >= 16 ? '#2b413b' : cell.y >= 13 ? '#3d4344' : palette[2])));
  if (groundTiles.instanceColor) groundTiles.instanceColor.needsUpdate = true;
  instance(box(0.95, 0.72, 0.95), stone, wallCells, 0.28);
  instance(box(1, 0.08, 1), capStone, wallCells, 0.66);
  instance(box(0.014, 0.01, 0.97), stone, wallCells, 0.705);
  instance(box(0.98, 0.01, 0.012), stone, wallCells, 0.705);
  instance(box(0.86, 0.018, 0.86), floorAccent, details, 0.005);
  const base = mesh(box(MAZE[0].length + 0.8, 0.35, MAZE.length + 0.8), ink, scene, (MAZE[0].length - 1) / 2, -0.3, (MAZE.length - 1) / 2);
  base.name = 'maze-foundation';

  // Short original stone arches mark the entrance and final exit.
  function portal(point, exit = false) {
    const group = new THREE.Group(); group.position.set(point.x, 0, point.y); scene.add(group);
    const side = box(0.15, 1.4, 0.22);
    mesh(side, stone, group, -0.39, 0.65, 0);
    mesh(side, stone, group, 0.39, 0.65, 0);
    mesh(box(0.95, 0.2, 0.28), capStone, group, 0, 1.34, 0);
    const glow = mesh(box(0.62, 1.08, 0.035), exit ? purple : cyan, group, 0, 0.6, 0);
    glow.material = material(exit ? '#8066bd' : '#2e8a80', { emissive: exit ? '#51337e' : '#217b73', emissiveIntensity: 0.8, transparent: true, opacity: 0.5 });
    for (const x of [-0.39, 0.39]) mesh(box(0.06, 0.65, 0.25), exit ? purple : cyan, group, x, 0.75, 0);
    return { group, glow };
  }
  portal(START);
  const exitPortal = portal(EXIT, true);

  const markerCache = new Map();
  function createRoomMarker(encounter, index) {
    const group = new THREE.Group(); group.position.set(encounter.x, 0.04, encounter.y); scene.add(group);
    const ring = mesh(geometry(new THREE.TorusGeometry(0.36, 0.035, 5, 24)), purple, group, 0, 0.035, 0); ring.rotation.x = Math.PI / 2;
    const seal = mesh(geometry(new THREE.OctahedronGeometry(0.15)), amber, group, 0, 0.45, 0);
    for (let side = -1; side <= 1; side += 2) {
      mesh(box(0.08, 0.3, 0.08), brass, group, side * 0.37, 0.17, -0.3);
      mesh(sphere(0.055), amber, group, side * 0.37, 0.37, -0.3);
    }
    if (encounter.kind === 'floor') {
      const cracks = new THREE.Group(); group.add(cracks);
      for (const angle of [-0.7, 0.6, 1.8]) {
        const crack = mesh(box(0.04, 0.02, 0.63), ink, cracks, 0, 0.01, 0);
        crack.rotation.y = angle;
      }
    } else if (encounter.kind === 'cage') {
      for (const x of [-0.33, 0.33]) mesh(box(0.035, 0.65, 0.035), brass, group, x, 0.32, 0.3);
      mesh(box(0.72, 0.035, 0.035), brass, group, 0, 0.65, 0.3);
    } else {
      mesh(box(0.22, 0.48, 0.2), stone, group, 0, 0.2, 0.28);
      mesh(geometry(new THREE.OctahedronGeometry(0.12)), purple, group, 0, 0.54, 0.28);
    }
    return { group, ring, seal, encounter, index };
  }
  ENCOUNTERS.forEach((encounter, index) => markerCache.set(encounter.id, createRoomMarker(encounter, index)));

  const clue = new THREE.Group(); clue.position.set(CLUE.x, 0, CLUE.y); scene.add(clue);
  mesh(box(0.45, 0.25, 0.4), stone, clue, 0, 0.12, 0);
  const book = mesh(box(0.3, 0.045, 0.24), cyan, clue, 0, 0.29, 0); book.rotation.y = -0.2;
  const treasure = new THREE.Group(); treasure.position.set(TREASURE.x, 0, TREASURE.y); scene.add(treasure);
  mesh(box(0.49, 0.3, 0.35), material('#745443'), treasure, 0, 0.16, 0);
  const lid = mesh(box(0.51, 0.12, 0.38), brass, treasure, 0, 0.35, 0);
  mesh(box(0.075, 0.16, 0.37), amber, treasure, 0, 0.27, 0);

  const coat = material('#e6b268');
  const skin = material('#dfb99a');
  const trousers = material('#243348');
  function humanFigure(jacket, hairColor = '#282b34', complexion = skin, carriesLantern = false) {
    const group = new THREE.Group();
    const jacketMaterial = typeof jacket === 'string' ? material(jacket) : jacket;
    const hair = material(hairColor);
    const torso = mesh(geometry(new THREE.CylinderGeometry(0.145, 0.13, 0.34, 9)), jacketMaterial, group, 0, 0.62, 0);
    mesh(geometry(new THREE.CylinderGeometry(0.045, 0.05, 0.08, 7)), complexion, group, 0, 0.83, 0);
    const head = mesh(sphere(0.115), complexion, group, 0, 0.96, -0.01); head.scale.set(0.94, 1.1, 0.94);
    const hairCap = mesh(sphere(0.119), hair, group, 0, 1.025, 0.005); hairCap.scale.set(1, 0.55, 0.92);
    for (const x of [-0.043, 0.043]) mesh(sphere(0.013), ink, group, x, 0.98, -0.111);
    mesh(sphere(0.024), complexion, group, 0, 0.955, -0.125);
    mesh(box(0.04, 0.008, 0.009), hair, group, 0, 0.925, -0.114);
    mesh(box(0.22, 0.26, 0.09), material('#705c4c'), group, 0, 0.62, 0.145);
    const legs = [], knees = [], arms = [];
    for (const side of [-1, 1]) {
      const hip = new THREE.Group(); hip.position.set(side * 0.083, 0.43, 0); group.add(hip); legs.push(hip);
      mesh(geometry(new THREE.CylinderGeometry(0.055, 0.047, 0.19, 7)), trousers, hip, 0, -0.09, 0);
      const knee = new THREE.Group(); knee.position.y = -0.19; hip.add(knee); knees.push(knee);
      mesh(geometry(new THREE.CylinderGeometry(0.046, 0.038, 0.18, 7)), trousers, knee, 0, -0.085, 0);
      mesh(box(0.09, 0.055, 0.15), ink, knee, 0, -0.18, -0.025);
      const shoulder = new THREE.Group(); shoulder.position.set(side * 0.18, 0.75, 0); group.add(shoulder); arms.push(shoulder);
      mesh(geometry(new THREE.CylinderGeometry(0.045, 0.04, 0.18, 7)), jacketMaterial, shoulder, 0, -0.09, 0);
      const elbow = new THREE.Group(); elbow.position.y = -0.17; elbow.rotation.x = -0.12; shoulder.add(elbow);
      mesh(geometry(new THREE.CylinderGeometry(0.037, 0.032, 0.15, 7)), jacketMaterial, elbow, 0, -0.075, 0);
      mesh(sphere(0.039), complexion, elbow, 0, -0.16, 0);
    }
    let lantern = null, lanternLight = null;
    if (carriesLantern) {
      lantern = mesh(box(0.1, 0.145, 0.1), amber, group, 0.22, 0.31, -0.05);
      mesh(geometry(new THREE.TorusGeometry(0.055, 0.012, 4, 10)), brass, group, 0.22, 0.43, -0.05);
      const light = lanternLight = new THREE.PointLight('#ffc271', 2, 4.5, 2); light.position.set(0.28, 0.6, -0.18); group.add(light);
    }
    return { group, torso, head, legs, knees, arms, lantern, lanternLight };
  }
  function animateHuman(rig, gait, moving, speed = 1) {
    const amplitude = moving ? Math.min(1, speed / 2.4) : 0;
    rig.legs.forEach((leg, index) => { leg.rotation.x = Math.sin(gait + index * Math.PI) * 0.55 * amplitude; });
    rig.knees.forEach((knee, index) => { knee.rotation.x = Math.max(0, -Math.sin(gait + index * Math.PI)) * 0.65 * amplitude; });
    rig.arms.forEach((arm, index) => { arm.rotation.x = -Math.sin(gait + index * Math.PI) * 0.34 * amplitude; });
    rig.torso.position.y = 0.62 + Math.abs(Math.sin(gait)) * 0.018 * amplitude;
    rig.torso.rotation.z = Math.sin(gait) * 0.025 * amplitude;
    rig.head.position.y = 0.96 + Math.abs(Math.sin(gait)) * 0.009 * amplitude;
  }
  const explorerRig = humanFigure(coat, '#252b32', skin, true);
  const explorer = explorerRig.group; scene.add(explorer);
  let gaitDistance = 0, lastWorldElapsed = null, lastPhysical = { ...START }, cameraReady = false;
  const halo = mesh(geometry(new THREE.RingGeometry(0.26, 0.3, 32)), cyan, scene, START.x, 0.015, START.y); halo.rotation.x = -Math.PI / 2;

  function spider() {
    const group = new THREE.Group();
    const shell = material('#45425c');
    mesh(sphere(0.23), shell, group, 0, 0.27, 0.03);
    mesh(sphere(0.14), ink, group, 0, 0.21, -0.2);
    for (const x of [-0.065, 0.065]) mesh(sphere(0.035), red, group, x, 0.25, -0.33);
    for (let side = -1; side <= 1; side += 2) for (let leg = 0; leg < 4; leg++) {
      const pivot = new THREE.Group(); pivot.position.set(side * 0.12, 0.24, -0.16 + leg * 0.12); group.add(pivot);
      const upper = mesh(box(0.3, 0.035, 0.035), shell, pivot, side * 0.14, 0.02, 0); upper.rotation.z = side * 0.35;
      const lower = mesh(box(0.22, 0.035, 0.035), shell, pivot, side * 0.35, -0.07, 0); lower.rotation.z = side * -0.65;
    }
    return group;
  }
  function wraith() {
    const group = new THREE.Group();
    const cloak = material('#8175a0', { emissive: '#332540', emissiveIntensity: 0.45 });
    mesh(geometry(new THREE.ConeGeometry(0.29, 0.65, 9)), cloak, group, 0, 0.42, 0);
    const head = new THREE.Group(); head.position.y = 0.73; group.add(head);
    mesh(sphere(0.19), ink, head);
    group.userData.head = head;
    group.userData.arms = [];
    for (const x of [-0.065, 0.065]) mesh(sphere(0.028), cyan, head, x, 0.03, -0.17);
    for (const side of [-1, 1]) {
      const arm = mesh(box(0.14, 0.4, 0.14), cloak, group, side * 0.29, 0.55, 0); arm.rotation.z = side * 0.55; group.userData.arms.push({ arm, side });
    }
    return group;
  }
  const creatures = CREATURES.map((creature, index) => {
    const group = index === 0 ? spider() : wraith(); scene.add(group); return { ...creature, group, index };
  });

  // Friendly inhabitants and practical objects give the garden and ruins a life
  // beyond the academic encounters. Their positions come from the core helper.
  const cream = material('#e0d5b8'), foxFur = material('#a85d36'), brown = material('#695442');
  const leaf = material('#365949'), waterMaterial = material('#61aeb9', { transparent: true, opacity: 0.85, metalness: 0.3, roughness: 0.25 });
  const inhabitants = new Map();
  function animalFigure(kind) {
    const group = new THREE.Group(), feet = [];
    let head, tail = null, ears = [];
    if (kind === 'fox') {
      const body = mesh(sphere(0.22), foxFur, group, 0, 0.23, 0.02); body.scale.set(0.63, 0.75, 1.35);
      head = new THREE.Group(); head.position.set(0, 0.3, -0.27); group.add(head);
      mesh(sphere(0.115), foxFur, head);
      const muzzle = mesh(geometry(new THREE.ConeGeometry(0.073, 0.17, 7)), cream, head, 0, -0.02, -0.13); muzzle.rotation.x = -Math.PI / 2;
      mesh(sphere(0.026), ink, head, 0, -0.02, -0.22);
      for (const side of [-1, 1]) {
        mesh(geometry(new THREE.ConeGeometry(0.055, 0.14, 5)), foxFur, head, side * 0.072, 0.12, 0);
        mesh(sphere(0.015), ink, head, side * 0.07, 0.035, -0.09);
      }
      tail = new THREE.Group(); tail.position.set(0, 0.2, 0.27); tail.rotation.x = 1.05; group.add(tail);
      mesh(geometry(new THREE.CylinderGeometry(0.065, 0.09, 0.32, 7)), foxFur, tail, 0, 0.12, 0);
      mesh(geometry(new THREE.ConeGeometry(0.065, 0.17, 7)), cream, tail, 0, 0.36, 0);
      for (const x of [-0.1, 0.1]) for (const z of [-0.16, 0.19]) {
        const pivot = new THREE.Group(); pivot.position.set(x, 0.21, z); group.add(pivot); feet.push(pivot);
        mesh(geometry(new THREE.CylinderGeometry(0.03, 0.023, 0.18, 6)), foxFur, pivot, 0, -0.075, 0);
        mesh(sphere(0.035), ink, pivot, 0, -0.15, -0.015);
      }
    } else if (kind === 'rabbit') {
      const body = mesh(sphere(0.18), cream, group, 0, 0.18, 0.035); body.scale.set(0.78, 0.9, 1.2);
      head = new THREE.Group(); head.position.set(0, 0.27, -0.17); group.add(head);
      mesh(sphere(0.1), cream, head);
      for (const side of [-1, 1]) {
        const ear = mesh(geometry(new THREE.CapsuleGeometry(0.026, 0.15, 3, 7)), cream, head, side * 0.043, 0.16, 0); ear.rotation.z = side * -0.12; ears.push(ear);
        mesh(sphere(0.013), ink, head, side * 0.06, 0.02, -0.075);
        mesh(box(0.07, 0.04, 0.14), cream, group, side * 0.085, 0.035, -0.08);
      }
      mesh(sphere(0.018), material('#c7908c'), head, 0, -0.015, -0.096);
      mesh(sphere(0.055), cream, group, 0, 0.16, 0.23);
    } else {
      mesh(geometry(new THREE.CylinderGeometry(0.14, 0.19, 0.52, 9)), stone, group, 0, 0.26, 0);
      const body = mesh(sphere(0.17), brown, group, 0, 0.71, 0); body.scale.set(0.9, 1.22, 0.83);
      for (const side of [-1, 1]) { const wing = mesh(sphere(0.12), brown, group, side * 0.14, 0.72, 0); wing.scale.set(0.4, 1.25, 0.8); }
      head = new THREE.Group(); head.position.set(0, 0.96, -0.01); group.add(head);
      mesh(sphere(0.145), brown, head);
      for (const side of [-1, 1]) {
        mesh(sphere(0.055), cream, head, side * 0.063, 0.01, -0.115);
        mesh(sphere(0.024), ink, head, side * 0.063, 0.01, -0.16);
        mesh(geometry(new THREE.ConeGeometry(0.04, 0.1, 5)), brown, head, side * 0.1, 0.13, 0);
      }
      const beak = mesh(geometry(new THREE.ConeGeometry(0.035, 0.08, 5)), brass, head, 0, -0.035, -0.15); beak.rotation.x = -Math.PI / 2;
    }
    return { group, head, tail, ears, feet };
  }
  WORLD_ENTITIES.forEach(entity => {
    let model;
    if (entity.kind === 'human') {
      model = humanFigure(entity.id === 'scout' ? '#688ba0' : '#80976c', entity.id === 'scout' ? '#34302c' : '#4f352c');
      const marker = mesh(geometry(new THREE.OctahedronGeometry(0.065)), entity.id === 'scout' ? cyan : amber, model.group, 0, 1.28, 0);
      model.marker = marker;
    } else if (['fox', 'rabbit', 'owl'].includes(entity.kind)) model = animalFigure(entity.kind);
    else {
      model = { group: new THREE.Group() };
      if (entity.kind === 'pump') {
        mesh(box(0.35, 0.12, 0.35), stone, model.group, -0.24, 0.06, 0.14);
        mesh(geometry(new THREE.CylinderGeometry(0.075, 0.11, 0.48, 8)), leaf, model.group, -0.24, 0.33, 0.14);
        const pipe = mesh(geometry(new THREE.CylinderGeometry(0.035, 0.035, 0.27, 7)), brass, model.group, -0.08, 0.48, 0.14); pipe.rotation.z = Math.PI / 2;
        mesh(box(0.05, 0.36, 0.04), brass, model.group, -0.31, 0.64, 0.14).rotation.z = -0.5;
        model.stream = mesh(geometry(new THREE.CylinderGeometry(0.016, 0.025, 0.33, 6)), waterMaterial, model.group, 0.045, 0.27, 0.14);
        model.drops = Array.from({ length: 3 }, () => mesh(sphere(0.025), waterMaterial, model.group, 0.045, 0.3, 0.14));
      } else if (entity.kind === 'lamp') {
        mesh(geometry(new THREE.CylinderGeometry(0.035, 0.06, 1.45, 8)), brass, model.group, 0.3, 0.72, 0.22);
        mesh(box(0.3, 0.07, 0.28), ink, model.group, 0.3, 1.5, 0.22);
        model.bulb = mesh(box(0.18, 0.25, 0.18), material('#554d35', { emissive: '#ffba5a', emissiveIntensity: 0 }), model.group, 0.3, 1.33, 0.22);
        model.light = new THREE.PointLight('#ffd395', 0, 6, 2); model.light.position.set(0.3, 1.33, 0.22); model.group.add(model.light);
      } else {
        for (const x of [-0.29, 0.29]) mesh(box(0.06, 0.3, 0.26), stone, model.group, x, 0.15, 0.22);
        mesh(box(0.85, 0.07, 0.31), brown, model.group, 0, 0.32, 0.22);
        mesh(box(0.85, 0.23, 0.05), brown, model.group, 0, 0.49, 0.37);
      }
    }
    model.group.position.set(entity.x, 0, entity.y); scene.add(model.group);
    model.distance = 0; model.last = { x: entity.x, y: entity.y }; inhabitants.set(entity.id, { entity, ...model });
  });
  const bowl = new THREE.Group(); bowl.position.set(WATER_BOWL.x + 0.3, 0, WATER_BOWL.y); scene.add(bowl);
  mesh(geometry(new THREE.CylinderGeometry(0.18, 0.15, 0.09, 12, 1, true)), brass, bowl, 0, 0.05, 0);
  mesh(geometry(new THREE.CylinderGeometry(0.145, 0.145, 0.015, 12)), ink, bowl, 0, 0.015, 0);
  const bowlWater = mesh(geometry(new THREE.CircleGeometry(0.147, 16)), waterMaterial, bowl, 0, 0.075, 0); bowlWater.rotation.x = -Math.PI / 2;
  const routeMaterial=new THREE.MeshBasicMaterial({color:'#f2c477',depthTest:false,transparent:true,opacity:0.9}); resources.add(routeMaterial);
  const breadcrumbs = new THREE.InstancedMesh(geometry(new THREE.CircleGeometry(0.12, 12)), routeMaterial, 48);
  // The path changes location/count; an initially empty bounding sphere must not hide it.
  breadcrumbs.frustumCulled=false;breadcrumbs.renderOrder=4;
  scene.add(breadcrumbs); breadcrumbs.count = 0;

  // Tall landmarks sit only on wall cells, leaving walkable routes uncluttered.
  wallCells.filter(point => (point.x >= 17 || point.y >= 13) && point.x > 0 && point.x < MAZE[0].length - 1 && point.y > 0 && point.y < MAZE.length - 1 && (point.x * 3 + point.y) % 5 === 0).forEach(point => {
    const tree = new THREE.Group(); tree.position.set(point.x, 0.7, point.y); scene.add(tree);
    mesh(geometry(new THREE.CylinderGeometry(0.06, 0.09, 0.7, 6)), brown, tree, 0, 0.35, 0);
    mesh(geometry(new THREE.ConeGeometry(0.42, 0.8, 7)), leaf, tree, 0, 0.95, 0);
    mesh(geometry(new THREE.ConeGeometry(0.31, 0.7, 7)), leaf, tree, 0, 1.37, 0);
  });
  for (const point of [{ x: 6, y: 13 }, { x: 12, y: 13 }, { x: 18, y: 14 }]) {
    if (MAZE[point.y]?.[point.x] !== '#') continue;
    mesh(box(0.42, 1.1, 0.4), stone, scene, point.x, 1.2, point.y);
    mesh(box(0.7, 0.18, 0.58), capStone, scene, point.x + 0.13, 1.82, point.y);
  }

  const cage = new THREE.Group(); scene.add(cage);
  const cageMaterial = material('#8b8399', { metalness: 0.7, roughness: 0.3 });
  for (let index = 0; index < 10; index++) {
    const angle = index / 10 * Math.PI * 2;
    mesh(box(0.035, 1.35, 0.035), cageMaterial, cage, Math.cos(angle) * 0.43, 0.65, Math.sin(angle) * 0.43);
  }
  mesh(geometry(new THREE.CylinderGeometry(0.46, 0.46, 0.07, 10)), cageMaterial, cage, 0, 1.34, 0);
  mesh(geometry(new THREE.TorusGeometry(0.43, 0.035, 4, 20)), cageMaterial, cage, 0, 0.15, 0).rotation.x = Math.PI / 2;

  // A separate eye-level scene makes every trap feel like being inside a cell,
  // rather than presenting the prison as a small object in the overhead maze.
  const prison = new THREE.Scene();
  prison.background = new THREE.Color('#0b161d');
  prison.fog = new THREE.Fog('#0b161d', 5, 10);
  const prisonCamera = new THREE.PerspectiveCamera(60, 1, 0.04, 20);
  prisonCamera.position.set(0, 1.27, 1.75);
  prisonCamera.lookAt(0, 1.24, -2.8);
  prison.add(new THREE.HemisphereLight('#94c8ce', '#15212b', 1.45));
  const prisonFill = new THREE.DirectionalLight('#91b3cf', 1.4);
  prisonFill.position.set(-2, 3, 1); prison.add(prisonFill);
  const cellStone = material('#2b414b');
  const mortar = material('#15262f');
  const iron = material('#60676b', { metalness: 0.72, roughness: 0.38 });
  const ironEdge = material('#8d9290', { metalness: 0.65, roughness: 0.35 });
  mesh(box(5, 0.15, 7), floorStone, prison, 0, -0.08, -1);
  for (const x of [-2.35, 2.35]) mesh(box(0.3, 3.1, 7), cellStone, prison, x, 1.5, -1);
  mesh(box(5, 3.1, 0.35), mortar, prison, 0, 1.5, -4.2);
  mesh(box(5, 0.2, 7), mortar, prison, 0, 3.05, -1);
  // Chunky, visibly jointed masonry at the far end of the chamber.
  const brickGeometry = box(0.84, 0.4, 0.17);
  for (const parity of [0, 1]) {
    const positions = [];
    for (let row = parity; row < 7; row += 2) for (let column = 0; column < 6; column++) {
      positions.push([-2.1 + column * 0.87 + (parity ? 0.12 : 0), 0.2 + row * 0.43, -3.94]);
    }
    const bricks = new THREE.InstancedMesh(brickGeometry, parity ? stone : cellStone, positions.length);
    positions.forEach((position, index) => { matrix.makeTranslation(...position); bricks.setMatrixAt(index, matrix); });
    bricks.instanceMatrix.needsUpdate = true; prison.add(bricks);
  }
  for (let row = 0; row < 9; row++) {
    mesh(box(4.4, 0.008, 0.015), mortar, prison, 0, 0.006, -3.7 + row * 0.6);
  }
  const torchLights = [];
  for (const side of [-1, 1]) {
    const x = side * 1.55;
    mesh(box(0.09, 0.55, 0.1), brass, prison, x, 1.5, -3.65);
    mesh(geometry(new THREE.ConeGeometry(0.13, 0.32, 7)), amber, prison, x, 1.91, -3.65);
    const fire = new THREE.PointLight('#ffad56', 8, 5, 2); fire.position.set(x, 1.91, -3.45); prison.add(fire); torchLights.push(fire);
  }
  const cellWarden = wraith();
  cellWarden.scale.setScalar(2.35); cellWarden.position.set(0, 0, -2.55); cellWarden.rotation.y = Math.PI; prison.add(cellWarden);
  for (const side of [-1, 1]) {
    const horn = mesh(geometry(new THREE.ConeGeometry(0.07, 0.24, 5)), purple, cellWarden.userData.head, side * 0.14, 0.2, 0);
    horn.rotation.z = side * -0.3;
  }
  const wardenGlow = new THREE.PointLight('#9a74d0', 3, 3.5, 2); wardenGlow.position.set(0, 1.8, -2.2); prison.add(wardenGlow);

  const frontBars = new THREE.Group(); prison.add(frontBars);
  const barGeometry = box(0.065, 2.75, 0.065);
  for (const x of [-1.62, -1.08, 1.08, 1.62]) mesh(barGeometry, iron, frontBars, x, 1.38, -0.55);
  for (const y of [0.15, 2.65]) mesh(box(3.5, 0.1, 0.12), ironEdge, frontBars, 0, y, -0.55);
  // Side rails in the near foreground establish that the camera is inside.
  for (const side of [-1, 1]) for (const z of [0.1, 0.7, 1.3]) mesh(barGeometry, iron, frontBars, side * 1.75, 1.38, z);
  const gate = new THREE.Group(); gate.position.set(-0.56, 0, -0.55); frontBars.add(gate);
  for (const x of [0, 1.12]) mesh(barGeometry, ironEdge, gate, x, 1.38, 0);
  for (const y of [0.38, 2.4]) mesh(box(1.16, 0.075, 0.075), iron, gate, 0.56, y, 0);
  const lock = new THREE.Group(); lock.position.set(0.56, 0.9, 0.07); gate.add(lock);
  const lockFace = mesh(box(0.25, 0.3, 0.12), material('#c09550', { metalness: 0.45, roughness: 0.5 }), lock);
  mesh(geometry(new THREE.TorusGeometry(0.085, 0.023, 6, 14, Math.PI)), ironEdge, lock, 0, 0.16, 0);
  mesh(box(0.025, 0.075, 0.013), ink, lock, 0, 0, 0.07);
  const chains = [];
  for (const side of [-1, 1]) {
    const chain = new THREE.Group(); chain.position.set(side * 0.76, 0.72, -0.43); frontBars.add(chain);
    for (let index = 0; index < 5; index++) {
      const link = mesh(geometry(new THREE.TorusGeometry(0.05, 0.014, 4, 10)), ironEdge, chain, side * index * 0.07, index * 0.07, 0);
      link.rotation.y = index % 2 ? 0.8 : 0;
    }
    chains.push(chain);
  }
  // The player's sleeve and hand with a lantern stay in the near foreground.
  const hand = new THREE.Group(); hand.position.set(0.42, 0.85, 0.5); prison.add(hand);
  const sleeve = mesh(box(0.2, 0.5, 0.23), material('#314b55'), hand, 0, -0.2, 0.11); sleeve.rotation.x = -0.3;
  mesh(sphere(0.105), material('#b99276'), hand, 0, 0.08, -0.04);
  mesh(box(0.17, 0.24, 0.17), amber, hand, -0.03, -0.13, -0.22);
  for (const side of [-1, 1]) mesh(box(0.018, 0.26, 0.19), brass, hand, -0.03 + side * 0.09, -0.13, -0.22);
  mesh(geometry(new THREE.TorusGeometry(0.08, 0.018, 5, 12)), brass, hand, -0.03, 0.07, -0.22);
  const handLight = new THREE.PointLight('#ffca81', 2, 4, 2); handLight.position.set(0.1, 0.95, -0.2); prison.add(handLight);
  const beam = new THREE.SpotLight('#ffd59a', 0, 7, 0.38, 0.6, 1.7);
  beam.position.set(0.5, 1.05, 0.75); beam.target.position.set(0, 1.25, -3.3); prison.add(beam, beam.target);
  let prisonTime = 0;

  function renderPrison(state, reducedMotion, interaction, entryProgress = null, answerReaction = null) {
    if (!state.paused) prisonTime = reducedMotion ? 0 : ((state.elapsedMs || 0) + (state.captureMs || 0)) / 1000;
    const yaw = THREE.MathUtils.clamp(Number(interaction.lookYaw) || 0, -0.3, 0.3);
    prisonCamera.lookAt(-Math.sin(yaw) * 4.5, 1.24, -2.8);
    const raised = !!interaction.lanternRaised;
    hand.position.y = raised ? 1.05 : 0.85;
    handLight.position.y = raised ? 1.25 : 0.95;
    handLight.intensity = (raised ? 4 : 2) + (state.rewardPurchases?.includes('lantern') ? 3 : 0);
    handLight.distance = state.rewardPurchases?.includes('lantern') ? 7 : 4;
    beam.intensity = raised ? 14 : 0;
    lockFace.material.emissive.set(interaction.lockInspected ? '#ab6f21' : '#000000');
    lockFace.material.emissiveIntensity = interaction.lockInspected ? 0.65 : 0;
    if (!state.paused) {
      const rattling = interaction.rattleMs > 0;
      frontBars.position.x = rattling && !reducedMotion ? Math.sin(interaction.rattleMs * 0.055) * 0.018 : 0;
      cellWarden.rotation.z = rattling && !reducedMotion ? -0.06 : 0;
      cellWarden.position.z = rattling ? -2.38 : -2.55;
      wardenGlow.color.set(rattling ? '#c27683' : '#9a74d0');
    }
    const reviewStep = state.review?.index || 0;
    chains[0].visible = reviewStep < 1;
    chains[1].visible = true;
    const unlocked = state.phase === 'feedback' && state.resolved?.includes(state.activeEncounter)
      || state.phase === 'review-feedback' && reviewStep >= 1 && (state.review?.correct || state.review?.wrong >= 2);
    const entering = !reducedMotion && Number.isFinite(entryProgress);
    const closure = entering ? 1 - (1 - THREE.MathUtils.clamp(entryProgress, 0, 1)) ** 3 : 1;
    gate.rotation.y = entering ? -1.35 * (1 - closure) : unlocked ? -0.28 : 0;
    frontBars.position.y = entering ? 1.4 * (1 - closure) : 0;
    prisonCamera.position.z = 1.75 + (entering ? 0.28 * (1 - closure) : 0);
    lock.visible = !unlocked;
    const reaction = answerReactionPose(answerReaction, reducedMotion);
    cellWarden.position.y = (reducedMotion ? 0 : Math.sin(prisonTime * 1.5) * 0.025) + reaction.lift;
    cellWarden.rotation.z = (interaction.rattleMs > 0 && !reducedMotion ? -0.06 : 0) + reaction.tilt;
    cellWarden.userData.head.rotation.set(reaction.headPitch, reaction.headYaw, 0);
    cellWarden.userData.arms.forEach(({ arm, side }) => { arm.rotation.z = side * (0.55 + reaction.arms); });
    hand.rotation.z = reducedMotion ? 0 : Math.sin(prisonTime * 1.2) * 0.015;
    torchLights.forEach((light, index) => { light.intensity = 8 + Math.sin(prisonTime * 3 + index) * 0.4; });
    prison.updateMatrixWorld();
    renderer.render(prison, prisonCamera);
  }

  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    const key = `${width}/${height}`;
    if (key === lastSize || width <= 0 || height <= 0) return;
    lastSize = key;
    renderer.setSize(width, height, false);
    const aspect = width / height;
    prisonCamera.aspect = aspect;
    prisonCamera.updateProjectionMatrix();
    // Phone framing stays close enough to read the explorer and corridor turns.
    const vertical = aspect < 0.9 ? 5.3 : aspect > 1.6 ? 5 : 5.7;
    camera.left = -vertical * aspect; camera.right = vertical * aspect;
    camera.top = vertical; camera.bottom = -vertical;
    camera.updateProjectionMatrix();
  }

  function render(state, { intro = false, reducedMotion = false, encounters = ENCOUNTERS, interaction = {}, movement = null, guidePath = [], trapEntry = null, answerReaction = null, greeting = null } = {}) {
    resize();
    const insideCell = ['question', 'feedback', 'capture', 'review', 'review-feedback'].includes(state.phase);
    lastView = insideCell && !intro ? 'first-person-cage' : 'maze';
    if (insideCell && !intro) { renderPrison(state, reducedMotion, interaction, trapEntry, answerReaction); return; }
    encounters.forEach((encounter, index) => {
      if (!markerCache.has(encounter.id)) markerCache.set(encounter.id, createRoomMarker(encounter, index));
    });
    const activeIds = new Set(encounters.map(encounter => encounter.id));
    markerCache.forEach(marker => { marker.group.visible = activeIds.has(marker.encounter.id); });
    const time = reducedMotion ? 0 : (state.elapsedMs || 0) / 1000;
    const elapsed = state.elapsedMs || 0;
    const dt = lastWorldElapsed === null ? 0 : Math.min(0.1, Math.max(0, elapsed - lastWorldElapsed) / 1000);
    lastWorldElapsed = elapsed;
    const position = movement && Number.isFinite(movement.x) && Number.isFinite(movement.y) ? movement : state.player || START;
    const distanceMoved = Math.hypot(position.x - lastPhysical.x, position.y - lastPhysical.y);
    const moving = !state.paused && (movement ? !!movement.moving : distanceMoved > 0.001);
    if (distanceMoved > 0.0001 && distanceMoved < 2) {
      gaitDistance += distanceMoved;
      heading = Math.atan2(lastPhysical.x - position.x, lastPhysical.y - position.y);
    }
    if (movement && Number.isFinite(movement.heading)) heading = movement.heading;
    lastPhysical = { x: position.x, y: position.y };
    const target = new THREE.Vector3(position.x, 0, position.y);
    explorer.position.copy(target);
    const angleDelta = Math.atan2(Math.sin(heading - explorer.rotation.y), Math.cos(heading - explorer.rotation.y));
    if (movement || reducedMotion) explorer.rotation.y = heading;
    else explorer.rotation.y += angleDelta * (1 - Math.exp(-14 * dt));
    animateHuman(explorerRig, gaitDistance * Math.PI * 2 / 1.15, moving && !reducedMotion, movement?.speed || 2.4);
    if (state.world?.playerResting && !moving) {
      explorerRig.legs.forEach(leg => { leg.rotation.x = -0.65; });
      explorerRig.knees.forEach(knee => { knee.rotation.x = 1.2; });
      explorer.position.y = -0.1;
    }
    inhabitants.forEach(model => {
      const { entity, group } = model;
      const point = worldEntityPosition(entity, elapsed, state.world);
      const delta = Math.hypot(point.x - model.last.x, point.y - model.last.y);
      if (delta < 2) model.distance += delta;
      model.last = { x: point.x, y: point.y };
      group.position.set(point.x, 0, point.y);
      const greetingHere = !state.paused && greeting?.entityId === entity.id;
      const desiredYaw = greetingHere ? Math.atan2(point.x - position.x, point.y - position.y) : (point.heading || 0) + Math.PI;
      const yawDifference = Math.atan2(Math.sin(desiredYaw - group.rotation.y), Math.cos(desiredYaw - group.rotation.y));
      group.rotation.y += yawDifference * (reducedMotion ? 1 : 1 - Math.exp(-9 * dt));
      if (entity.kind === 'human') {
        animateHuman(model, model.distance * Math.PI * 2 / 1.15, point.moving && !reducedMotion, 1.15);
        model.arms[1].rotation.z = greetingHere ? -1.7 : 0;
        if (greetingHere) model.arms[1].rotation.x = reducedMotion ? -0.3 : -0.3 + Math.sin(time * 9) * 0.18;
        model.marker.rotation.y = time * 0.5;
      } else if (entity.kind === 'fox') {
        const gait = model.distance * Math.PI * 2 / 0.7;
        model.feet.forEach((foot, index) => { foot.rotation.x = point.moving && !reducedMotion ? Math.sin(gait + (index === 0 || index === 3 ? 0 : Math.PI)) * 0.5 : 0; });
        model.tail.rotation.z = reducedMotion ? 0 : Math.sin(time * (greetingHere ? 8 : 2)) * (greetingHere ? 0.3 : 0.12);
        const drinking = state.world?.foxDrinking && !greetingHere;
        model.head.rotation.x = drinking ? 0.45 : 0;
        model.head.position.y = drinking ? 0.23 : 0.3;
        if (drinking) group.rotation.y = -Math.PI / 2;
      } else if (entity.kind === 'rabbit') {
        if (state.world?.rabbitCalm && !point.moving) group.rotation.y = Math.atan2(point.x-position.x,point.y-position.y);
        group.position.y = point.moving && !reducedMotion ? Math.abs(Math.sin(elapsed / 90)) * 0.1 : 0;
        model.head.rotation.x = greetingHere ? -0.12 : state.world?.rabbitCalm ? 0.15 : 0;
        model.ears.forEach((ear, index) => { ear.rotation.z = (index ? 1 : -1) * (greetingHere ? 0.04 : state.world?.rabbitCalm ? 0.32 : 0.12); });
      } else if (entity.kind === 'owl') {
        model.head.rotation.y = greetingHere || state.world?.owlObserved ? Math.atan2(point.x - position.x, point.y - position.y) - group.rotation.y : reducedMotion ? 0 : Math.sin(time * 0.45) * 0.45;
      } else if (entity.kind === 'pump') {
        model.stream.visible = !!state.world?.waterFilled;
        model.drops.forEach((drop, index) => { drop.visible = !!state.world?.waterFilled; drop.position.y = 0.43 - ((time * 0.6 + index * 0.11) % 0.33); });
      }
      else if (entity.kind === 'lamp') {
        model.bulb.material.emissiveIntensity = state.world?.lightsOn ? 1.5 : 0;
        model.light.intensity = state.world?.lightsOn ? 9 : 0;
      }
    });
    bowlWater.visible = !!state.world?.waterFilled;
    const crumbs = guidePath.slice(0, 48);
    breadcrumbs.count = crumbs.length;
    crumbs.forEach((point, index) => {
      matrix.makeRotationX(-Math.PI / 2); matrix.setPosition(point.x, 0.025, point.y); breadcrumbs.setMatrixAt(index, matrix);
    });
    breadcrumbs.instanceMatrix.needsUpdate = true;
    const upgradedLantern=state.rewardPurchases?.includes('lantern');
    explorerRig.lanternLight.intensity=upgradedLantern?6:2;
    explorerRig.lanternLight.distance=upgradedLantern?8:4.5;
    explorerRig.lantern.scale.setScalar(upgradedLantern?1.4:1);
    explorerRig.lantern.material.emissiveIntensity = 1.5 + Math.sin(time * 3) * 0.08;
    halo.position.set(explorer.position.x, 0.017, explorer.position.z);
    halo.visible = state.graceMs > 0 || intro;
    markerCache.forEach(({ group, ring, seal, encounter, index }) => {
      const solved = state.seals?.includes(encounter.id) || state.resolved?.includes?.(encounter.id);
      ring.material = solved ? cyan : purple;
      seal.visible = !solved;
      seal.rotation.y = time * 0.8 + index;
      seal.position.y = 0.45 + Math.sin(time * 2 + index) * 0.05;
      group.visible = activeIds.has(encounter.id);
    });
    creatures.forEach(creature => {
      const { group, index } = creature;
      // Contact is tile-based: render that exact tile, including during reduced
      // motion and frozen question states, so an encounter never looks remote.
      const tile = creaturePosition(creature, state.elapsedMs || 0);
      if (!tile) return;
      const previous = group.userData.tile;
      if (previous && (previous.x !== tile.x || previous.y !== tile.y)) {
        group.rotation.y = Math.atan2(previous.x - tile.x, previous.y - tile.y);
      }
      group.userData.tile = tile;
      group.position.set(tile.x, index ? Math.sin(time * 1.8) * 0.07 : 0, tile.y);
    });
    book.material = state.clues?.includes('route') ? brass : cyan;
    lid.rotation.x = state.treasureCollected ? -0.65 : 0;
    exitPortal.glow.material.opacity = state.seals?.length >= 3 && Object.keys(state.answers || {}).length === state.order?.length ? 0.8 : 0.3;
    const captured = ['capture', 'review', 'review-feedback'].includes(state.phase);
    cage.visible = captured;
    cage.position.set(position.x, 0, position.y);
    if (state.phase === 'capture' && !reducedMotion) cage.position.y = Math.max(0, 1.6 - (state.captureMs ?? 0) / 900);
    const cameraTarget = target.clone();
    cameraTarget.x = THREE.MathUtils.clamp(cameraTarget.x, 2.8, MAZE[0].length - 3.8);
    cameraTarget.z = THREE.MathUtils.clamp(cameraTarget.z, 2.8, MAZE.length - 3.8);
    if (!cameraReady || reducedMotion) { look.copy(cameraTarget); cameraReady = true; }
    else look.lerp(cameraTarget, 1 - Math.exp(-8 * dt));
    camera.position.set(look.x + 3.8, 12, look.z + 7.8);
    camera.lookAt(look.x, 0, look.z);
    scene.updateMatrixWorld();
    renderer.render(scene, camera);
  }

  function cellFromPointer(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    raycaster.setFromCamera(new THREE.Vector2((clientX - rect.left) / rect.width * 2 - 1, -(clientY - rect.top) / rect.height * 2 + 1), camera);
    if (!raycaster.ray.intersectPlane(ground, projected)) return null;
    return { x: Math.round(projected.x), y: Math.round(projected.z) };
  }

  function dispose() {
    for (const resource of resources) resource.dispose();
    renderer.dispose();
  }
  resize();
  return { render, resize, cellFromPointer, dispose, getView: () => lastView };
}
