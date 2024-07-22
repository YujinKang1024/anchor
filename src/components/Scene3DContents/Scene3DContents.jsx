import { useEffect, useRef, useState } from 'react';
import { useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import Boat from '../Boat/Boat';
import Lands from '../Lands/Lands';
import Ocean from '../Ocean/Ocean';
import Path from '../Path/Path';
import CameraController from '../CameraController/CameraController';

import initializeBoatPosition from '../../utils/initializeBoatPosition';
import {
  DIRECTIONAL_LIGHT_COLOR,
  INITIAL_BOAT_POSITION_Y,
  LIGHT_POSITION,
  CAMERA_CONSTANTS,
} from '../../constants/constants';
import gradientBackground from '../../assets/textures/gradient-background.jpg';

export default function Scene3DContents({
  boatRef,
  cameraRef,
  pathPoints,
  setPathPoints,
  rotationAngle,
}) {
  const [isInitialCameraSetup, setisInitialCameraSetup] = useState(false);
  const { scene } = useThree();
  const directionalLightRef = useRef();
  const gradientTexture = useLoader(THREE.TextureLoader, gradientBackground);

  useEffect(() => {
    scene.background = gradientTexture;
  }, [scene, gradientTexture]);

  useEffect(() => {
    if (boatRef.current && directionalLightRef.current && pathPoints.length > 0) {
      initializeBoatPosition(boatRef, pathPoints, INITIAL_BOAT_POSITION_Y, 1);

      if (cameraRef.current && !isInitialCameraSetup) {
        const boatPosition = new THREE.Vector3();
        boatRef.current.getWorldPosition(boatPosition);

        const cameraOffset = new THREE.Vector3(
          CAMERA_CONSTANTS.LATERAL_DISTANCE,
          CAMERA_CONSTANTS.HEIGHT,
          -CAMERA_CONSTANTS.DISTANCE,
        );

        const initialCameraPosition = boatPosition.clone().add(cameraOffset);
        cameraRef.current.position.copy(initialCameraPosition);
        cameraRef.current.lookAt(boatPosition);

        setisInitialCameraSetup(true);
      }
    }
  }, [boatRef, cameraRef, pathPoints, directionalLightRef, isInitialCameraSetup]);

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        position={LIGHT_POSITION}
        intensity={1.5}
        color={DIRECTIONAL_LIGHT_COLOR}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={3000}
        shadow-camera-left={-1500}
        shadow-camera-right={1500}
        shadow-camera-top={1500}
        shadow-camera-bottom={-1500}
      />
      <directionalLight position={[-50, 80, 150]} intensity={0.4} />
      <ambientLight color={new THREE.Color(0xffffff)} intensity={0.5} />
      <ambientLight color={new THREE.Color(0x87ceeb)} intensity={0.4} />
      <ambientLight color={new THREE.Color(0xfffacd)} intensity={0.5} />
      <Boat ref={boatRef} />
      <Ocean directionalLightRef={directionalLightRef} boatRef={boatRef} />
      <Lands />
      <Path setPathPoints={setPathPoints} />
      {isInitialCameraSetup && (
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
