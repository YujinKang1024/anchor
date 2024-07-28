import { useRef, useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useGLTF } from '@react-three/drei';

import { isEnterIslandAtom } from '../../utils/atoms';
import gameBattleMachine from '../../assets/models/gameLand-battleMachine.glb';

export default function GameLandBattleMachine({ onClick }) {
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const { scene: battleMachineScene } = useGLTF(gameBattleMachine);
  const sceneRef = useRef();

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, []);

  const handleClick = useCallback(
    (event) => {
      if (!isEnterIsland) return;
      event.stopPropagation();
      if (onClick) {
        onClick(event);
      }
      console.log('배틀 머신 클릭');
    },
    [onClick, isEnterIsland],
  );

  const handlePointerOver = useCallback(() => {
    if (isEnterIsland) {
      document.body.style.cursor = 'pointer';
    }
  }, [isEnterIsland]);

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = 'default';
  }, []);

  return (
    <group ref={sceneRef} scale={[1, 1, 1]} position={[0, 0, 0]}>
      <mesh
        onPointerDown={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <primitive object={battleMachineScene} />
      </mesh>
    </group>
  );
}
