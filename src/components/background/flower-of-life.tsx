'use client';

import React, { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FlowerOfLife = memo(
  ({ scrollProgress, sharedSphereGeo, sharedGlassGeo, glassMat }: any) => {
    const flowerRef = useRef<THREE.Group>(null!);
    const r = 0.9;

    const nucleusPositions = useMemo(() => {
      const p: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0)];
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        p.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
      }
      return p;
    }, [r]);

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
    }, [r]);

    const covenantColors = useMemo(() => [
        new THREE.Vector3(1, 0, 0), new THREE.Vector3(1, 0.55, 0),
        new THREE.Vector3(1, 1, 0), new THREE.Vector3(0, 0.7, 0.1),
        new THREE.Vector3(0, 0.2, 1), new THREE.Vector3(0.4, 0, 0.9),
        new THREE.Vector3(1, 0.3, 1)
    ], []);

    const uniforms = useMemo(() => ({
        iTime: { value: 0 },
        scrollProgress: { value: 0 },
        nucleusPos: { value: nucleusPositions },
        nucleusColor: { value: covenantColors }
    }), [nucleusPositions, covenantColors]);

    useFrame((state) => {
      const t = state.clock.getElapsedTime();
      uniforms.iTime.value = t;
      uniforms.scrollProgress.value = scrollProgress.current;
      flowerRef.current.rotation.z = t * 0.12;
      flowerRef.current.rotation.y = Math.cos(t * 0.3) * 0.15;
    });

    return (
      <group ref={flowerRef}>
        {nucleusPositions.map((pos, i) => (
          <mesh key={`core-${i}`} position={pos} geometry={sharedSphereGeo}>
            <shaderMaterial
              transparent blending={THREE.AdditiveBlending}
              depthWrite={false} uniforms={uniforms}
              vertexShader={`varying vec3 vPos; void main() { vPos = (modelMatrix * vec4(position,1.0)).xyz; gl_Position = projectionMatrix * viewMatrix * vec4(vPos,1.0); }`}
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
                    col += nucleusColor[i] * exp(-d*3.2) * abs(sin(d*6.0-iTime * 1.5));
                  }
                  gl_FragColor = vec4(col, smoothstep(0.05, 0.5, length(col)));
                }
              `}
            />
          </mesh>
        ))}
        {intermediatePositions.map((pos, i) => (
          <mesh key={`glass-${i}`} position={pos} material={glassMat} geometry={sharedGlassGeo} />
        ))}
      </group>
    );
  }
);