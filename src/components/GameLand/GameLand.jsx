import { useEffect, useRef, useCallback, useState } from 'react';
import { useAtom } from 'jotai';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import { isEnterIslandAtom, isOnBattleAtom } from '../../utils/atoms';
import gameLand from '../../assets/models/gameLand.glb';

import Monster from '../Monster/Monster';
import GameLandBattleMachine from '../GameLandBattleMachine/GameLandBattleMachine';
import MouseFollower from '../MouseFollower/MouseFollower';

const emissionColorMap = {
  game_sign_emission: {
    color: new THREE.Color(0x8000ff),
    intensity: 2.0,
  },
  game_battle_machine_sign02: {
    color: new THREE.Color(0xf73a54),
    intensity: 1.5,
  },
  game_monitor_emission: {
    color: new THREE.Color(0xbbd2ff),
    intensity: 1.5,
  },
  game_vending_machine_emission: {
    color: new THREE.Color(0x424242),
    intensity: 30.0,
  },
};

export default function GameLand() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const [isOnBattle, setIsOnBattle] = useAtom(isOnBattleAtom);
  const { scene } = useGLTF(gameLand);
  const glowMeshesRef = useRef([]);
  const mouseFollowerRef = useRef(null);
  const battleMachineRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (child.name in emissionColorMap) {
            const { color, intensity } = emissionColorMap[child.name];

            child.material.emissive = color;
            child.material.emissiveIntensity = intensity * 0.5;

            const glowMaterial = new THREE.ShaderMaterial({
              uniforms: {
                glowColor: { value: color },
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

            const glowMesh = new THREE.Mesh(child.geometry, glowMaterial);
            glowMesh.position.copy(child.position);
            glowMesh.rotation.copy(child.rotation);
            glowMesh.scale.copy(child.scale);
            glowMesh.renderOrder = child.renderOrder - 1;

            child.parent.add(glowMesh);
            glowMeshesRef.current.push(glowMesh);
          }
        }
      });
    }
  }, [scene]);

  const cleanup = useCallback(() => {
    glowMeshesRef.current.forEach((mesh) => {
      if (mesh.parent) mesh.parent.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    glowMeshesRef.current = [];
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useFrame(({ camera }) => {
    glowMeshesRef.current.forEach((mesh) => {
      mesh.material.uniforms.viewVector.value.copy(camera.position).sub(mesh.position);
    });
  });

  const handleBattleMachineClick = useCallback(() => {
    if (!isOnBattle && isEnterIsland) {
      setIsOnBattle(true);
      console.log('배틀 시작!');
    }
  }, [isOnBattle, setIsOnBattle, isEnterIsland]);

  const handleMouseMove = useCallback((event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <>
      <primitive object={scene} ref={sceneRef} />
      <GameLandBattleMachine ref={battleMachineRef} onClick={handleBattleMachineClick} />
      <Monster position={[-400, 40, -370]} mouseFollowerRef={mouseFollowerRef} />
      {isOnBattle && mousePosition && (
        <MouseFollower
          ref={mouseFollowerRef}
          mousePosition={mousePosition}
          gameLandRef={sceneRef}
          battleMachineRef={battleMachineRef}
        />
      )}
    </>
  );
}
