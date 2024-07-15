import { useRef } from 'react';

export default function Ocean() {
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} position={[0, -507, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2500, 2500, 10, 10]} />
      <meshStandardMaterial color="#acedFF" />
    </mesh>
  );
}
