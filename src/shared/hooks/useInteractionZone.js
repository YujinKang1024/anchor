import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';

import { isEnterIslandAtom } from '@/domains/island/atoms';
import { boatStateAtom } from '@/domains/boat/atoms';

import { INTERACTION_ZONE } from '@/shared/constants';

export function useInteractionZone() {
  const [boatState] = useAtom(boatStateAtom);
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const [isInInteractionZone, setIsInInteractionZone] = useState(false);

  useEffect(() => {
    if (!isEnterIsland) {
      const distance = Math.sqrt(
        Math.pow(boatState.position.x - INTERACTION_ZONE.x, 2) +
          Math.pow(boatState.position.z - INTERACTION_ZONE.z, 2),
      );
      setIsInInteractionZone(distance <= INTERACTION_ZONE.radius);
    }
  }, [boatState, isEnterIsland]);

  return isInInteractionZone;
}
