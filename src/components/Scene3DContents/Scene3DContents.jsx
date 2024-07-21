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
    if (boatRef.current && directionalLightRef.current && directionalLightRef.current.shadow.map) {
      initializeBoatPosition(boatRef, pathPoints, INITIAL_BOAT_POSITION_Y, 1);

      const boatPosition = new THREE.Vector3();
      boatRef.current.getWorldPosition(boatPosition);

      directionalLightRef.current.position.copy(boatPosition).add(LIGHT_OFFSET);
      directionalLightRef.current.target.updateMatrixWorld();

      directionalLightRef.current.shadow.camera.updateProjectionMatrix();
      directionalLightRef.current.shadow.camera.updateMatrixWorld();

      directionalLightRef.current.shadow.map.needsUpdate = true;
    }
  }, [boatRef, pathPoints, directionalLightRef]);

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        intensity={1.0}
        color={DIRECTIONAL_LIGHT_COLOR}
        castShadow
        shadow-mapSize-width={8192}
        shadow-mapSize-height={8192}
        shadow-camera-far={3000}
        shadow-camera-left={-1500}
        shadow-camera-right={1500}
        shadow-camera-top={1500}
        shadow-camera-bottom={-1500}
      />
      <ambientLight color={new THREE.Color(0x87ceeb)} intensity={0.3} />
      <ambientLight color={new THREE.Color(0xfffacd)} intensity={0.5} />
      <ambientLight color={new THREE.Color(0xffffff)} intensity={0.3} />
      <Boat ref={boatRef} />
      <Ocean directionalLightRef={directionalLightRef} />
      <Lands />
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
