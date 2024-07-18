import { useRef, useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import oceanPlaneUri from '../../assets/models/oceanPlane.glb';

const vertexShader = `
  uniform mat4 textureMatrix;
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying vec4 vReflectCoord;

  void main() {
    vUv = uv;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalize(normalMatrix * normal);
    vReflectCoord = textureMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D reflectionMap;
  uniform float time;
  uniform mat4 textureMatrix;

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying vec4 vReflectCoord;

  void main() {
    vec2 uv = vUv;
    uv += 0.05 * vec2(
      sin(uv.x * 10.0 + time * 0.1),
      cos(uv.y * 10.0 + time * 0.1)
    );

    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnelFactor = dot(viewDirection, vNormal);
    float fresnelStrength = 2.6;
    fresnelFactor = pow(1.0 - fresnelFactor, fresnelStrength);

    vec2 reflectUV = vReflectCoord.xy / vReflectCoord.w;
    vec3 reflection = texture2D(reflectionMap, reflectUV).rgb;
    vec3 waterColor = vec3(0.1, 0.2, 0.05);

    vec3 finalColor = mix(waterColor, reflection, fresnelFactor);

    float luminance = dot(finalColor, vec3(0.05, 0.2, 0.2));

    float threshold = 0.08;
    float boost = 2.8;

    if (luminance < threshold) {
        float factor = (threshold - luminance) / threshold;
        finalColor += vec3(0.17, 0.31, 0.47) * boost * factor;
    }

    finalColor = clamp(finalColor, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, 0.9);
  }
`;

export default function Ocean() {
  const { nodes } = useGLTF(oceanPlaneUri);
  const meshRef = useRef();
  const shaderRef = useRef();
  const reflectionCameraRef = useRef();
  const { gl, scene, camera, size } = useThree();

  const reflectionRenderTarget = useMemo(
    () =>
      new THREE.WebGLRenderTarget(size.width / 2, size.height / 2, {
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
          reflectionMap: { value: reflectionRenderTarget.texture },
          time: { value: 0 },
          textureMatrix: { value: new THREE.Matrix4() },
        },
        transparent: true,
      });
    }
  }, [reflectionRenderTarget, size]);

  useFrame((state) => {
    if (!meshRef.current || !reflectionCameraRef.current) return;

    const waterPosition = new THREE.Vector3(meshRef.current.position);
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

    if (shaderRef.current) {
      shaderRef.current.uniforms.reflectionMap.value = reflectionRenderTarget.texture;
      shaderRef.current.uniforms.time.value = state.clock.getElapsedTime();
    }

    const clipBias = 0.00001;
    const reflectorPlane = new THREE.Plane();
    reflectorPlane.setFromNormalAndCoplanarPoint(
      new THREE.Vector3(0, 1, 0),
      meshRef.current.position,
    );
    reflectorPlane.applyMatrix4(meshRef.current.matrixWorld);

    const clipPlane = new THREE.Vector4();
    clipPlane.set(
      reflectorPlane.normal.x,
      reflectorPlane.normal.y,
      reflectorPlane.normal.z,
      reflectorPlane.constant,
    );
    const projectionMatrix = new THREE.Matrix4();
    projectionMatrix.multiplyMatrices(
      reflectionCameraRef.current.projectionMatrix,
      reflectionCameraRef.current.matrixWorldInverse,
    );
    clipPlane.applyMatrix4(projectionMatrix);
    const clipBiasPlanar =
      clipBias *
      Math.sqrt(clipPlane.x * clipPlane.x + clipPlane.y * clipPlane.y + clipPlane.z * clipPlane.z);
    clipPlane.multiplyScalar(clipBiasPlanar);

    reflectionCameraRef.current.projectionMatrix.elements[2] = clipPlane.x;
    reflectionCameraRef.current.projectionMatrix.elements[6] = clipPlane.y;
    reflectionCameraRef.current.projectionMatrix.elements[10] = clipPlane.z + 1.0;
    reflectionCameraRef.current.projectionMatrix.elements[14] = clipPlane.w;

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
      meshRef.current.material.uniforms.reflectionMap.value = reflectionRenderTarget.texture;
      meshRef.current.material.uniforms.textureMatrix.value = textureMatrix;
      meshRef.current.material.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <group position={[0, -507, 0]}>
      <primitive
        ref={meshRef}
        object={nodes.oceanPlane}
        material={
          new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
              reflectionMap: { value: reflectionRenderTarget.texture },
              time: { value: 0 },
              textureMatrix: { value: textureMatrix },
            },
            transparent: true,
          })
        }
      />
    </group>
  );
}
