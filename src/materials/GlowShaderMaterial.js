import * as THREE from 'three';

export const createGlowShaderMaterial = (color, intensity) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(color) },
      glowIntensity: { value: intensity },
      viewVector: { value: new THREE.Vector3() },
    },
    vertexShader: `
      uniform vec3 viewVector;
      varying float intensity;

      void main() {
        vec3 vNormal = normalize(normalMatrix * normal);
        vec3 vNormel = normalize(normalMatrix * viewVector);
        intensity = pow(0.9 - dot(vNormal, vNormel), 3.0);

        vec3 expandedPosition = position + normal * 0.25;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(expandedPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float glowIntensity;
      varying float intensity;

      void main() {
        vec3 glow = glowColor * intensity * glowIntensity * 1.5;
        gl_FragColor = vec4(glow, 1.0);
      }
    `,
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
