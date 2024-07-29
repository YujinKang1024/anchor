import { useCallback, useEffect, forwardRef } from 'react';
import { useAtom } from 'jotai';
import { useGLTF } from '@react-three/drei';

import { isEnterIslandAtom, isOnBattleAtom } from '../../utils/atoms';
import gameBattleMachine from '../../assets/models/gameLand-battleMachine.glb';

const GameLandBattleMachine = forwardRef(({ onClick, handlePointerOut }, ref) => {
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const [isOnBattle] = useAtom(isOnBattleAtom);
  const { scene: battleMachineScene } = useGLTF(gameBattleMachine);

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [ref]);

  const handleClick = useCallback(
    (event) => {
      if (!isEnterIsland && isOnBattle) return;

      event.stopPropagation();
      if (onClick) {
        onClick(event);
      }
    },
    [onClick, isEnterIsland, isOnBattle],
  );

  const handlePointerOver = useCallback(() => {
    if (isEnterIsland && !isOnBattle) {
      document.body.style.cursor = 'pointer';
    }
  }, [isEnterIsland, isOnBattle]);

  return (
    <group ref={ref} scale={[1, 1, 1]} position={[0, 0, 0]}>
      <mesh
        onPointerDown={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <primitive object={battleMachineScene} />
      </mesh>
    </group>
  );
});

GameLandBattleMachine.displayName = 'GameLandBattleMachine';

export default GameLandBattleMachine;
