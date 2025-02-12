uniform vec3 u_waterColor;
uniform vec3 u_crestColor;

uniform sampler2D u_reflectionMap;
uniform sampler2D u_aoTexture;
uniform sampler2D u_normalTexture;
uniform sampler2D u_roughnessTexture;
uniform sampler2D u_heightTexture;
uniform mat4 u_textureMatrix;

uniform float u_time;
uniform float u_maxDepth;
uniform float u_minDepth;
uniform float u_fresnelStrength;
uniform float u_reflectionStrength;
uniform float u_waveHeight;

uniform vec3 u_fogColor;
uniform float u_fogNear;
uniform float u_fogFar;

uniform float u_brightness;
uniform float u_contrast;
uniform float u_saturation;

uniform vec3 u_lightPosition;
uniform vec3 u_lightColor;
uniform sampler2D u_shadowMap;
uniform vec3 u_shadowColor;

uniform float u_opacity;
uniform sampler2D u_islandMap;
uniform mat4 u_islandTextureMatrix;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec4 vReflectCoord;
varying float vWaveHeight;
varying vec4 vShadowCoord;

#define PI 3.14159265359

float calculateRippleHeight(vec3 worldPos) {
    vec4 islandCoord = u_islandTextureMatrix * vec4(worldPos, 1.0);
    float wSafe = max(islandCoord.w, 0.0001);
    vec2 uv = islandCoord.xy / wSafe;

    const float border = 1.2;
    if (uv.x < -border || uv.x > 1.0 + border || uv.y < -border || uv.y > 1.0 + border) {
        return 0.0;
    }

    vec2 uvClamped = clamp(uv, 0.0, 1.0);
    float islandMask = texture2D(u_islandMap, uvClamped).r;

    const float sampleDist = 0.012;
    const int samples = 8;
    float edge = 0.0;
    float totalWeight = 0.0;

    for (int i = 0; i < samples; i++) {
        float angle = float(i) * 6.28318 / float(samples);
        vec2 offset = vec2(cos(angle), sin(angle)) * sampleDist;
        vec2 sampleUV = clamp(uv + offset, 0.0, 1.0);

        float weight = exp(-length(offset) * length(offset) * 200.0);
        float neighborMask = texture2D(u_islandMap, sampleUV).r;
        edge += abs(islandMask - neighborMask) * weight;
        totalWeight += weight;
    }

    edge = edge / max(totalWeight, 0.001);
    edge = smoothstep(0.01, 0.06, edge);

    float t = u_time * 0.6;
    float wave = sin(edge * 8.0 - t) * 0.5 + 0.5;
    wave = smoothstep(0.2, 0.8, wave);

    float dist = length((uvClamped - vec2(0.5)) * 2.0);
    float falloff = smoothstep(0.8, 0.0, dist);

    return edge * wave * falloff * 0.03;
}

float getShadow(vec4 shadowCoord) {
  vec3 shadowCoordProj = shadowCoord.xyz / shadowCoord.w;
  shadowCoordProj = shadowCoordProj * 0.5 + 0.5;
  float currentDepth = shadowCoordProj.z;

  float shadow = 0.0;
  float bias = 0.005;
  float samples = 9.0;
  float offset = 1.0 / 4096.0;
  for(float y = -4.0; y <= 4.0; y += 1.0) {
      for(float x = -4.0; x <= 4.0; x += 1.0) {
          float pcfDepth = texture2D(u_shadowMap, shadowCoordProj.xy + vec2(x, y) * offset).r;
          shadow += currentDepth - bias > pcfDepth ? 0.8 : 0.0;
    }
  }
  shadow /= (samples * samples);

  float depthFactor = smoothstep(u_minDepth, u_maxDepth, length(vWorldPosition - cameraPosition));
  shadow = mix(shadow, 0.0, depthFactor * 0.5);

  return 1.0 - shadow;
}

float gaussianWeight(float x, float sigma) {
  return (1.0 / (sqrt(2.0 * PI) * sigma)) * exp(-((x * x) / (2.0 * (sigma * sigma))));
}

float blurShadow(vec4 shadowCoord) {
  vec3 shadowCoordProj = shadowCoord.xyz / shadowCoord.w;
  shadowCoordProj = shadowCoordProj * 0.5 + 0.5;
  float currentDepth = shadowCoordProj.z;

  float shadow = 0.0;
  float bias = 0.01;
  float blurRadius = 2.0;
  float sigma = blurRadius / 2.0;
  float weightSum = 0.0;

  for(float y = -blurRadius; y <= blurRadius; y += 1.0) {
    for(float x = -blurRadius; x <= blurRadius; x += 1.0) {
        float weight = gaussianWeight(length(vec2(x, y)), sigma);
        float pcfDepth = texture2D(u_shadowMap, shadowCoordProj.xy + vec2(x, y) / 2048.0).r;
        shadow += weight * (currentDepth - bias > pcfDepth ? 0.0 : 1.0);
        weightSum += weight;
    }
  }
  return shadow / weightSum;
}

