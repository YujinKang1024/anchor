import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { boatPositionAtom } from '../utils/atoms';

import { INTERACTION_ZONE } from '../constants/constants';

export function useInteractionZone() {
  const [boatPosition] = useAtom(boatPositionAtom);
  const [isInInteractionZone, setIsInInteractionZone] = useState(false);

  useEffect(() => {
    const distance = Math.sqrt(
      Math.pow(boatPosition.x - INTERACTION_ZONE.x, 2) +
        Math.pow(boatPosition.z - INTERACTION_ZONE.z, 2),
    );
    setIsInInteractionZone(distance <= INTERACTION_ZONE.radius);
  }, [boatPosition]);

  return isInInteractionZone;
}
