import { forwardRef, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const MouseFollower = forwardRef(({ mousePosition, gameLandRef, battleMachineRef }, ref) => {
  const { camera, raycaster } = useThree();
  const HOVER_HEIGHT = 4;
  const BATTLE_MACHINE_HOVER_HEIGHT = 6;

  const intersectObjects = useMemo(() => {
    const objects = [];
    if (gameLandRef?.current) objects.push(gameLandRef.current);
    if (battleMachineRef?.current) objects.push(battleMachineRef.current);
    return objects;
  }, [gameLandRef, battleMachineRef]);

  useFrame(() => {
    if (
      mousePosition &&
      mousePosition.x !== undefined &&
      mousePosition.y !== undefined &&
      intersectObjects.length > 0
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
        console.log('MouseFollower 위치', position);
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
    <Sphere ref={ref} args={[3, 16, 16]}>
      <meshBasicMaterial color="orange" transparent opacity={0.7} />
    </Sphere>
  );
});

MouseFollower.displayName = 'MouseFollower';

export default MouseFollower;
