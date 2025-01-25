import { atom } from 'jotai';
import * as THREE from 'three';

export const playerHPAtom = atom(100);
export const monsterHPAtom = atom(100);

export const decreaseMonsterHPAtom = atom(
  (get) => get(monsterHPAtom),
  (get, set, damage) => {
    const currentHP = get(monsterHPAtom);
    set(monsterHPAtom, Math.max(currentHP - damage, 0));
  },
);

export const mouseFollowerPositionAtom = atom(new THREE.Vector3());
