// Physical scene position is separate from the game's authoritative tile.
const topSpeed = 2.7;
const acceleration = 12;
const isCell = point => point && Number.isInteger(point.x) && Number.isInteger(point.y);
const sameCell = (a, b) => a.x === b.x && a.y === b.y;

export function createMovement(player) {
  if (!isCell(player)) throw new TypeError('Movement needs an integer player tile');
  return { position: { ...player }, origin: { ...player }, target: null, speed: 0, heading: 0, moving: false, elapsed: 0 };
}

export function syncMovement(movement, player) {
  if (sameCell(movement.origin, player)) return movement;
  return { ...createMovement(player), heading: movement.heading };
}

function destination(movement, options) {
  let target = options.nextCell;
  if (options.direction) {
    const { dx, dy } = options.direction;
    if (!Number.isInteger(dx) || !Number.isInteger(dy) || Math.abs(dx) + Math.abs(dy) !== 1) return null;
    target = { x: movement.origin.x + dx, y: movement.origin.y + dy };
  }
  if (!isCell(target) || Math.abs(target.x - movement.origin.x) + Math.abs(target.y - movement.origin.y) !== 1) return null;
  if (typeof options.canWalk !== 'function' || !options.canWalk(target.x, target.y)) return null;
  return { x: target.x, y: target.y };
}

// Solve the acceleration, cruise and braking phases analytically. Releasing
// very near a center increases braking so no partial-cell stop is possible.
function travel(remaining, initialSpeed, dt, continuing) {
  const brake = Math.max(acceleration, initialSpeed ** 2 / (2 * remaining));
  const peak = continuing ? topSpeed : Math.min(topSpeed, Math.sqrt((2 * remaining + initialSpeed ** 2 / acceleration) / (1 / acceleration + 1 / brake)));
  const accelerateFor = Math.max(0, (peak - initialSpeed) / acceleration);
  const accelerateDistance = (initialSpeed + peak) * accelerateFor / 2;
  const brakeDistance = continuing ? 0 : peak ** 2 / (2 * brake);
  const cruiseFor = Math.max(0, (remaining - accelerateDistance - brakeDistance) / peak);
  const brakeFor = continuing ? 0 : peak / brake;
  if (dt >= accelerateFor + cruiseFor + brakeFor - 1e-10) return { distance: remaining, speed: continuing ? peak : 0, arrived: true };
  let distance = 0, speed = initialSpeed;
  const accelerating = Math.min(dt, accelerateFor);
  distance += initialSpeed * accelerating + acceleration * accelerating ** 2 / 2;
  speed += acceleration * accelerating;
  dt -= accelerating;
  const cruising = Math.min(dt, cruiseFor);
  distance += peak * cruising;
  dt -= cruising;
  if (dt > 0) { distance += peak * dt - brake * dt ** 2 / 2; speed = peak - brake * dt; }
  return { distance, speed, arrived: false };
}

// dt is seconds. At most one arrival is returned: the caller commits that
// tile through core.transition before requesting another segment.
export function advanceMovement(movement, options = {}) {
  const unchanged = { movement, arrived: null };
  if (options.paused || !Number.isFinite(options.dt) || options.dt <= 0) return unchanged;
  const dt = Math.min(options.dt, 0.1);
  const target = movement.target || destination(movement, options);
  if (!target) return movement.speed ? { movement: { ...movement, speed: 0 }, arrived: null } : unchanged;
  const dx = target.x - movement.origin.x, dy = target.y - movement.origin.y;
  const desiredHeading = Math.atan2(-dx, -dy);
  const angle = Math.atan2(Math.sin(desiredHeading - movement.heading), Math.cos(desiredHeading - movement.heading));
  const heading = movement.heading + angle * (1 - Math.exp(-14 * dt));
  const traveled = Math.abs(movement.position.x - movement.origin.x) + Math.abs(movement.position.y - movement.origin.y);
  const sameDirection = !options.direction || (options.direction.dx === dx && options.direction.dy === dy);
  const continuing = options.continuous === true && sameDirection && typeof options.canWalk === 'function' && options.canWalk(target.x + dx, target.y + dy);
  const result = travel(1 - traveled, movement.speed, dt, continuing);
  const distance = Math.min(1, traveled + result.distance);
  if (result.arrived) {
    return {
      movement: { position: { ...target }, origin: { ...target }, target: null, speed: result.speed, heading, moving: false, elapsed: 0 },
      arrived: { ...target, dx, dy },
    };
  }
  return {
    movement: { ...movement, position: { x: movement.origin.x + dx * distance, y: movement.origin.y + dy * distance }, target, speed: result.speed, heading, moving: true, elapsed: movement.elapsed + dt },
    arrived: null,
  };
}
