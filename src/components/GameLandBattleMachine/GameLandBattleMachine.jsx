import { useRef, useCallback } from 'react';
import { useGLTF } from '@react-three/drei';

import gameBattleMachine from '../../assets/models/gameLand-battleMachine.glb';

export default function GameLandBattleMachine({ onClick }) {
  const { scene: battleMachineScene } = useGLTF(gameBattleMachine);
  const sceneRef = useRef();

  const handleClick = useCallback(
    (event) => {
      event.stopPropagation();
      if (onClick) {
        onClick(event);
      }
      console.log('배틀 머신 클릭');
    },
    [onClick],
  );

  const handlePointerOver = useCallback(() => {
    document.body.style.cursor = 'pointer';
  }, []);

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
