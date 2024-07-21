import * as THREE from 'three';

export default function calculateShadowMatrix(directionalLight, mesh) {
  const shadowMatrix = new THREE.Matrix4().multiplyMatrices(
    directionalLight.shadow.camera.projectionMatrix,
    directionalLight.shadow.camera.matrixWorldInverse,
  );

  const finalShadowMatrix = new THREE.Matrix4().multiplyMatrices(shadowMatrix, mesh.matrixWorld);

  return finalShadowMatrix;
}
