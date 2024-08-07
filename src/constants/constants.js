import * as THREE from 'three';

export const LIGHT_POSITION = new THREE.Vector3(300, 480, -150);
export const DIRECTIONAL_LIGHT_COLOR = new THREE.Color(0xffffff);

export const VERTICAL_DRAG_LIMIT = 5;
export const DRAG_THRESHOLD = 10;

export const PLAYER_MAX_HP = 100;

export const INTERACTION_ZONE = {
  x: -749,
  z: -246,
  radius: 150,
};

export const BOAT_CONSTANTS = {
  INITIAL_BOAT_ROTATION: Math.PI / -12,
  INITIAL_BOAT_POSITION: new THREE.Vector3(155, 0, 394),
  MOVE_SPEED: 0.1,
  MOVE_DISTANCE: 1.8,
  ROTATION_SPEED: 0.08,
  ROTATION_ANGLE: Math.PI / 64,
};

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
