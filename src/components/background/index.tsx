'use client';

import React, { useRef, useMemo, useEffect, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { Space, SpaceAtmosphere } from './space';
import { FlowerOfLife } from './flower-of-life';
import { GlassCube } from './glass-cube';
import { SceneController } from './scene-controller';

const RADIUS = 0.9;

export const HomeBackground: React.FC = memo(() => {
  const scrollProgress = useRef<number>(0);

  // Geometrias compartilhadas para performance
  const sharedSphereGeo = useMemo(
    () => new THREE.SphereGeometry(RADIUS, 32, 32),
    []
  );

  const sharedGlassGeo = useMemo(
    () => new THREE.SphereGeometry(RADIUS, 24, 24),
    []
  );

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

  // Cleanup de recursos WebGL (boas práticas)
  useEffect(() => {
    return () => {
      sharedSphereGeo.dispose();
      sharedGlassGeo.dispose();
      glassMat.dispose();
    };
  }, [sharedSphereGeo, sharedGlassGeo, glassMat]);

  return (
    <Space>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <SpaceAtmosphere />
        <SceneController scrollProgress={scrollProgress} />

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