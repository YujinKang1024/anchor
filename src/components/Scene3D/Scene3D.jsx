import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Scene3DUI from '../Scene3DUI/Scene3DUI';
import Ocean from '../Ocean/Ocean';
import Boat from '../Boat/Boat';
import Lands from '../Lands/Lands';
import Path from '../Path/Path';
import CameraController from '../CameraController/CameraController';
import OrbitControlArea from '../OrbitControlArea/OrbitControlArea';

import FullScreenContainer from '../../styled-components/FullScreenContainer';

// OrbitControls에 의한 카메라 포지션 console 출력
function CameraLogger({ cameraRef, controlsRef }) {
  const prevPosition = useRef(new THREE.Vector3());
  const prevRotation = useRef(new THREE.Euler());

  useFrame(() => {
    if (cameraRef.current && controlsRef.current) {
      const { position, rotation } = cameraRef.current;
      if (!prevPosition.current.equals(position) || !prevRotation.current.equals(rotation)) {
        console.log(
          `Camera Position: [${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}]`,
        );
        console.log(
          `Camera Rotation: [${rotation.x.toFixed(2)}, ${rotation.y.toFixed(2)}, ${rotation.z.toFixed(2)}]`,
        );

        prevPosition.current.copy(position);
        prevRotation.current.copy(rotation);
      }
    }
  });

  return null;
}

export default function Scene3D() {
  const [isShowLandingUI, setIsShowLandingUI] = useState(false);
  const [isBoatLoaded, setIsBoatLoaded] = useState(false);
  const [pathPoints, setPathPoints] = useState([]);

  const cameraRef = useRef();
  const boatRef = useRef();
  const controlsRef = useRef();

  function handleBoatLoaded() {
    setIsBoatLoaded(true);
  }

  return (
    <FullScreenContainer>
      <Scene3DUI
        isShowLandingUI={isShowLandingUI}
        setIsShowLandingUI={setIsShowLandingUI}
        pathPoints={pathPoints}
        boatRef={boatRef}
      />
      <Canvas
        camera={{ position: [0, 0, 0], fov: 45, near: 0.1, far: 2000 }}
        style={{
          position: 'absolute',
          display: 'block',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #fff 0%, #f5f9ff 10%, #bed9ff 30%, #569dff 100%)',
        }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
      >
        <OrbitControlArea />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <ambientLight intensity={1} />
        <OrbitControls
          ref={controlsRef}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
          maxAzimuthAngle={Math.PI}
          minAzimuthAngle={-Math.PI}
          enablePan={true}
          enableZoom={false}
        />
        <Boat ref={boatRef} onLoaded={handleBoatLoaded} />
        <Lands />
        <Ocean />
        <Path setPathPoints={setPathPoints} />
        <CameraLogger cameraRef={cameraRef} controlsRef={controlsRef} />
        {isBoatLoaded && (
          <CameraController cameraRef={cameraRef} boatRef={boatRef} controlsRef={controlsRef} />
        )}
      </Canvas>
    </FullScreenContainer>
  );
}
