import * as THREE from 'three';
import { MAZE, ENCOUNTERS, CREATURES, START, EXIT, CLUE, TREASURE, creaturePosition } from './core.js';

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
  let previousPlayer = { ...START };
  let heading = 0;
  let lastView = 'maze';
  const material = (color, options = {}) => {
    const result = new THREE.MeshStandardMaterial({ color, roughness: 0.9, ...options });
    resources.add(result); return result;
  };
  const stone = material('#34515a');
  const capStone = material('#405c65');
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
  instance(box(0.98, 0.14, 0.98), floorStone, floorCells, -0.08);
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

  const explorer = new THREE.Group(); scene.add(explorer);
  const coat = material('#e6b268');
  const skin = material('#dfb99a');
  const legs = material('#243348');
  const body = mesh(geometry(new THREE.CylinderGeometry(0.13, 0.18, 0.32, 8)), coat, explorer, 0, 0.4, 0);
  const head = mesh(sphere(0.14), skin, explorer, 0, 0.7, 0);
  mesh(geometry(new THREE.CylinderGeometry(0.15, 0.19, 0.09, 10)), ink, explorer, 0, 0.8, 0);
  mesh(box(0.29, 0.15, 0.1), material('#775c4a'), explorer, 0, 0.43, 0.14);
  const leftLeg = mesh(box(0.09, 0.22, 0.1), legs, explorer, -0.08, 0.15, 0);
  const rightLeg = mesh(box(0.09, 0.22, 0.1), legs, explorer, 0.08, 0.15, 0);
  mesh(box(0.08, 0.22, 0.08), coat, explorer, -0.21, 0.39, 0);
  mesh(box(0.08, 0.2, 0.08), coat, explorer, 0.21, 0.39, -0.07);
  const lantern = mesh(box(0.11, 0.15, 0.11), amber, explorer, 0.22, 0.25, -0.13);
  mesh(geometry(new THREE.TorusGeometry(0.06, 0.014, 4, 10)), brass, explorer, 0.22, 0.36, -0.13);
  const lanternLight = new THREE.PointLight('#ffc271', 6, 5, 2); lanternLight.position.set(0.22, 0.5, -0.13); explorer.add(lanternLight);
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
    mesh(sphere(0.19), ink, group, 0, 0.73, 0);
    for (const x of [-0.065, 0.065]) mesh(sphere(0.028), cyan, group, x, 0.76, -0.17);
    for (const side of [-1, 1]) {
      const arm = mesh(box(0.14, 0.4, 0.14), cloak, group, side * 0.29, 0.55, 0); arm.rotation.z = side * 0.55;
    }
    return group;
  }
  const creatures = CREATURES.map((creature, index) => {
    const group = index === 0 ? spider() : wraith(); scene.add(group); return { ...creature, group, index };
  });

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
    const horn = mesh(geometry(new THREE.ConeGeometry(0.07, 0.24, 5)), purple, cellWarden, side * 0.14, 0.93, 0);
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

  function renderPrison(state, reducedMotion, interaction) {
    if (!state.paused) prisonTime = reducedMotion ? 0 : ((state.elapsedMs || 0) + (state.captureMs || 0)) / 1000;
    const yaw = THREE.MathUtils.clamp(Number(interaction.lookYaw) || 0, -0.3, 0.3);
    prisonCamera.lookAt(-Math.sin(yaw) * 4.5, 1.24, -2.8);
    const raised = !!interaction.lanternRaised;
    hand.position.y = raised ? 1.05 : 0.85;
    handLight.position.y = raised ? 1.25 : 0.95;
    handLight.intensity = raised ? 4 : 2;
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
    gate.rotation.y = unlocked ? -0.28 : 0;
    lock.visible = !unlocked;
    cellWarden.position.y = reducedMotion ? 0 : Math.sin(prisonTime * 1.5) * 0.025;
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

  function render(state, { intro = false, reducedMotion = false, encounters = ENCOUNTERS, interaction = {} } = {}) {
    resize();
    const insideCell = ['question', 'feedback', 'capture', 'review', 'review-feedback'].includes(state.phase);
    lastView = insideCell && !intro ? 'first-person-cage' : 'maze';
    if (insideCell && !intro) { renderPrison(state, reducedMotion, interaction); return; }
    encounters.forEach((encounter, index) => {
      if (!markerCache.has(encounter.id)) markerCache.set(encounter.id, createRoomMarker(encounter, index));
    });
    const activeIds = new Set(encounters.map(encounter => encounter.id));
    markerCache.forEach(marker => { marker.group.visible = activeIds.has(marker.encounter.id); });
    const time = reducedMotion ? 0 : (state.elapsedMs || 0) / 1000;
    const position = state.player || START;
    if (position.x !== previousPlayer.x || position.y !== previousPlayer.y) {
      heading = Math.atan2(previousPlayer.x - position.x, previousPlayer.y - position.y);
      previousPlayer = { ...position };
    }
    const target = new THREE.Vector3(position.x, 0, position.y);
    if (reducedMotion || explorer.position.distanceTo(target) > 3) explorer.position.copy(target);
    else explorer.position.lerp(target, 0.3);
    explorer.rotation.y = heading;
    const moving = explorer.position.distanceTo(target) > 0.025;
    const stride = moving && !reducedMotion ? Math.sin(time * 15) * 0.35 : 0;
    leftLeg.rotation.x = stride; rightLeg.rotation.x = -stride;
    body.position.y = 0.4 + (moving ? Math.abs(stride) * 0.025 : 0);
    head.position.y = 0.7;
    lantern.material.emissiveIntensity = 1.5 + Math.sin(time * 3) * 0.12;
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
    look.lerp(cameraTarget, reducedMotion ? 1 : 0.15);
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
