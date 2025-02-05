import * as THREE from 'three';

export const LIGHT_POSITION = new THREE.Vector3(300, 480, -150);
export const DIRECTIONAL_LIGHT_COLOR = new THREE.Color(0xffffff);

export const EMISSION_COLOR_MAP = {
  game_sign_emission: {
    color: new THREE.Color(0x8000ff),
    intensity: 5.0,
  },
  game_battle_machine_sign02: {
    color: new THREE.Color(0xf73a54),
    intensity: 1.5,
  },
  game_monitor_emission: {
    color: new THREE.Color(0xbbd2ff),
    intensity: 1.5,
  },
  game_vending_machine_emission: {
    color: new THREE.Color(0x424242),
    intensity: 30.0,
  },
};
