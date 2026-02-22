'use client';

/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { memo, useRef, useMemo, useEffect } from 'react';
import { Float, PerspectiveCamera } from '@react-three/drei';

import { GlassCube } from './glass-cube';
import { GalacticCore } from './galactic';
import { EventHorizon } from './event-horizon';
import { FlowerOfLife } from './flower-of-life';
import { Space, SpaceAtmosphere } from './space';
import { SceneController } from './scene-controller';
// ✅ COMPONENTES DE FASE (ALFA, EVOLUÇÃO, ÔMEGA)
import { StellarEvolution } from './stellar-evolution';

// ----------------------------------------------------------------------

const RADIUS = 0.9;

export const HomeBackground: React.FC = memo(() => {
  const scrollProgress = useRef<number>(0);

  // Geometrias compartilhadas para performance (Evita recriar buffers na GPU)
  const sharedSphereGeo = useMemo(() => new THREE.SphereGeometry(RADIUS, 32, 32), []);

  const sharedGlassGeo = useMemo(() => new THREE.SphereGeometry(RADIUS, 24, 24), []);

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        transmission: 0.9,
        roughness: 0.08,
        thickness: 0.4,
        ior: 1.15,
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
      }),
    []
  );

  // Cleanup de recursos WebGL (Essencial para performance e evitar Memory Leaks)
  useEffect(
    () => () => {
      sharedSphereGeo.dispose();
      sharedGlassGeo.dispose();
      glassMat.dispose();
    },
    [sharedSphereGeo, sharedGlassGeo, glassMat]
  );

  return (
    <Space>
      <Canvas
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          powerPreference: 'high-performance',
          alpha: true 
        }}
      >
        {/* ✅ Câmera com alcance ampliado (far: 5000) para suportar a profundidade galáctica */}
        <PerspectiveCamera makeDefault position={[0, 0, 6]} far={5000} />
        
        <SpaceAtmosphere />
        
        {/* Controlador de Sincronização Scroll -> Three.js */}
        <SceneController scrollProgress={scrollProgress} />
        
        {/* --- 🌌 FASE 2 & 3: EVOLUÇÃO E ÔMEGA --- */}
        
        {/* StellarEvolution: Transição cinematográfica (Partículas/Flash) */}
        <StellarEvolution scrollProgress={scrollProgress} />
        
        {/* GalacticCore: Formação da Galáxia Pro (Posicionada à esquerda) */}
        <GalacticCore scrollProgress={scrollProgress} />

        {/* EventHorizon: A Singularidade Final (Buraco Negro) */}
        <EventHorizon scrollProgress={scrollProgress} />

        {/* --- 💎 FASE 1: O ALFA (INÍCIO) --- */}
        
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <group scale={0.42} position={[0.12, -0.08, 0]}>
            <GlassCube />
            <FlowerOfLife
              scrollProgress={scrollProgress}
              sharedSphereGeo={sharedSphereGeo}
              sharedGlassGeo={sharedGlassGeo}
              glassMat={glassMat}
            />
          </group>
        </Float>
      </Canvas>
    </Space>
  );
});

HomeBackground.displayName = 'HomeBackground';