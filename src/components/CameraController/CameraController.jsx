import useFollowBoat from '../../hooks/useFollowBoat';

export default function CameraController({ cameraRef, boatRef, controlsRef }) {
  useFollowBoat(cameraRef, boatRef, controlsRef);

  return null;
}
