import { render } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useGLTF } from '@react-three/drei';
import Boat from '../components/Boat/Boat';

vi.mock('@react-three/drei', () => ({
  useGLTF: vi.fn(),
}));

describe('Boat Component', () => {
  beforeEach(() => {
    useGLTF.mockReturnValue({
      scene: {
        traverse: vi.fn((callback) => {
          const mockMesh = { isMesh: true, castShadow: false, receiveShadow: false };
          callback(mockMesh);
        }),
      },
    });
  });

  it('renders without crashing and applies shadows to meshes', () => {
    const { container } = render(<Boat />);

    const mockScene = useGLTF().scene;

    expect(mockScene.traverse).toHaveBeenCalled();

    const primitive = container.querySelector('primitive');
    expect(primitive).toBeInTheDocument();
    expect(primitive.getAttribute('rotation')).toBe('0,-0.2617993877991494,0');
  });
});
