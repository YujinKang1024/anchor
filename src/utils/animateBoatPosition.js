import * as THREE from 'three';

export default function animateBoatPosition(
  startPoint,
  endPoint,
  boatRef,
  initialBoatPositionY,
  callback,
) {
  const startPosition = new THREE.Vector3(startPoint.x, initialBoatPositionY, startPoint.y);
  const endPosition = new THREE.Vector3(endPoint.x, initialBoatPositionY, endPoint.y);
  const duration = 1000;

  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const animationProgress = Math.min(progress / duration, 1);
    const smoothStep = animationProgress * animationProgress * (3 - 2 * animationProgress);
    const newPosition = startPosition.clone().lerp(endPosition, smoothStep);

    if (boatRef.current) {
      boatRef.current.position.set(newPosition.x, initialBoatPositionY, newPosition.z);
    }

    if (animationProgress < 1) {
      requestAnimationFrame(step);
    } else if (callback) {
      callback();
    }
  }

  requestAnimationFrame(step);
}
