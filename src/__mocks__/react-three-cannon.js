const mockFn = () => {};

export const useBox = () => [mockFn, { position: [0, 0, 0], rotation: [0, 0, 0] }];
export const usePlane = () => [mockFn, { position: [0, 0, 0], rotation: [0, 0, 0] }];
export const useCylinder = () => [mockFn, { position: [0, 0, 0], rotation: [0, 0, 0] }];
export const useRaycastVehicle = () => ({ chassis: mockFn, wheels: [] });
export const Physics = ({ children }) => <group>{children}</group>;
