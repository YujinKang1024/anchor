import { atom } from 'jotai';

export const playerHPAtom = atom(100);
export const monsterHPAtom = atom(100);

export const decreaseMonsterHPAtom = atom(
  (get) => get(monsterHPAtom),
  (get, set, damage) => {
    const currentHP = get(monsterHPAtom);
    set(monsterHPAtom, Math.max(currentHP - damage, 0));
  },
);
