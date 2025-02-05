uniform mat4 u_textureMatrix;
uniform mat4 u_shadowMatrix;
uniform float u_time;
uniform float u_waveHeight;
uniform float u_waveSpeed;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec4 vReflectCoord;
varying float vWaveHeight;
varying vec4 vShadowCoord;

float waveNoise(vec2 p) {
  return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float calculateWaveHeight(vec2 position, float u_time) {
  float height = 0.0;
  vec2 pos = position * 0.1;

  height += sin(pos.x * 1.8 + u_time * 1.2) * 0.15;
  height += sin(pos.y * 2.2 + u_time * 0.8) * 0.12;
  height += sin(pos.x * 0.9 + pos.y * 1.3 + u_time * 1.5) * 0.1;

  height += sin(pos.x * 5.0 + u_time * 2.0) * 0.05;
  height += sin(pos.y * 4.5 + u_time * 2.2) * 0.04;

  return height * u_waveHeight;
}

void main() {
  vUv = uv * 65.0;

  float height = calculateWaveHeight(position.xz, u_time);
  vec3 displacedPosition = position + normal * height;

  vWorldPosition = (modelMatrix * vec4(displacedPosition, 1.0)).xyz;
  vNormal = normalize(normalMatrix * normal);
  vReflectCoord = u_textureMatrix * vec4(position, 1.0);
  vWaveHeight = height;

  vShadowCoord = u_shadowMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}
