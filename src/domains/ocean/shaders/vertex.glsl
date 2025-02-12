uniform mat4 u_textureMatrix;
uniform float u_time;
uniform float u_waveHeight;
uniform mat4 u_shadowMatrix;
uniform mat4 u_islandTextureMatrix;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec4 vReflectCoord;
varying vec4 vShadowCoord;

float calculateWaveHeight(vec2 pos, float time) {
    float height = 0.0;

    vec2 noiseCoord1 = pos * 0.05 + time * 0.03;
    vec2 noiseCoord2 = pos * 0.1 - time * 0.04;

    height += sin(noiseCoord1.x + noiseCoord1.y) * 0.5;
    height += sin(noiseCoord2.x + noiseCoord2.y) * 0.25;

    return height * u_waveHeight;
}

void main() {
    vUv = uv * 65.0;
    vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;

    float waveHeight = calculateWaveHeight(worldPos.xz, u_time);
    vec3 newPosition = position + normal * waveHeight;

    vWorldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;
    vNormal = normalize(normalMatrix * normal);
    vReflectCoord = u_textureMatrix * vec4(position, 1.0);
    vShadowCoord = u_shadowMatrix * vec4(position, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
