import { useEffect, useRef } from 'react';
import { useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useAtom } from 'jotai';

import Boat from '../Boat/Boat';
import Lands from '../Lands/Lands';
import Ocean from '../Ocean/Ocean';
import Path from '../Path/Path';
import CameraController from '../CameraController/CameraController';

import initializeBoatPosition from '../../utils/initializeBoatPosition';
import { isBoatLoadedAtom } from '../../utils/atoms';
import {
  DIRECTIONAL_LIGHT_COLOR,
  INITIAL_BOAT_POSITION_Y,
  LIGHT_OFFSET,
} from '../../constants/constants';
import gradientBackground from '../../assets/textures/gradient-background.jpg';

export default function Scene3DContents({
  boatRef,
  cameraRef,
  pathPoints,
  setPathPoints,
  rotationAngle,
}) {
  const [isBoatLoaded] = useAtom(isBoatLoadedAtom);
  const { scene } = useThree();
  const directionalLightRef = useRef();
  const gradientTexture = useLoader(THREE.TextureLoader, gradientBackground);

  useEffect(() => {
    scene.background = gradientTexture;
  }, [scene, gradientTexture]);

  useEffect(() => {
    if (boatRef.current) {
      initializeBoatPosition(boatRef, pathPoints, INITIAL_BOAT_POSITION_Y, 1);
    }
  }, [boatRef, pathPoints]);

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        position={LIGHT_OFFSET}
        intensity={1.0}
        color={DIRECTIONAL_LIGHT_COLOR}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={3000}
        shadow-camera-left={-1300}
        shadow-camera-right={1300}
        shadow-camera-top={1300}
        shadow-camera-bottom={-1300}
      />
      <ambientLight color={new THREE.Color(0x87ceeb)} intensity={0.3} />
      <ambientLight color={new THREE.Color(0xfffacd)} intensity={0.5} />
      <ambientLight color={new THREE.Color(0xffffff)} intensity={0.3} />
      <Boat ref={boatRef} />
      <Lands />
      <Ocean directionalLightRef={directionalLightRef} />
      <Path setPathPoints={setPathPoints} />
      {isBoatLoaded && cameraRef.current && (
        <CameraController
          cameraRef={cameraRef}
          boatRef={boatRef}
          directionalLightRef={directionalLightRef}
          rotationAngle={rotationAngle}
        />
      )}
    </>
  );
}
