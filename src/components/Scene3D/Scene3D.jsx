import { useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';

import Scene3DUI from '../Scene3DUI/Scene3DUI';
import Ocean from '../Ocean/Ocean';
import Boat from '../Boat/Boat';
import Lands from '../Lands/Lands';
import Path from '../Path/Path';
import CameraController from '../CameraController/CameraController';
import CameraDragHandler from '../CameraDragHandler/CameraDragHandler';

import FullScreenContainer from '../../styled-components/FullScreenContainer';

export default function Scene3D() {
  const [isShowLandingUI, setIsShowLandingUI] = useState(false);
  const [isBoatLoaded, setIsBoatLoaded] = useState(false);
  const [pathPoints, setPathPoints] = useState([]);
  const [rotationAngle, setRotationAngle] = useState(0);

  const cameraRef = useRef();
  const boatRef = useRef();

  function handleBoatLoaded() {
    setIsBoatLoaded(true);
  }

  const handleRotate = useCallback((deltaAngle) => {
    setRotationAngle((prevAngle) => prevAngle + deltaAngle);
  }, []);

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
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <ambientLight intensity={1} />
        <Boat ref={boatRef} onLoaded={handleBoatLoaded} />
        <Lands />
        <Ocean />
        <Path setPathPoints={setPathPoints} />
        {isBoatLoaded && (
          <CameraController cameraRef={cameraRef} boatRef={boatRef} rotationAngle={rotationAngle} />
        )}
      </Canvas>
      <CameraDragHandler onRotate={handleRotate} />
    </FullScreenContainer>
  );
}
