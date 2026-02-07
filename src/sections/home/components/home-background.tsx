'use client';

import React, { useRef, useMemo, useEffect, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Box from '@mui/material/Box';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ======================================================
   FLOWER OF LIFE + GLASS CUBE (19 ESFERAS)
====================================================== */

const FlowerOfLifeCube = memo(
  ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
    const flowerRef = useRef<THREE.Group>(null!);
    const cubeRef = useRef<THREE.Mesh>(null!);

    const r = 0.9;

    /* ---------- 7 Núcleos Centrais ---------- */
    const nucleusPositions = useMemo(() => {
      const p: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0)];
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        p.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
      }
      return p;
    }, []);

    /* ---------- 6 Externas (raio duplo) ---------- */
    const outerPositions = useMemo(() => {
      const p: THREE.Vector3[] = [];
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        p.push(new THREE.Vector3(Math.cos(a) * r * 2, Math.sin(a) * r * 2, 0));
      }
      return p;
    }, []);

    /* ---------- 6 Intermediárias ---------- */
    const intermediatePositions = useMemo(() => {
      const p: THREE.Vector3[] = [];
      for (let i = 0; i < 6; i++) {
        const a1 = (i / 6) * Math.PI * 2;
        const a2 = ((i + 1) / 6) * Math.PI * 2;
        const mid = new THREE.Vector3(
          Math.cos(a1) * r + Math.cos(a2) * r,
          Math.sin(a1) * r + Math.sin(a2) * r,
          0
        ).multiplyScalar(0.5);
        p.push(mid);
      }
      return p;
    }, []);

    /* ---------- Cores dos 7 Núcleos ---------- */
    const covenantColors = useMemo(
      () => [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, 0.55, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(0, 0.7, 0.1),
        new THREE.Vector3(0, 0.2, 1),
        new THREE.Vector3(0.4, 0, 0.9),
        new THREE.Vector3(1, 0.3, 1)
      ],
      []
    );

    const uniforms = useMemo(
      () => ({
        iTime: { value: 0 },
        scrollProgress: { value: 0 },
        nucleusPos: { value: nucleusPositions },
        nucleusColor: { value: covenantColors }
      }),
      [nucleusPositions, covenantColors]
    );

    /* ---------- Material de Vidro ---------- */
    const glassMat = useMemo(
      () =>
        new THREE.MeshPhysicalMaterial({
          transmission: 0.9,
          roughness: 0.08,
          thickness: 0.4,
          ior: 1.15,
          transparent: true,
          opacity: 0.25,
          attenuationDistance: 5,
          attenuationColor: '#ffffff',
          depthWrite: false
        }),
      []
    );

    /* ---------- Loop ---------- */
    useFrame((state) => {
      const t = state.clock.getElapsedTime();
      uniforms.iTime.value = t;
      uniforms.scrollProgress.value = scrollProgress.current;

      flowerRef.current.rotation.z = t * 0.12;
      flowerRef.current.rotation.y = Math.cos(t * 0.3) * 0.15;

      cubeRef.current.rotation.y = t * 0.05;
      cubeRef.current.rotation.x = Math.sin(t * 0.15) * 0.05;
    });

    return (
      <group scale={0.42}>
        {/* Cubo */}
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

        {/* Flower of Life */}
        <group ref={flowerRef}>
          {/* 7 Núcleos */}
          {nucleusPositions.map((pos, i) => (
            <mesh key={`core-${i}`} position={pos}>
              <sphereGeometry args={[r, 64, 64]} />
              <shaderMaterial
                transparent
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                uniforms={uniforms}
                vertexShader={`
                  varying vec3 vPos;
                  void main() {
                    vPos = (modelMatrix * vec4(position,1.0)).xyz;
                    gl_Position = projectionMatrix * viewMatrix * vec4(vPos,1.0);
                  }
                `}
                fragmentShader={`
                  precision highp float;
                  #define NUCLEI 7
                  uniform float iTime;
                  uniform vec3 nucleusPos[NUCLEI];
                  uniform vec3 nucleusColor[NUCLEI];
                  varying vec3 vPos;

                  void main(){
                    vec3 col = vec3(0.0);
                    for(int i=0;i<NUCLEI;i++){
                      float d = distance(vPos, nucleusPos[i]);
                      col += nucleusColor[i] * exp(-d*3.0) * abs(sin(d*6.0-iTime));
                    }
                    float a = smoothstep(0.1,0.6,length(col));
                    gl_FragColor = vec4(col,a);
                  }
                `}
              />
            </mesh>
          ))}

          {/* 12 Esferas de Vidro */}
          {[...outerPositions, ...intermediatePositions].map((pos, i) => (
            <mesh key={`glass-${i}`} position={pos} material={glassMat}>
              <sphereGeometry args={[r, 48, 48]} />
            </mesh>
          ))}
        </group>
      </group>
    );
  }
);

/* ======================================================
   SCENE CONTROLLER
====================================================== */

const GalacticScene = memo(() => {
  const { camera } = useThree();
  const scrollProgress = useRef(0);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
        if (camera instanceof THREE.PerspectiveCamera) {
          camera.position.z = THREE.MathUtils.lerp(6, 1.6, self.progress);
          camera.updateProjectionMatrix();
        }
      }
    });
  }, [camera]);

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <FlowerOfLifeCube scrollProgress={scrollProgress} />
    </Float>
  );
});

/* ======================================================
   BACKGROUND
====================================================== */

export const HomeBackground = memo(() => (
  <Box sx={{ position: 'fixed', inset: 0, zIndex: -1, background: '#010411' }}>
    <Canvas dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <Stars radius={120} depth={60} count={6000} factor={4} fade />
      <ambientLight intensity={0.5} />
      <pointLight position={[-3, 2, 5]} intensity={1.2} />
      <GalacticScene />
    </Canvas>
  </Box>
));
