import { vi } from 'vitest';

const useGLTF = vi.fn(() => ({
  scene: {
    clone: vi.fn(() => ({
      traverse: vi.fn(),
    })),
  },
}));

useGLTF.preload = vi.fn();

const OrbitControls = vi.fn(() => null);
const Text = vi.fn(() => null);

export { useGLTF, OrbitControls, Text };
