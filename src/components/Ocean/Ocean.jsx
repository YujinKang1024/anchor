import { useRef } from 'react';

export default function Ocean() {
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100, 100, 100]} />
      <meshStandardMaterial color="#fff" />
    </mesh>
  );
}
