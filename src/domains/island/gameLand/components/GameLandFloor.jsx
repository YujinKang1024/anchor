export const GameLandFloor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-390, 4.5, -290]}>
      <planeGeometry args={[400, 300]} />
      <meshStandardMaterial visible={false} />
    </mesh>
  );
};
