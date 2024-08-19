import React from 'react';

export const useBox = () => [React.useRef(), { position: [0, 0, 0], rotation: [0, 0, 0] }];
export const usePlane = () => [React.useRef(), { position: [0, 0, 0], rotation: [0, 0, 0] }];
export const useCylinder = () => [React.useRef(), { position: [0, 0, 0], rotation: [0, 0, 0] }];
export const useRaycastVehicle = () => ({
  chassis: React.useRef(),
  wheels: [React.useRef(), React.useRef(), React.useRef(), React.useRef()],
});
export const Physics = ({ children }) => <>{children}</>;
