import { atom } from 'jotai';
import * as THREE from 'three';
import { BOAT_CONSTANTS } from '../constants/constants';

export const boatPositionAtom = atom({
  x: BOAT_CONSTANTS.INITIAL_BOAT_POSITION.x,
  y: BOAT_CONSTANTS.INITIAL_BOAT_POSITION.y,
  z: BOAT_CONSTANTS.INITIAL_BOAT_POSITION.z,
});
export const isShowLandingUIAtom = atom(true);
export const boatRotationAtom = atom(0);
export const isMovingAtom = atom(false);
export const isSoundPlayingAtom = atom(false);
export const isEnterIslandAtom = atom(false);
export const isOnBattleAtom = atom(false);
export const isLandMenuOpenAtom = atom(true);
export const isShowPerspectiveModalAtom = atom(false);
export const isShowAboutModalAtom = atom(false);
export const isShowSoldOutMessageAtom = atom(false);
export const mouseFollowerPositionAtom = atom(new THREE.Vector3());
export const playerHPAtom = atom(100);

export const monsterHPAtom = atom(100);

export const decreaseMonsterHPAtom = atom(
  (get) => get(monsterHPAtom),
  (get, set, damage) => {
    const currentHP = get(monsterHPAtom);
    set(monsterHPAtom, Math.max(currentHP - damage, 0));
  },
);
