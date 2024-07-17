import * as THREE from 'three';

export default function initializeBoatPosition(
  boatRef,
  pathPoints,
  initialBoatPositionY,
  interpolationFactor,
) {
  if (boatRef.current && pathPoints.length > 0) {
    const initialPoint = pathPoints[0];
    const initialNextPoint = pathPoints[pathPoints.length - 1];
    const initialBoatPosition = new THREE.Vector3().lerpVectors(
      initialPoint,
      initialNextPoint,
      interpolationFactor,
    );
    boatRef.current.position.set(
      initialBoatPosition.x,
      initialBoatPositionY,
      initialBoatPosition.y,
    );
  }
}
