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

export const Ocean = ({ directionalLightRef, basicLandRef, gameLandRef }) => {
  const { nodes } = useGLTF(oceanPlaneUrl);
  const { gl, scene, camera, size } = useThree();

  const meshRef = useRef();
  const reflectionCameraRef = useRef();

  // 텍스처 로드
  const aoTexture = useLoader(THREE.TextureLoader, aoTextureUrl);
  const normalTexture = useLoader(THREE.TextureLoader, normalTextureUrl);
  const roughnessTexture = useLoader(THREE.TextureLoader, roughnessTextureUrl);
  const heightTexture = useLoader(THREE.TextureLoader, heightTextureUrl);

  // 텍스처 래핑 설정
  [aoTexture, normalTexture, roughnessTexture, heightTexture].forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  });

  // 리플렉션 렌더 타겟
  const reflectionRenderTarget = useMemo(
    () =>
      new THREE.WebGLRenderTarget(size.width, size.height, {
        colorSpace: THREE.SRGBColorSpace,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType,
      }),
    [size],
  );

  const textureMatrix = useMemo(() => new THREE.Matrix4(), []);

  // 리플렉션 카메라 설정
  useEffect(() => {
    reflectionCameraRef.current = camera.clone();
    reflectionCameraRef.current.layers.enableAll();
  }, [camera]);

  // 섬의 텍스처 렌더링 및 초기 셰이더 설정
  useEffect(() => {
    if (!meshRef.current || !basicLandRef.current || !gameLandRef.current || !gl) return;

    // 섬 씬 설정
    const islandScene = new THREE.Scene();
    islandScene.background = new THREE.Color(0x000000);

    const whiteMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });

    // 섬 메시 추가
    [basicLandRef, gameLandRef].forEach((ref) => {
      if (ref.current) {
        ref.current.traverse((child) => {
          if (child.isMesh && child.name.toLowerCase().includes('land')) {
            const clonedMesh = child.clone();
            clonedMesh.material = whiteMaterial;
            clonedMesh.position.copy(child.position);
            clonedMesh.rotation.copy(child.rotation);
            clonedMesh.scale.copy(child.scale);

            if (child.parent) {
              clonedMesh.position.add(child.parent.position);
              const parentQuaternion = new THREE.Quaternion();
              child.parent.getWorldQuaternion(parentQuaternion);
              clonedMesh.quaternion.premultiply(parentQuaternion);
            }

            islandScene.add(clonedMesh);
          }
        });
      }
    });

    // 바운딩 박스 계산
    const boundingBox = new THREE.Box3();
    islandScene.traverse((child) => {
      if (child.isMesh) {
        boundingBox.expandByObject(child);
      }
    });

    const sceneSize = new THREE.Vector3();
    const center = new THREE.Vector3();
    boundingBox.getSize(sceneSize);
    boundingBox.getCenter(center);

    const padding = 2.0;
    const maxSize = Math.max(sceneSize.x, sceneSize.z) * padding;

    // 섬 렌더링용 카메라 설정
    const islandCamera = new THREE.OrthographicCamera(
      -maxSize / 2,
      maxSize / 2,
      maxSize / 2,
      -maxSize / 2,
      0.1,
      2000,
    );
    islandCamera.position.set(center.x, center.y + 1000, center.z);
    islandCamera.lookAt(center);
    islandCamera.updateProjectionMatrix();

    // 섬 렌더 타겟
    const islandRenderTarget = new THREE.WebGLRenderTarget(2048, 2048, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
      depthBuffer: false,
      stencilBuffer: false,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    });

    // 섬 렌더링
    gl.setRenderTarget(islandRenderTarget);
    gl.clear(true, true, true);
    gl.render(islandScene, islandCamera);
    gl.setRenderTarget(null);

    // 텍스처 매트릭스 계산
    const islandTextureMatrix = new THREE.Matrix4()
      .set(0.5, 0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 1.0)
      .multiply(islandCamera.projectionMatrix)
      .multiply(islandCamera.matrixWorldInverse);

    // 셰이더 머티리얼 설정
    meshRef.current.receiveShadow = true;
    meshRef.current.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        // 기본 텍스처 유니폼
        u_reflectionMap: { value: reflectionRenderTarget.texture },
        u_aoTexture: { value: aoTexture },
        u_normalTexture: { value: normalTexture },
        u_roughnessTexture: { value: roughnessTexture },
        u_heightTexture: { value: heightTexture },

        // 섬 관련 유니폼
        u_islandMap: { value: islandRenderTarget.texture, type: 't', channel: 2 },
        u_islandTextureMatrix: { value: islandTextureMatrix },
        u_centerPosition: { value: center },
        u_sceneSize: { value: maxSize },

        // 물 속성 유니폼
        u_reflectionStrength: { value: OCEAN_CONSTANTS.REFLECTION_STRENGTH },
        u_waterColor: { value: OCEAN_CONSTANTS.WATER_COLOR },
        u_crestColor: { value: OCEAN_CONSTANTS.CREST_COLOR },
        u_waveHeight: { value: OCEAN_CONSTANTS.WAVE_HEIGHT },
        u_waveSpeed: { value: OCEAN_CONSTANTS.WAVE_SPEED },
        u_fresnelStrength: { value: OCEAN_CONSTANTS.FRESNEL_STRENGTH },

        // 효과 유니폼
        u_fogColor: { value: OCEAN_CONSTANTS.FOG_COLOR },
        u_fogNear: { value: OCEAN_CONSTANTS.FOG_NEAR },
        u_fogFar: { value: OCEAN_CONSTANTS.FOG_FAR },
        u_brightness: { value: OCEAN_CONSTANTS.BRIGHTNESS },
        u_contrast: { value: OCEAN_CONSTANTS.CONTRAST },
        u_saturation: { value: OCEAN_CONSTANTS.SATURATION },
        u_maxDepth: { value: OCEAN_CONSTANTS.MAX_DEPTH },
        u_minDepth: { value: OCEAN_CONSTANTS.MIN_DEPTH },

        // 매트릭스/시간 유니폼
        u_textureMatrix: { value: new THREE.Matrix4() },
        u_shadowMatrix: { value: new THREE.Matrix4() },
        u_time: { value: 0 },

        // 조명 유니폼
        u_lightPosition: { value: LIGHT_POSITION },
        u_lightColor: { value: DIRECTIONAL_LIGHT_COLOR },
        u_shadowMap: { value: null },
        u_shadowColor: { value: OCEAN_CONSTANTS.SHADOW_COLOR },
      },
      transparent: true,
    });

    return () => {
      islandRenderTarget.dispose();
    };
  }, [
    reflectionRenderTarget,
    size,
    aoTexture,
    normalTexture,
    roughnessTexture,
    heightTexture,
    basicLandRef,
    gameLandRef,
    gl,
  ]);

  useFrame((state) => {
    if (!meshRef.current || !reflectionCameraRef.current) return;

    // 리플렉션 카메라 업데이트
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

    // 리플렉션 렌더링
    const currentBackground = scene.background;
    const currentFog = scene.fog;
    scene.background = null;
    scene.fog = null;

    meshRef.current.visible = false;

    gl.setRenderTarget(reflectionRenderTarget);
    gl.clear();
    gl.render(scene, reflectionCameraRef.current);
    gl.setRenderTarget(null);

    meshRef.current.visible = true;
    scene.background = currentBackground;
    scene.fog = currentFog;

    // 클립 바이어스 적용
    const clipBias = 0.00001;
    reflectionCameraRef.current.projectionMatrix.elements[10] -= clipBias;

    // 텍스처 매트릭스 업데이트
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

    // 유니폼 업데이트
    if (meshRef.current.material) {
      const elapsedTime = state.clock.getElapsedTime();
      meshRef.current.material.uniforms.u_time.value = elapsedTime;
      meshRef.current.material.uniforms.u_reflectionMap.value = reflectionRenderTarget.texture;
      meshRef.current.material.uniforms.u_textureMatrix.value = textureMatrix;

      // 그림자 매트릭스 업데이트
      if (directionalLightRef.current?.shadow) {
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
    }
  });

  return (
    <group position={[0, -7.2, 0]}>
      <primitive ref={meshRef} object={nodes.oceanPlane} receiveShadow />
    </group>
  );
};
