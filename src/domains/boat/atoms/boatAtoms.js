import { atom } from 'jotai';
import { BOAT_CONSTANTS } from '@/domains/boat/constants/boat.constants';

export const boatStateAtom = atom({
  position: {
    x: BOAT_CONSTANTS.INITIAL_BOAT_POSITION.x,
    y: BOAT_CONSTANTS.INITIAL_BOAT_POSITION.y,
    z: BOAT_CONSTANTS.INITIAL_BOAT_POSITION.z,
  },
  rotation: 0,
  isMoving: false,
});
