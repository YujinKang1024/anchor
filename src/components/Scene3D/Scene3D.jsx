import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Scene3DUI from '../Scene3DUI/Scene3DUI';
import Ocean from '../Ocean/Ocean';
import FullScreenContainer from '../../styled-components/FullScreenContainer';

function CameraStatus({ cameraRef, onCameraChange }) {
  useFrame(() => {
    if (cameraRef.current) {
      const { position, rotation } = cameraRef.current;
      onCameraChange({
        position: [position.x, position.y, position.z],
        rotation: [rotation.x, rotation.y, rotation.z],
      });
    }
  });

  return null;
}

export default function Scene3D() {
  const cameraRef = useRef();
  const [cameraPosition, setCameraPosition] = useState([0, 0, 0]);
  const [cameraRotation, setCameraRotation] = useState([0, 0, 0]);

  const handleCameraChange = ({ position, rotation }) => {
    setCameraPosition(position);
    setCameraRotation(rotation);
  };

  return (
    <FullScreenContainer>
      <Scene3DUI />
      <Canvas
        camera={{ position: [0, 16, 40], fov: 50 }}
        style={{
          position: 'absolute',
          display: 'block',
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(to bottom, #fff 0%, #f5f9ff 10%, #bed9ff 40%, #569dff 100%)',
        }}
        onCreated={({ camera }) => {
          cameraRef.current = camera;
        }}
      >
        <directionalLight position={[10, 30, 5]} intensity={1} />
        <ambientLight intensity={0.8} />
        <OrbitControls />
        <Ocean />
        <CameraStatus
          cameraRef={cameraRef}
          onCameraChange={handleCameraChange}
        />
      </Canvas>
      <div style={{ position: 'absolute', top: 10, left: 10, color: 'black' }}>
        <div>
          Camera Position:{' '}
          {cameraPosition.map((coord) => coord.toFixed(2)).join(', ')}
        </div>
        <div>
          Camera Rotation:{' '}
          {cameraRotation.map((angle) => angle.toFixed(2)).join(', ')}
        </div>
      </div>
    </FullScreenContainer>
  );
}
