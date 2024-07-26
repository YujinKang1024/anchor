export default function limitedScroll(delta, currentPosition, setPosition) {
  const MAX_SCROLL_SPEED = 0.03;
  const newPosition = currentPosition + delta;

  if (Math.abs(delta) > MAX_SCROLL_SPEED) {
    delta = Math.sign(delta) * MAX_SCROLL_SPEED;
  }

  setPosition(Math.max(0, Math.min(newPosition, 1)));
}
