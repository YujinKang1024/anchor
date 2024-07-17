import { useAtom } from 'jotai';
import { useEffect, useCallback } from 'react';

import limitedScroll from '../utils/limitedScroll';
import { isScrollingAtom } from '../utils/atoms';

export default function useScrollHandler(scrollRef, lastScrollTopRef, handleScroll) {
  const [, setIsScrolling] = useAtom(isScrollingAtom);

  const handleLimitedScroll = useCallback(() => {
    setIsScrolling(true);

    limitedScroll(scrollRef, lastScrollTopRef, handleScroll);

    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 300);
  }, [handleScroll, scrollRef, lastScrollTopRef, setIsScrolling]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleLimitedScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleLimitedScroll);
      }
    };
  }, [handleLimitedScroll, scrollRef]);

  return handleLimitedScroll;
}
