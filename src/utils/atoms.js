import { atom } from 'jotai';
import { BOAT_CONSTANTS } from '../constants/constants';

export const boatPositionAtom = atom({
  x: BOAT_CONSTANTS.INITIAL_BOAT_POSITION.x,
  y: BOAT_CONSTANTS.INITIAL_BOAT_POSITION.y,
  z: BOAT_CONSTANTS.INITIAL_BOAT_POSITION.z,
});
export const boatRotationAtom = atom(0);
export const isMovingAtom = atom(false);
export const isEnterIslandAtom = atom(false);
