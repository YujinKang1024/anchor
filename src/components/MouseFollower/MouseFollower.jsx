import { forwardRef, useMemo } from 'react';
import { useAtom } from 'jotai';
import { useThree, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

import { mouseFollowerPositionAtom, monsterHPAtom } from '../../atoms/battleAtoms';

const MouseFollower = forwardRef(({ mousePosition, developLandRef, battleMachineRef }, ref) => {
  const [mouseFollowerPosition, setMouseFollowerPosition] = useAtom(mouseFollowerPositionAtom);
  const [monsterHP] = useAtom(monsterHPAtom);

  const { camera, raycaster } = useThree();
  const HOVER_HEIGHT = 4;
  const BATTLE_MACHINE_HOVER_HEIGHT = 6;

  const intersectObjects = useMemo(() => {
    const objects = [];
    if (developLandRef?.current) objects.push(developLandRef.current);
    if (battleMachineRef?.current) objects.push(battleMachineRef.current);
    return objects;
  }, [developLandRef, battleMachineRef]);

  useFrame(() => {
    if (
      mousePosition &&
      mousePosition.x !== undefined &&
      mousePosition.y !== undefined &&
      intersectObjects.length > 0 &&
      monsterHP > 0
    ) {
      const vector = new THREE.Vector3(mousePosition.x, mousePosition.y, 0.5);
      vector.unproject(camera);

      raycaster.set(camera.position, vector.sub(camera.position).normalize());

      const intersects = raycaster.intersectObjects(intersectObjects, true);

      if (intersects.length > 0) {
        const position = intersects[0].point.clone();
        const isBattleMachine = intersects[0].object.parent === battleMachineRef?.current;

        if (isBattleMachine) {
          position.y += BATTLE_MACHINE_HOVER_HEIGHT;
        } else {
          position.y += HOVER_HEIGHT;
        }

        ref.current.position.copy(position);
        setMouseFollowerPosition(position);
        console.log('MouseFollower 위치', position);
        console.log('전역상태 팔로워 위치', mouseFollowerPosition);
      } else {
        const dir = vector.normalize();
        const pos = camera.position.clone().add(dir.multiplyScalar(100));
        pos.y += HOVER_HEIGHT;
        ref.current.position.copy(pos);
        console.log('MouseFollower 기본 위치', pos);
      }
    }
  });

  return (
    <>
      {monsterHP > 0 && (
        <Sphere ref={ref} args={[3, 16, 16]}>
          <meshBasicMaterial color="orange" transparent opacity={0.7} />
        </Sphere>
      )}
    </>
  );
});

MouseFollower.displayName = 'MouseFollower';

export default MouseFollower;
