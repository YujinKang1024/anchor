import { vi } from 'vitest';

const Canvas = vi.fn(({ children, ...props }) => (
  <div data-testid="r3f-canvas" {...props}>
    {children}
  </div>
));

const useThree = vi.fn(() => ({
  scene: { add: vi.fn(), remove: vi.fn() },
  camera: {},
  gl: { setSize: vi.fn(), render: vi.fn() },
}));

const useFrame = vi.fn();

export { Canvas, useThree, useFrame };
