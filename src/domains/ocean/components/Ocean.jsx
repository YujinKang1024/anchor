import { useRef, useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import oceanPlaneUrl from '@/assets/models/oceanPlane.glb';
import normalTextureUrl from '@/assets/textures/water-normal.png';
import heightTextureUrl from '@/assets/textures/water-height.png';
import roughnessTextureUrl from '@/assets/textures/water-roughness.jpg';
import aoTextureUrl from '@/assets/textures/water-ao.jpg';

import { LIGHT_POSITION, DIRECTIONAL_LIGHT_COLOR } from '@/shared/constants';
import { OCEAN_CONSTANTS } from '@/domains/ocean/constants/ocean';

import vertexShader from '@/domains/ocean/shaders/vertex.glsl?raw';
import fragmentShader from '@/domains/ocean/shaders/fragment.glsl?raw';

export const Ocean = ({ directionalLightRef }) => {
  const { nodes } = useGLTF(oceanPlaneUrl);
  const { gl, scene, camera, size } = useThree();

  const meshRef = useRef();
  const reflectionCameraRef = useRef();

  const aoTexture = useLoader(THREE.TextureLoader, aoTextureUrl);
  const normalTexture = useLoader(THREE.TextureLoader, normalTextureUrl);
  const roughnessTexture = useLoader(THREE.TextureLoader, roughnessTextureUrl);
  const heightTexture = useLoader(THREE.TextureLoader, heightTextureUrl);

  aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping;
  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;
  heightTexture.wrapS = heightTexture.wrapT = THREE.RepeatWrapping;

  const reflectionRenderTarget = useMemo(
    () =>
      new THREE.WebGLRenderTarget(size.width, size.height, {
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
      meshRef.current.receiveShadow = true;
      meshRef.current.material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          u_reflectionMap: { value: reflectionRenderTarget.texture },
          u_reflectionStrength: { value: OCEAN_CONSTANTS.REFLECTION_STRENGTH },
          u_time: { value: 0 },
          u_textureMatrix: { value: new THREE.Matrix4() },
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
          u_waterColor: { value: OCEAN_CONSTANTS.WATER_COLOR },
          u_crestColor: { value: OCEAN_CONSTANTS.CREST_COLOR },
          u_maxDepth: { value: OCEAN_CONSTANTS.MAX_DEPTH },
          u_minDepth: { value: OCEAN_CONSTANTS.MIN_DEPTH },
          u_lightPosition: { value: LIGHT_POSITION },
          u_lightColor: { value: DIRECTIONAL_LIGHT_COLOR },
          u_shadowMap: { value: null },
          u_shadowColor: { value: OCEAN_CONSTANTS.SHADOW_COLOR },
          u_shadowMatrix: { value: new THREE.Matrix4() },
        },
        transparent: true,
      });
    }
  }, [reflectionRenderTarget, size, aoTexture, normalTexture, roughnessTexture, heightTexture]);

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

    if (
      meshRef.current &&
      meshRef.current.material &&
      directionalLightRef.current &&
      directionalLightRef.current.shadow
    ) {
      const elapsedTime = state.clock.getElapsedTime();

      meshRef.current.material.uniforms.u_reflectionMap.value = reflectionRenderTarget.texture;
      meshRef.current.material.uniforms.u_textureMatrix.value = textureMatrix;
      meshRef.current.material.uniforms.u_time.value = elapsedTime;

      // 그림자 매트릭스 계산
      const shadowMatrix = new THREE.Matrix4().multiplyMatrices(
        directionalLightRef.current.shadow.camera.projectionMatrix,
        directionalLightRef.current.shadow.camera.matrixWorldInverse,
      );

      const finalShadowMatrix = new THREE.Matrix4().multiplyMatrices(
        shadowMatrix,
        meshRef.current.matrixWorld,
      );

      meshRef.current.material.uniforms.u_shadowMatrix.value.copy(finalShadowMatrix);
      meshRef.current.material.uniforms.u_shadowMap.value =
        directionalLightRef.current.shadow.map.texture;
    }
  });

  return (
    <group position={[0, -7.2, 0]}>
      <primitive ref={meshRef} object={nodes.oceanPlane} receiveShadow />
    </group>
  );
};
