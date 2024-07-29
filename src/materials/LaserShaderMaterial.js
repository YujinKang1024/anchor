import * as THREE from 'three';

export const LaserShaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Vector3(0, 1, 1) },
    laserLength: { value: 1.0 },
    time: { value: 0 },
  },
  vertexShader: `
    uniform float laserLength;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.y *= laserLength;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform float time;
    varying vec2 vUv;
    void main() {
      float intensity = 1.0 - pow(abs(vUv.x - 0.5) * 2.0, 2.0);
      intensity *= 1.0 + 0.3 * sin(time * 20.0 + vUv.y * 40.0);
      gl_FragColor = vec4(color * intensity, intensity);
    }
  `,
  transparent: true,
  side: THREE.DoubleSide,
});
