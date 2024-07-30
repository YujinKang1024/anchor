import { useEffect, forwardRef } from 'react';
import { useAtom } from 'jotai';
import { useGLTF } from '@react-three/drei';

import { isEnterIslandAtom, isOnBattleAtom, isLandMenuOpenAtom } from '../../utils/atoms';
import gameBattleMachine from '../../assets/models/gameLand-battleMachine.glb';

const GameLandBattleMachine = forwardRef(({ onClick, onPointerOut, onPointerOver }, ref) => {
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const [isOnBattle] = useAtom(isOnBattleAtom);
  const [isLandMenuOpen] = useAtom(isLandMenuOpenAtom);
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

  const handleClick = (event) => {
    event.stopPropagation();
    if (!isEnterIsland || isOnBattle || isLandMenuOpen) return;
    if (onClick) onClick(event);
  };

  return (
    <group ref={ref} scale={[1, 1, 1]} position={[0, 0, 0]}>
      <mesh onPointerDown={handleClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
        <primitive object={battleMachineScene} />
      </mesh>
    </group>
  );
});

GameLandBattleMachine.displayName = 'GameLandBattleMachine';

export default GameLandBattleMachine;
