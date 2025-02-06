export function calculateSimplifiedWaveHeight(x, z, time) {
  const waveFrequency = 0.24;
  const waveAmplitude = 0.26;

  const wave1 = Math.sin(x * waveFrequency + time) * waveAmplitude;
  const wave2 = Math.sin(z * waveFrequency + time * 1.5) * waveAmplitude;

  return wave1 + wave2;
}

export const checkCollision = (scene, forward, left, right, raycasters, boatRef) => {
  const collidableObjects = [];
  scene.traverse((object) => {
    if (
      object.isMesh &&
      (object.name.includes('land') ||
        object.name.includes('Land') ||
        object.parent?.name.includes('land') ||
        object.parent?.name.includes('Land'))
    ) {
      collidableObjects.push(object);
    }
  });

  raycasters.current[0].set(boatRef.current.position, forward);
  raycasters.current[1].set(boatRef.current.position, left);
  raycasters.current[2].set(boatRef.current.position, right);

  let minDistance = Infinity;
  let closestIntersection = null;

  for (let i = 0; i < raycasters.current.length; i++) {
    const intersects = raycasters.current[i].intersectObjects(collidableObjects, false);
    if (intersects.length > 0 && intersects[0].distance < 15) {
      if (intersects[0].distance < minDistance) {
        minDistance = intersects[0].distance;
        closestIntersection = intersects[0];
      }
    }
  }

  return closestIntersection;
};
