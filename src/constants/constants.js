import * as THREE from 'three';

export const INITIAL_BOAT_POSITION_Y = 0;

export const LIGHT_POSITION = new THREE.Vector3(300, 480, -150);

export const DIRECTIONAL_LIGHT_COLOR = new THREE.Color(0xffffff);

export const MAX_SCROLL_SPEED = 0.000001;
export const SCROLL_BOTTOM_THRESHOLD = 0.99;
export const DRAG_THRESHOLD = 10;

export const CAMERA_CONSTANTS = {
  LATERAL_DISTANCE: 65,
  HEIGHT: 16,
  DISTANCE: -70,
};

export const OCEAN_CONSTANTS = {
  WAVE_HEIGHT: 2.0,
  WAVE_SPEED: 0.8,
  WATER_COLOR: new THREE.Color(0.35, 0.55, 0.85),
  CREST_COLOR: new THREE.Color(0.9, 0.8, 0.9),
  SHADOW_COLOR: new THREE.Color(0.7, 0.7, 0.8),
  FRESNEL_STRENGTH: 3.0,
  REFLECTION_STRENGTH: 0.28,
  FOG_COLOR: new THREE.Color(0.3, 0.5, 0.75),
  FOG_NEAR: 1,
  FOG_FAR: 1400,
  BRIGHTNESS: 1.18,
  CONTRAST: 1.2,
  SATURATION: 1.1,
  MAX_DEPTH: 50.0,
  MIN_DEPTH: 1.0,
};
