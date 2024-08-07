import { useRef, useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { gsap } from 'gsap/gsap-core';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import { isSoundPlayingAtom } from '../../utils/atoms';

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
import CameraDragHandler from '../CameraDragHandler/CameraDragHandler';
import FullScreenContainer from '../../styled-components/FullScreenContainer';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import LandingUI from '../LandingUI/LandingUI';

export default function Scene3D() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [verticalRotationAngle, setVerticalRotationAngle] = useState(0);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLandingUI, setShowLandingUI] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const [, setIsSoundPlaying] = useAtom(isSoundPlayingAtom);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const canvasRef = useRef(null);
  const boatRef = useRef();
  const cameraRef = useRef();

  const handleRotate = useCallback((deltaHorizontalAngle, deltaVerticalAngle) => {
    setRotationAngle((prevAngle) => prevAngle + deltaHorizontalAngle);
    setVerticalRotationAngle((prevAngle) => {
      return Math.max(-Math.PI / 4, Math.min(Math.PI / 4, prevAngle + deltaVerticalAngle));
    });
  }, []);

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
            {isCameraReady && (
              <Scene3DContents
                boatRef={boatRef}
                cameraRef={cameraRef}
                rotationAngle={rotationAngle}
                verticalRotationAngle={verticalRotationAngle}
              />
            )}
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
          </Canvas>
          <CameraDragHandler onRotate={handleRotate} />
        </>
      )}
    </FullScreenContainer>
  );
}
