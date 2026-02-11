'use client';

import React, { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'; // <-- Adicione esta linha para resolver o erro 2503

export const GlassCube = memo(() => {
  const cubeRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    cubeRef.current.rotation.y = t * 0.05;
    cubeRef.current.rotation.x = Math.sin(t * 0.15) * 0.05;
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[5, 5, 5]} />
      <meshPhysicalMaterial
        transmission={0.85}
        roughness={0.12}
        thickness={0.6}
        ior={1.2}
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </mesh>
  );
});