import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import gameBattleSign from '../../assets/models/gameLand-battleSign.glb';
import { EMISSION_COLOR_MAP } from '../../constants/colorMapConstants';

export default function GameLandBattleSign() {
  const { scene: battleSignScene } = useGLTF(gameBattleSign);

  useEffect(() => {
    battleSignScene.traverse((child) => {
      if (child.isMesh && child.name in EMISSION_COLOR_MAP) {
        const { color, intensity } = EMISSION_COLOR_MAP[child.name];
        child.material.emissive = new THREE.Color(color);
        child.material.emissiveIntensity = intensity;
      }
    });
  }, [battleSignScene]);

  return <primitive object={battleSignScene} />;
}
