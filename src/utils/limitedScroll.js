import { MAX_SCROLL_SPEED } from '../constants/constants';

export default function limitedScroll(scrollRef, lastScrollTopRef, handleScroll) {
  if (!scrollRef.current) return;

  const currentScrollTop = scrollRef.current.scrollTop;
  if (Math.abs(currentScrollTop - lastScrollTopRef.current) > MAX_SCROLL_SPEED) {
    scrollRef.current.scrollTop =
      lastScrollTopRef.current +
      Math.sign(currentScrollTop - lastScrollTopRef.current) * MAX_SCROLL_SPEED;
  } else {
    lastScrollTopRef.current = currentScrollTop;
  }

  handleScroll();
}
