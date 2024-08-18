import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import 'vitest-canvas-mock';
import Scene3D from '../components/Scene3D/Scene3D';

vi.mock('@react-three/postprocessing', () => ({
  EffectComposer: vi.fn(({ children }) => <div>{children}</div>),
  Bloom: vi.fn(() => null),
  DepthOfField: vi.fn(() => null),
  Vignette: vi.fn(() => null),
  BrightnessContrast: vi.fn(() => null),
  HueSaturation: vi.fn(() => null),
}));

vi.mock('../Scene3DContents/Scene3DContents', () => ({
  default: vi.fn(() => <div data-testid="scene3d-contents" />),
}));

vi.mock('../Scene3DUI/Scene3DUI', () => ({
  default: vi.fn(() => <div data-testid="scene3d-ui" />),
}));

vi.mock('../LoadingScreen/LoadingScreen', () => ({
  default: vi.fn(({ onLoadingComplete }) => (
    <div data-testid="loading-screen" onClick={onLoadingComplete} />
  )),
}));

vi.mock('../LandingUI/LandingUI', () => ({
  default: vi.fn(({ onStartButtonClick }) => (
    <div data-testid="landing-ui">
      <button data-testid="start-button" onClick={onStartButtonClick}>
        Weigh Anchor
      </button>
    </div>
  )),
}));

describe('Scene3D', () => {
  beforeEach(() => {
    globalThis.resetMockAtoms();
    vi.useFakeTimers();
  });

  afterEach(() => {
    globalThis.cleanupMockAtoms();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders loading screen initially', () => {
    render(<Scene3D />);
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
  });

  it('shows landing UI after loading completes', async () => {
    render(<Scene3D />);
    fireEvent.click(screen.getByTestId('loading-screen'));

    await act(async () => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('landing-ui')).toBeInTheDocument();
  });
});