vec3 adjustColor(vec3 color, float u_brightness, float u_contrast, float u_saturation) {
    color *= u_brightness;
    color = (color - 0.5) * u_contrast + 0.5;
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));

    color = mix(vec3(luminance), color, u_saturation);

    return clamp(color, 0.0, 1.0);
}

// 노이즈 함수
vec2 hash(vec2 p) {
    p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec2 p ) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;

    vec2 i = floor( p + (p.x+p.y)*K1 );
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0*K2;

    vec3 h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );

    vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));

    return dot( n, vec3(70.0) );
}

float cascadedNoise(vec2 uv, float u_time) {
  float noise1 = noise(uv * 1.0 + u_time * 0.1) * 0.5;
  float noise2 = noise(uv * 2.0 + u_time * 0.2) * 0.25;
  float noise3 = noise(uv * 4.0 + u_time * 0.3) * 0.125;
  return noise1 + noise2 + noise3;
}

float calculateRippleEffect(vec3 worldPos) {
    vec4 islandCoord = u_islandTextureMatrix * vec4(worldPos, 1.0);
    vec2 uv = islandCoord.xy / islandCoord.w;

    const float border = 0.008;
    if(uv.x < -border || uv.x > 1.0 + border || uv.y < -border || uv.y > 1.0 + border) {
        return 0.0;
    }

    vec2 uvClamped = clamp(uv, 0.0, 1.0);
    float islandMask = texture2D(u_islandMap, uvClamped).r;

    const int edgeSamples = 12;
    const float maxSearchDist = 0.003;
    const float searchStep = maxSearchDist / float(edgeSamples);

    float edge = 0.0;
    float edgeDist = maxSearchDist;

    for(int dir = 0; dir < 8; dir++) {
        float angle = float(dir) * PI * 0.25;
        vec2 rayDir = vec2(cos(angle), sin(angle));

        float localEdgeDist = maxSearchDist;
        float prevMask = islandMask;

        for(int i = 1; i <= edgeSamples; i++) {
            float dist = float(i) * searchStep;
            vec2 sampleUV = uvClamped + rayDir * dist;
            float mask = texture2D(u_islandMap, sampleUV).r;

            if(abs(mask - prevMask) > 0.1) {
                localEdgeDist = dist;
                edge += 1.0;
                break;
            }
            prevMask = mask;
        }
        edgeDist = min(edgeDist, localEdgeDist);
    }

    edge = edge / 8.0;
    edge = smoothstep(0.0, 0.5, edge);

    if(edge > 0.0) {
        // 링 생성
        const float expandSpeed = 0.12;
        const float ringThickness = 0.001;
        const float ringCount = 3.0;
        float rings = 0.0;

        for(float i = 0.0; i < ringCount; i++) {
            float timeOffset = i / ringCount;
            float t = fract(u_time * expandSpeed + timeOffset);

            // 거리에 따른 링 생성
            float expandRadius = t * maxSearchDist * 5.0;
            float ringDistance = abs(edgeDist - expandRadius);

            // 링의 강도 계산
            float ringIntensity = smoothstep(ringThickness, 0.0, ringDistance);
            float fadeOut = smoothstep(1.0, 0.0, t);

            rings += ringIntensity * fadeOut;
        }

        float wave = sin(edgeDist * 20.0 - u_time * 3.0) * 0.5;
        float falloff = smoothstep(maxSearchDist * 4.0, 0.0, edgeDist);

        return (rings * 1.5 + wave) * edge * falloff;
    }
    return 0.0;
}

