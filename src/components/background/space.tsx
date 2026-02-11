'use client';

import React, { memo } from 'react';
import { Stars } from '@react-three/drei';
import Box from '@mui/material/Box';

export const Space = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ position: 'fixed', inset: 0, zIndex: -1, background: '#010411' }}>
      {children}
    </Box>
  );
});

export const SpaceAtmosphere = memo(() => (
  <>
    <Stars radius={120} depth={60} count={6000} factor={4} fade />
    <ambientLight intensity={0.5} />
    <pointLight position={[-3, 2, 5]} intensity={1.2} />
  </>
));