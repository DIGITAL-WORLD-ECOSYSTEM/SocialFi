'use client';

import React, { useRef, useMemo, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { Space, SpaceAtmosphere } from './space';
import { FlowerOfLife } from './flower-of-life';
import { GlassCube } from './glass-cube';
import { SceneController } from './scene-controller';

export const HomeBackground = memo(() => {
  const scrollProgress = useRef(0);
  const r = 0.9;

  // Geometrias compartilhadas para performance
  const sharedSphereGeo = useMemo(() => new THREE.SphereGeometry(r, 32, 32), [r]);
  const sharedGlassGeo = useMemo(() => new THREE.SphereGeometry(r, 24, 24), [r]);
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    transmission: 0.9, roughness: 0.08, thickness: 0.4, ior: 1.15,
    transparent: true, opacity: 0.25, depthWrite: false
  }), []);

  return (
    <Space>
      <Canvas dpr={[1, 2]} gl={{ antialias: true, powerPreference: "high-performance" }}>
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