void main() {
  vec3 viewDirection = normalize(cameraPosition - vWorldPosition);

  vec2 distortedUV = vUv + vec2(
    cascadedNoise(vUv, u_time * 0.7) * 0.2,
    cascadedNoise(vUv + vec2(5.0), u_time* 0.7) * 0.2
  );

  vec4 reflectCoord = vReflectCoord;
  reflectCoord.xy /= reflectCoord.w;
  vec2 reflectUv = reflectCoord.xy * 0.5 + 0.5;

  vec2 reflectUV = vReflectCoord.xy / vReflectCoord.w;
    reflectUV += vec2(
    noise(reflectUV * 5.0 + u_time * 0.05) * 0.003,
    noise(reflectUV * 5.0 + u_time * 0.05 + 5.0) * 0.003
  );

  vec3 reflection = texture2D(u_reflectionMap, reflectUV).rgb;
  vec3 ao = texture2D(u_aoTexture, distortedUV).rgb;

  vec2 uvTimeShifted = vUv + vec2(u_time * 0.8, u_time * 0.8);

  vec2 normalUV = distortedUV + vec2(
    sin(u_time * 0.1) * 0.01,
    cos(u_time * 0.15) * 0.01
  );

  vec3 normal = texture2D(u_normalTexture, normalUV).rgb * 2.0 - 1.0;
  normal = normalize(normal * vec3(1.5, 1.5, 2.0));

  float roughness = texture2D(u_roughnessTexture, distortedUV).r;
  float height = texture2D(u_heightTexture, distortedUV).r;

  float heightSample = texture2D(u_heightTexture, distortedUV + vec2(u_time * 0.03, u_time * 0.02)).r;
  vec3 waterNormal = normalize(vNormal + normal * 0.5 + vec3(0.0, 0.0, heightSample * 0.2));

  float fresnelFactor = pow(1.0 - dot(viewDirection, waterNormal), u_fresnelStrength);
  fresnelFactor *= u_reflectionStrength;

  vec3 finalColor = mix(u_waterColor * 1.4, reflection, fresnelFactor * 0.7);
  finalColor *= ao;

  float rippleEffect = calculateRippleEffect(vWorldPosition);

  if(rippleEffect > 0.0) {
      vec3 foamBase = mix(u_waterColor * 0.7, vec3(1.0), 0.05);
      vec3 foamColor = mix(foamBase, vec3(0.95), rippleEffect * 0.8);

      float timeVar = sin(u_time * 0.8) * 0.3 + 0.5; // 시간에 따른 변화 감소
      float foamIntensity = smoothstep(0.0, 0.5, rippleEffect) * (0.6 + 0.2 * timeVar);

      float ripplePattern = sin(vWorldPosition.x * 12.0 + vWorldPosition.z * 12.0 + u_time * 2.0);
      ripplePattern = smoothstep(-0.3, 0.3, ripplePattern);
      foamIntensity *= (0.7 + ripplePattern * 0.15);

      finalColor = mix(finalColor, foamColor, foamIntensity * 0.15);

      float highlight = smoothstep(0.2, 0.8, rippleEffect) * timeVar;
      finalColor += vec3(1.0) * highlight * 0.5;
  }

  float shadow = getShadow(vShadowCoord);
  float blurred = blurShadow(vShadowCoord);
  float finalShadow = mix(shadow, blurred, 0.0001);
  vec3 shadowColor = mix(u_shadowColor, vec3(1.0), finalShadow);

  float shadowStrength = rippleEffect > 0.0 ? 0.6 : 1.3;
  finalColor = mix(finalColor, finalColor * shadowColor, shadowStrength);

  float depthEffectStrength = rippleEffect > 0.0 ? 0.3 : 1.0;

  // 물 깊이에 따른 색상 변화
  float sceneDepth = gl_FragCoord.z / gl_FragCoord.w;
  float sceneDepthFactor = smoothstep(0.0, 10.0, sceneDepth);
  vec3 shallowColor = vec3(0.5, 0.9, 0.9);
  vec3 deepColor = vec3(0.6, 0.2, 0.9);
  vec3 depthColor = mix(shallowColor, deepColor, sceneDepthFactor);

  float sceneWaterDepth = 1.0 - exp(-sceneDepth * 0.055);
  finalColor = mix(finalColor, mix(depthColor * 6.0, finalColor, sceneWaterDepth), depthEffectStrength);

  // 안개 효과도 잔물결 영역에서 약화
  float fogStrength = rippleEffect > 0.0 ? 0.3 : 1.0;
  float fogFactor = smoothstep(u_fogNear, u_fogFar, length(cameraPosition - vWorldPosition));
  finalColor = mix(finalColor, u_fogColor, fogFactor * fogStrength);

  // 시점 깊이 계산
  float viewDepth = length(vWorldPosition - cameraPosition);
  float viewDepthFactor = smoothstep(u_minDepth, u_maxDepth, viewDepth);

  // 잔물결 영역의 알파값 증가
  float alpha = mix(0.65, 0.85, viewDepthFactor);
  alpha = rippleEffect > 0.0 ? min(alpha + rippleEffect * 0.15, 0.95) : alpha;

  finalColor = adjustColor(finalColor, u_brightness, u_contrast, u_saturation);

  gl_FragColor = vec4(finalColor, alpha);
}