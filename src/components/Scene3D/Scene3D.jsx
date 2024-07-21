import { useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import Scene3DContents from '../Scene3DContents/Scene3DContents';
import Scene3DUI from '../Scene3DUI/Scene3DUI';
import CameraDragHandler from '../CameraDragHandler/CameraDragHandler';
import BoatRotationController from '../BoatRotationController/BoatRotationController';
import BoatWaveController from '../BoatWaveController/BoatWaveController';
import FullScreenContainer from '../../styled-components/FullScreenContainer';

export default function Scene3D() {
  const [isShowLandingUI, setIsShowLandingUI] = useState(false);
  const [pathPoints, setPathPoints] = useState([]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const boatRef = useRef();
  const cameraRef = useRef();

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
        camera={{ fov: 40, near: 0.1, far: 2000 }}
        style={{
          position: 'absolute',
          display: 'block',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #fff 0%, #f5f9ff 10%, #bed9ff 30%, #569dff 100%)',
        }}
        onCreated={({ camera }) => {
          cameraRef.current = camera;
          setIsCameraReady(true);
        }}
        shadows
        gl={{
          shadowMap: {
            enabled: true,
            type: THREE.PCFSoftShadowMap,
          },
        }}
      >
        {isCameraReady && (
          <Scene3DContents
            boatRef={boatRef}
            cameraRef={cameraRef}
            pathPoints={pathPoints}
            setPathPoints={setPathPoints}
            rotationAngle={rotationAngle}
          />
        )}
        <BoatRotationController boatRef={boatRef} />
        <BoatWaveController boatRef={boatRef} />
      </Canvas>
      <CameraDragHandler onRotate={handleRotate} />
    </FullScreenContainer>
  );
}
