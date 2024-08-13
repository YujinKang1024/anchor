import { useRef, useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { gsap } from 'gsap/gsap-core';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

import { isSoundPlayingAtom, isEnterIslandAtom } from '../../utils/atoms';

import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  BrightnessContrast,
  HueSaturation,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

import Scene3DContents from '../Scene3DContents/Scene3DContents';
import Scene3DUI from '../Scene3DUI/Scene3DUI';
import FullScreenContainer from '../../styled-components/FullScreenContainer';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import LandingUI from '../LandingUI/LandingUI';
import CameraController from '../CameraController/CameraController';

export default function Scene3D() {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLandingUI, setShowLandingUI] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const [, setIsSoundPlaying] = useAtom(isSoundPlayingAtom);
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const orbitControlsRef = useRef();
  const canvasRef = useRef(null);
  const boatRef = useRef();
  const developLandRef = useRef();
  const cameraRef = useRef();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => setShowLandingUI(true), 100);
  }, []);

  const handleStartButtonClick = useCallback(() => {
    setIsSoundPlaying(true);
    setIsTransitioning(true);
    gsap.to(document.body, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setShowLandingUI(false);
        setShowScene(true);
        requestAnimationFrame(() => {
          setIsTransitioning(false);
          gsap.to(document.body, { opacity: 1, duration: 0.5 });
        });
      },
    });
  }, [setIsSoundPlaying]);

  return (
    <FullScreenContainer>
      <LoadingScreen
        onLoadingComplete={handleLoadingComplete}
        isVisible={isLoading || isTransitioning}
        showText={isLoading}
      />
      {showLandingUI && !showScene && <LandingUI onStartButtonClick={handleStartButtonClick} />}
      {showScene && (
        <>
          <Scene3DUI boatRef={boatRef} />
          <Canvas
            ref={canvasRef}
            camera={{ fov: 40, near: 0.6, far: 1800 }}
            style={{
              position: 'absolute',
              display: 'block',
              width: '100%',
              height: '100%',
              background:
                'linear-gradient(to bottom, #fff 0%, #f5f9ff 10%, #bed9ff 30%, #569dff 100%)',
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
            <EffectComposer>
              <DepthOfField focusDistance={0} focalLength={1.0} bokehScale={6} height={800} />
              <Bloom
                intensity={0.6}
                luminanceThreshold={0.75}
                luminanceSmoothing={0.3}
                blendFunction={BlendFunction.SCREEN}
              />
              <Vignette eskil={false} offset={0.1} darkness={0.35} />
              <BrightnessContrast brightness={0.01} contrast={0.018} />
              <HueSaturation blendFunction={BlendFunction.NORMAL} hue={0} saturation={0.1} />
            </EffectComposer>
            {isCameraReady && (
              <>
                <Scene3DContents
                  boatRef={boatRef}
                  cameraRef={cameraRef}
                  developLandRef={developLandRef}
                  orbitControlsRef={orbitControlsRef}
                />
                <OrbitControls
                  ref={orbitControlsRef}
                  enablePan={false}
                  enableZoom={true}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 2}
                  minDistance={50}
                  maxDistance={isEnterIsland ? 450 : 110}
                />
                <CameraController
                  cameraRef={cameraRef}
                  boatRef={boatRef}
                  orbitControlsRef={orbitControlsRef}
                  developLandRef={developLandRef}
                />
              </>
            )}
          </Canvas>
        </>
      )}
    </FullScreenContainer>
  );
}
