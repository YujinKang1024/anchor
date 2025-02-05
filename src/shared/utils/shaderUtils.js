import * as THREE from 'three';

import glowVertexShader from '@/shared/shaders/glow/vertex.glsl?raw';
import glowFragmentShader from '@/shared/shaders/glow/fragment.glsl?raw';

import laserVertexShader from '@/shared/shaders/laser/vertex.glsl?raw';
import laserFragmentShader from '@/shared/shaders/laser/fragment.glsl?raw';

export const createGlowShaderMaterial = (color, intensity) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(color) },
      glowIntensity: { value: intensity },
      viewVector: { value: new THREE.Vector3() },
    },
    vertexShader: glowVertexShader,
    fragmentShader: glowFragmentShader,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
};

export const createGlowMesh = (originalMesh, color, intensity) => {
  const glowMaterial = createGlowShaderMaterial(color, intensity);
  const glowMesh = new THREE.Mesh(originalMesh.geometry, glowMaterial);

  glowMesh.position.copy(originalMesh.position);
  glowMesh.rotation.copy(originalMesh.rotation);
  glowMesh.scale.copy(originalMesh.scale);
  glowMesh.renderOrder = originalMesh.renderOrder - 1;

  return glowMesh;
};

export const createLaserShaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Vector3(0, 1, 1) },
    laserLength: { value: 1.0 },
    time: { value: 0 },
  },
  vertexShader: laserVertexShader,
  fragmentShader: laserFragmentShader,
  transparent: true,
  side: THREE.DoubleSide,
});
