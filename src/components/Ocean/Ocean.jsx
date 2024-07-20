import { useRef, useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import oceanPlaneUri from '../../assets/models/oceanPlane.glb';

import baseColorTextureUrl from '../../assets/textures/water-color.jpg';
import normalTextureUrl from '../../assets/textures/water-normal.png';
import heightTextureUrl from '../../assets/textures/water-height.png';
import roughnessTextureUrl from '../../assets/textures/water-roughness.jpg';
import aoTextureUrl from '../../assets/textures/water-ao.jpg';

import { OCEAN_CONSTANTS } from '../../constants/constants';

const vertexShader = `
  uniform mat4 u_textureMatrix;
  uniform float u_time;

  uniform float u_waveHeight;
  uniform float u_waveSpeed;

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying vec4 vReflectCoord;
  varying float vWaveHeight;

  float calculateWaveHeight(vec2 position, float u_time) {
    float frequency1 = 0.03;
    float frequency2 = 0.1;
    float frequency3 = 0.15;
    float amplitude1 = 0.3 * u_waveHeight;
    float amplitude2 = 0.2 * u_waveHeight;
    float amplitude3 = 0.1 * u_waveHeight;

    float wave1 = sin(position.x * frequency1 + u_time * u_waveSpeed) * amplitude1;
    float wave2 = cos(position.y * frequency2 + u_time * u_waveSpeed * 0.8) * amplitude2;
    float wave3 = sin((position.x + position.y) * frequency3 + u_time * u_waveSpeed * 1.2) * amplitude3;

    return wave1 + wave2 + wave3;
  }

  void main() {
    vUv = uv * 48.0;

    float height = calculateWaveHeight(position.xz, u_time);
    vec3 displacedPosition = position + normal * height;

    vWorldPosition = (modelMatrix * vec4(displacedPosition, 1.0)).xyz;
    vNormal = normalize(normalMatrix * normal);
    vReflectCoord = u_textureMatrix * vec4(position, 1.0);
    vWaveHeight = height;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 u_waterColor;
  uniform vec3 u_crestColor;
  uniform float u_fresnelStrength;
  uniform float u_reflectionStrength;
  uniform float u_waveHeight;

  uniform sampler2D u_reflectionMap;
  uniform sampler2D u_baseColorTexture;
  uniform sampler2D u_aoTexture;
  uniform sampler2D u_normalTexture;
  uniform sampler2D u_roughnessTexture;
  uniform sampler2D u_heightTexture;
  uniform mat4 u_textureMatrix;

  uniform float u_time;

  uniform vec3 u_fogColor;
  uniform float u_fogNear;
  uniform float u_fogFar;

  uniform float u_brightness;
  uniform float u_contrast;
  uniform float u_saturation;

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying vec4 vReflectCoord;
  varying float vWaveHeight;

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

  void main() {
    vec4 reflectCoord = vReflectCoord;
    reflectCoord.xy /= reflectCoord.w;
    vec2 reflectUv = reflectCoord.xy * 0.5 + 0.5;

    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);

    vec2 uvTimeShifted = vUv + vec2(u_time * 0.8, u_time * 0.8);

    vec2 distortedUV = vUv + vec2(
        cascadedNoise(vUv, u_time) * 0.02,
        cascadedNoise(vUv + vec2(5.0), u_time) * 0.02
    );

    vec2 reflectUV = vReflectCoord.xy / vReflectCoord.w;
      reflectUV += vec2(
      noise(reflectUV * 5.0 + u_time * 0.05) * 0.008,
      noise(reflectUV * 5.0 + u_time * 0.05 + 5.0) * 0.008
    );
    vec3 reflection = texture2D(u_reflectionMap, reflectUV).rgb;
    vec3 baseColor = texture2D(u_baseColorTexture, distortedUV).rgb;
    vec3 ao = texture2D(u_aoTexture, distortedUV).rgb;

    vec2 normalUV = distortedUV + vec2(u_time * 0.05, u_time * 0.03);
    vec3 normal = texture2D(u_normalTexture, normalUV).rgb * 2.0 - 1.0;
    normal = normalize(normal * vec3(1.0, 1.0, 2.0));

    float roughness = texture2D(u_roughnessTexture, distortedUV).r;
    float height = texture2D(u_heightTexture, distortedUV).r;

    float heightSample = texture2D(u_heightTexture, distortedUV + vec2(u_time * 0.03, u_time * 0.02)).r;
    vec3 waterNormal = normalize(vNormal + normal * 0.5 + vec3(0.0, 0.0, heightSample * 0.2));

    float fresnelFactor = pow(1.0 - dot(viewDirection, waterNormal), u_fresnelStrength);
    fresnelFactor *= u_reflectionStrength;

    vec3 finalColor = mix(u_waterColor, reflection, fresnelFactor);

    finalColor = mix(finalColor, baseColor, 0.6);
    finalColor *= ao;

    // 깊이에 따른 색상 변화
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    vec3 shallowColor = vec3(0.0, 0.5, 0.8);
    vec3 deepColor = vec3(0.0, 0.2, 0.4);
    float depthFactor = smoothstep(0.0, 20.0, depth);
    vec3 depthColor = mix(shallowColor, deepColor, depthFactor);

    float waterDepth = 1.0 - exp(-depth * 0.02);
    finalColor = mix(depthColor, finalColor, waterDepth);

    // 파도 크레스트 효과
    float waveHeight = vWaveHeight;
    float crestFactor = smoothstep(0.36 * u_waveHeight, u_waveHeight, abs(waveHeight));
    finalColor = mix(finalColor, u_crestColor, crestFactor);

    // 파도 높이에 따른 색상 변화
    vec3 deepWaterColor = vec3(0.0, 0.1, 0.2);
    vec3 shallowWaterColor = vec3(0.0, 0.5, 0.8);
    float waterColorFactor = smoothstep(-15.0, 15.0, waveHeight);
    vec3 heightBasedColor = mix(deepWaterColor, shallowWaterColor, waterColorFactor);
    finalColor = mix(finalColor, heightBasedColor, 0.3);

    // 하이라이트 추가
    vec3 sunDirection = normalize(vec3(0.5, 0.8, 0.3));
    float sunReflection = pow(max(0.0, dot(reflect(-viewDirection, waterNormal), sunDirection)), 64.0);
    float sunStrength = 0.2;
    vec3 sunColor = vec3(1.0, 0.9, 0.7);
    finalColor += sunColor * sunReflection * sunStrength;

    // 추가적인 스페큘러 하이라이트
    float specularStrength = 0.1;
    vec3 halfwayDir = normalize(sunDirection + viewDirection);
    float spec = pow(max(dot(waterNormal, halfwayDir), 0.0), 32.0);
    finalColor += sunColor * spec * specularStrength;

    // 낮은 휘도 영역에 대한 색상 보정
    float luminance = dot(finalColor, vec3(0.299, 0.587, 0.114));
    float threshold = 0.26;
    float boost = 3.0;
    if (luminance < threshold) {
        float factor = (threshold - luminance) / threshold;
        finalColor += vec3(0.4, 0.5, 0.6) * boost * factor;
    }

    float fogFactor = smoothstep(u_fogNear, u_fogFar, length(cameraPosition - vWorldPosition));
    finalColor = mix(finalColor, u_fogColor, fogFactor);

    finalColor = adjustColor(finalColor, u_brightness, u_contrast, u_saturation);

    gl_FragColor = vec4(finalColor, 0.9);
  }
`;

export default function Ocean() {
  const { nodes } = useGLTF(oceanPlaneUri);
  const meshRef = useRef();
  const reflectionCameraRef = useRef();
  const { gl, scene, camera, size } = useThree();

  const baseColorTexture = useLoader(THREE.TextureLoader, baseColorTextureUrl);
  const aoTexture = useLoader(THREE.TextureLoader, aoTextureUrl);
  const normalTexture = useLoader(THREE.TextureLoader, normalTextureUrl);
  const roughnessTexture = useLoader(THREE.TextureLoader, roughnessTextureUrl);
  const heightTexture = useLoader(THREE.TextureLoader, heightTextureUrl);

  baseColorTexture.wrapS = baseColorTexture.wrapT = THREE.RepeatWrapping;
  aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping;
  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;
  heightTexture.wrapS = heightTexture.wrapT = THREE.RepeatWrapping;

  const reflectionRenderTarget = useMemo(
    () =>
      new THREE.WebGLRenderTarget(size.width * 1.3, size.height * 1.3, {
        encoding: THREE.sRGBEncoding,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
      }),
    [size],
  );

  const textureMatrix = useMemo(() => new THREE.Matrix4(), []);

  useEffect(() => {
    reflectionCameraRef.current = camera.clone();
    reflectionCameraRef.current.layers.enableAll();
  }, [camera]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          u_reflectionMap: { value: reflectionRenderTarget.texture },
          u_time: { value: 0 },
          u_textureMatrix: { value: new THREE.Matrix4() },
          u_baseColorTexture: { value: baseColorTexture },
          u_aoTexture: { value: aoTexture },
          u_normalTexture: { value: normalTexture },
          u_roughnessTexture: { value: roughnessTexture },
          u_heightTexture: { value: heightTexture },
          u_fogColor: { value: OCEAN_CONSTANTS.FOG_COLOR },
          u_fogNear: { value: OCEAN_CONSTANTS.FOG_NEAR },
          u_fogFar: { value: OCEAN_CONSTANTS.FOG_FAR },
          u_brightness: { value: OCEAN_CONSTANTS.BRIGHTNESS },
          u_contrast: { value: OCEAN_CONSTANTS.CONTRAST },
          u_saturation: { value: OCEAN_CONSTANTS.SATURATION },
          u_waveHeight: { value: OCEAN_CONSTANTS.WAVE_HEIGHT },
          u_waveSpeed: { value: OCEAN_CONSTANTS.WAVE_SPEED },
          u_fresnelStrength: { value: OCEAN_CONSTANTS.FRESNEL_STRENGTH },
          u_reflectionStrength: { value: OCEAN_CONSTANTS.REFLECTION_STRENGTH },
          u_waterColor: { value: OCEAN_CONSTANTS.WATER_COLOR },
          u_crestColor: { value: OCEAN_CONSTANTS.CREST_COLOR },
        },
        transparent: true,
      });
    }
  }, [
    reflectionRenderTarget,
    size,
    baseColorTexture,
    aoTexture,
    normalTexture,
    roughnessTexture,
    heightTexture,
  ]);

  useFrame((state) => {
    if (!meshRef.current || !reflectionCameraRef.current) return;

    const waterPosition = new THREE.Vector3();
    meshRef.current.getWorldPosition(waterPosition);

    reflectionCameraRef.current.position.set(
      camera.position.x,
      -camera.position.y + 2 * waterPosition.y,
      camera.position.z,
    );

    reflectionCameraRef.current.rotation.set(
      -camera.rotation.x,
      camera.rotation.y,
      camera.rotation.z,
    );

    reflectionCameraRef.current.fov = camera.fov * 1.8;
    reflectionCameraRef.current.updateProjectionMatrix();

    const currentBackground = scene.background;
    const currentFog = scene.fog;
    scene.background = null;
    scene.fog = null;

    meshRef.current.visible = false;

    const currentRenderTarget = gl.getRenderTarget();
    gl.setRenderTarget(reflectionRenderTarget);
    gl.clear();
    gl.render(scene, reflectionCameraRef.current);
    gl.setRenderTarget(currentRenderTarget);

    meshRef.current.visible = true;
    scene.background = currentBackground;
    scene.fog = currentFog;

    if (meshRef.current.material) {
      const elapsedTime = state.clock.getElapsedTime();

      meshRef.current.material.uniforms.u_reflectionMap.value = reflectionRenderTarget.texture;
      meshRef.current.material.uniforms.u_textureMatrix.value = textureMatrix;
      meshRef.current.material.uniforms.u_time.value = elapsedTime * 0.5;
    }

    const clipBias = 0.00001;
    reflectionCameraRef.current.projectionMatrix.elements[10] -= clipBias;

    textureMatrix.set(
      0.5,
      0.0,
      0.0,
      0.5,
      0.0,
      0.5,
      0.0,
      0.5,
      0.0,
      0.0,
      0.5,
      0.5,
      0.0,
      0.0,
      0.0,
      1.0,
    );

    textureMatrix.multiply(reflectionCameraRef.current.projectionMatrix);
    textureMatrix.multiply(reflectionCameraRef.current.matrixWorldInverse);
    textureMatrix.multiply(meshRef.current.matrixWorld);

    if (meshRef.current.material) {
      const elapsedTime = state.clock.getElapsedTime();

      meshRef.current.material.uniforms.u_reflectionMap.value = reflectionRenderTarget.texture;
      meshRef.current.material.uniforms.u_textureMatrix.value = textureMatrix;
      meshRef.current.material.uniforms.u_time.value = elapsedTime;
    }
  });

  return (
    <group position={[0, -507, 0]}>
      <primitive ref={meshRef} object={nodes.oceanPlane} />
    </group>
  );
}
