import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { boatPositionAtom } from '../atoms/boatAtoms';
import { isEnterIslandAtom } from '../atoms/gameStateAtoms';

import { INTERACTION_ZONE } from '../constants/constants';

export function useInteractionZone() {
  const [boatPosition] = useAtom(boatPositionAtom);
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const [isInInteractionZone, setIsInInteractionZone] = useState(false);

  useEffect(() => {
    if (!isEnterIsland) {
      const distance = Math.sqrt(
        Math.pow(boatPosition.x - INTERACTION_ZONE.x, 2) +
          Math.pow(boatPosition.z - INTERACTION_ZONE.z, 2),
      );
      setIsInInteractionZone(distance <= INTERACTION_ZONE.radius);
    }
  }, [boatPosition, isEnterIsland]);

  return isInInteractionZone;
}
