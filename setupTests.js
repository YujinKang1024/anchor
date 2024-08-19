import '@testing-library/jest-dom';
import 'vitest-canvas-mock';
import { vi } from 'vitest';

const mockAtomValues = new Map();
const mockUseAtom = vi.fn((atom) => {
  const value = mockAtomValues.get(atom) ?? atom.init;
  const setValue = vi.fn((newValue) => {
    if (typeof newValue === 'function') {
      mockAtomValues.set(atom, newValue(value));
    } else {
      mockAtomValues.set(atom, newValue);
    }
  });
  return [value, setValue];
});

vi.mock('jotai', () => ({
  atom: (initialValue) => ({ init: initialValue }),
  useAtom: mockUseAtom,
}));

globalThis.mockAtomValues = mockAtomValues;
globalThis.resetMockAtoms = () => mockAtomValues.clear();
globalThis.cleanupMockAtoms = () => mockAtomValues.clear();
