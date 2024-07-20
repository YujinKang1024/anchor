import { useEffect } from 'react';
import { useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useAtom } from 'jotai';

import Boat from '../Boat/Boat';
import Lands from '../Lands/Lands';
import Ocean from '../Ocean/Ocean';
import Path from '../Path/Path';
import CameraController from '../CameraController/CameraController';

import { isBoatLoadedAtom } from '../../utils/atoms';
import { DIRECTIONAL_LIGHT_POSITION, DIRECTIONAL_LIGHT_COLOR } from '../../constants/constants';
import gradientBackground from '../../assets/textures/gradient-background.jpg';

export default function Scene3DContents({ boatRef, cameraRef, setPathPoints, rotationAngle }) {
  const [isBoatLoaded] = useAtom(isBoatLoadedAtom);
  const { scene } = useThree();
  const gradientTexture = useLoader(THREE.TextureLoader, gradientBackground);

  useEffect(() => {
    scene.background = gradientTexture;
  }, [scene, gradientTexture]);

  return (
    <>
      <directionalLight
        color={DIRECTIONAL_LIGHT_COLOR}
        position={DIRECTIONAL_LIGHT_POSITION}
        intensity={1.0}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={500}
        shadow-camera-left={-250}
        shadow-camera-right={250}
        shadow-camera-top={250}
        shadow-camera-bottom={-250}
      />
      <ambientLight color={new THREE.Color(0x87ceeb)} intensity={0.3} />
      <ambientLight color={new THREE.Color(0xfffacd)} intensity={0.5} />
      <ambientLight color={new THREE.Color(0xffffff)} intensity={0.3} />
      <Boat ref={boatRef} />
      <Lands />
      <Ocean />
      <Path setPathPoints={setPathPoints} />
      {isBoatLoaded && cameraRef.current && (
        <CameraController cameraRef={cameraRef} boatRef={boatRef} rotationAngle={rotationAngle} />
      )}
    </>
  );
}
