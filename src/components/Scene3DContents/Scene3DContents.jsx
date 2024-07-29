import { useEffect, useRef, useState } from 'react';
import { useThree, useLoader } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import Boat from '../Boat/Boat';
import Lands from '../Lands/Lands';
import Ocean from '../Ocean/Ocean';
import BoatController from '../BoatController/BoatController';
import BoatWaveController from '../BoatWaveController/BoatWaveController';
import CameraController from '../CameraController/CameraController';
import GameLand from '../GameLand/GameLand';
import MouseFollower from '../MouseFollower/MouseFollower';

import {
  DIRECTIONAL_LIGHT_COLOR,
  LIGHT_POSITION,
  BOAT_CONSTANTS,
  CAMERA_CONSTANTS,
} from '../../constants/constants';
import { isOnBattleAtom } from '../../utils/atoms';

import gradientBackground from '../../assets/textures/gradient-background.jpg';

export default function Scene3DContents({
  boatRef,
  cameraRef,
  pathPoints,
  rotationAngle,
  verticalRotationAngle,
}) {
  const [isInitialCameraSetup, setisInitialCameraSetup] = useState(false);
  const [isOnBattle] = useAtom(isOnBattleAtom);
  const directionalLightRef = useRef();

  const { scene } = useThree();
  const gradientTexture = useLoader(THREE.TextureLoader, gradientBackground);

  useEffect(() => {
    scene.background = gradientTexture;
  }, [scene, gradientTexture]);

  useEffect(() => {
    if (boatRef.current && directionalLightRef.current) {
      boatRef.current.position.copy(BOAT_CONSTANTS.INITIAL_BOAT_POSITION);

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
        shadow-camera-far={1200}
        shadow-camera-left={-900}
        shadow-camera-right={900}
        shadow-camera-top={900}
        shadow-camera-bottom={-900}
        shadow-bias={-0.01}
      />
      <directionalLight position={[-50, 80, 150]} intensity={0.4} />
      <ambientLight color={new THREE.Color(0xffffff)} intensity={0.5} />
      <ambientLight color={new THREE.Color(0x87ceeb)} intensity={0.4} />
      <ambientLight color={new THREE.Color(0xfffacd)} intensity={0.5} />
      <Boat ref={boatRef} />
      <Ocean directionalLightRef={directionalLightRef} boatRef={boatRef} />
      <Lands />
      <GameLand />
      {isOnBattle && <MouseFollower />}
      {isInitialCameraSetup && (
        <>
          <CameraController
            cameraRef={cameraRef}
            boatRef={boatRef}
            directionalLightRef={directionalLightRef}
            rotationAngle={rotationAngle}
            verticalRotationAngle={verticalRotationAngle}
          />
          <BoatController boatRef={boatRef} />
          <BoatWaveController boatRef={boatRef} />
        </>
      )}
    </>
  );
}
