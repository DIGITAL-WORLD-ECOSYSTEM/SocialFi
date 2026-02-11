'use client';

import React, { memo, PropsWithChildren, Suspense } from 'react';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Box from '@mui/material/Box';

/* ================================
   Configurações reutilizáveis
================================ */
const STARS_CONFIG = {
  radius: 120,
  depth: 60,
  count: 6000,
  factor: 4,
  fade: true,
};

const LIGHT_CONFIG = {
  ambientIntensity: 0.5,
  pointPosition: [-3, 2, 5] as [number, number, number],
  pointIntensity: 1.2,
};

/* ================================
   Componente de Fundo (Layout)
================================ */
export const Space = memo(function Space({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: '#010411',
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  );
});

/* ================================
   Atmosfera 3D (Cena)
================================ */
export const SpaceAtmosphere = memo(function SpaceAtmosphere() {
  return (
    <Suspense fallback={null}>
      <Stars {...STARS_CONFIG} />
      <ambientLight intensity={LIGHT_CONFIG.ambientIntensity} />
      <pointLight
        position={LIGHT_CONFIG.pointPosition}
        intensity={LIGHT_CONFIG.pointIntensity}
      />
    </Suspense>
  );
});

/* ================================
   Componente Completo com Canvas
================================ */
export const SpaceScene = memo(function SpaceScene() {
  return (
    <Space>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SpaceAtmosphere />
      </Canvas>
    </Space>
  );
});