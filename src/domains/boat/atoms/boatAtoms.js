import { atom } from 'jotai';
import { BOAT_CONSTANTS } from '@/domains/boat/constants/boat.constants';

export const boatPositionAtom = atom({
  x: BOAT_CONSTANTS.INITIAL_BOAT_POSITION.x,
  y: BOAT_CONSTANTS.INITIAL_BOAT_POSITION.y,
  z: BOAT_CONSTANTS.INITIAL_BOAT_POSITION.z,
});
export const boatRotationAtom = atom(0);
export const isBoatMovingAtom = atom(false);
