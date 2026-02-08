'use client';

/**
 * ======================================================
 * IMPORTS PRINCIPAIS
 * ======================================================
 *
 * React:
 * - hooks básicos (useRef, useMemo, useEffect)
 * - memo para evitar re-renderizações desnecessárias
 *
 * React Three Fiber:
 * - Canvas: root do WebGL
 * - useFrame: loop de animação (render loop)
 * - useThree: acesso à câmera, cena e renderer
 *
 * Drei:
 * - Float: animação flutuante procedural
 * - PerspectiveCamera: câmera controlada por React
 * - Stars: background procedural de estrelas
 *
 * THREE:
 * - core math, materiais e geometria
 *
 * GSAP:
 * - ScrollTrigger: sincronização da animação com scroll
 *
 * MUI:
 * - Box: container do background fixo
 */

import React, { useRef, useMemo, useEffect, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Box from '@mui/material/Box';

/**
 * ======================================================
 * REGISTRO DO PLUGIN GSAP (CLIENT-SIDE SAFE)
 * ======================================================
 *
 * Evita erro em SSR / Next.js
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ======================================================
   FLOWER OF LIFE + GLASS CUBE (19 ESFERAS)
====================================================== */

/**
 * Componente principal do OBJETO 3D.
 *
 * Responsabilidade:
 * - criar a geometria
 * - definir materiais e shaders
 * - aplicar animações contínuas (useFrame)
 *
 * NÃO controla câmera.
 * NÃO controla scroll diretamente.
 */
const FlowerOfLifeCube = memo(
  ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {

    /**
     * Referências diretas para objetos THREE
     * (necessárias para animação imperativa)
     */
    const flowerRef = useRef<THREE.Group>(null!);
    const cubeRef = useRef<THREE.Mesh>(null!);

    /**
     * Raio base das esferas
     * Serve como unidade de proporção do objeto inteiro
     */
    const r = 0.9;

    /* ---------- 7 Núcleos Centrais ---------- */
    /**
     * Cria a geometria central da Flower of Life:
     * - 1 esfera no centro
     * - 6 esferas ao redor em círculo perfeito
     *
     * useMemo:
     * - evita recalcular vetores a cada render
     */
    const nucleusPositions = useMemo(() => {
      const p: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0)];

      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        p.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
      }

      return p;
    }, []);

    /* ---------- 6 Externas (raio duplo) ---------- */
    /**
     * Segunda camada da geometria:
     * - esferas no dobro do raio
     */
    const outerPositions = useMemo(() => {
      const p: THREE.Vector3[] = [];

      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        p.push(new THREE.Vector3(Math.cos(a) * r * 2, Math.sin(a) * r * 2, 0));
      }

      return p;
    }, []);

    /* ---------- 6 Intermediárias ---------- */
    /**
     * Esferas intermediárias:
     * - média vetorial entre duas esferas adjacentes
     * - fecha o padrão geométrico da Flower of Life
     */
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
    /**
     * Paleta simbólica (covenant colors)
     * Cada cor corresponde a um núcleo central
     */
    const covenantColors = useMemo(
      () => [
        new THREE.Vector3(1, 0, 0),     // vermelho
        new THREE.Vector3(1, 0.55, 0),  // laranja
        new THREE.Vector3(1, 1, 0),     // amarelo
        new THREE.Vector3(0, 0.7, 0.1), // verde
        new THREE.Vector3(0, 0.2, 1),   // azul
        new THREE.Vector3(0.4, 0, 0.9), // índigo
        new THREE.Vector3(1, 0.3, 1)    // violeta
      ],
      []
    );

    /* ---------- Uniforms do Shader ---------- */
    /**
     * Uniforms compartilhados entre todas as esferas:
     * - iTime: tempo contínuo
     * - scrollProgress: estado global do scroll
     * - nucleusPos / nucleusColor: dados da geometria
     */
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
    /**
     * Material físico para as esferas externas
     * Simula vidro com transmissão de luz
     */
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

    /* ---------- Loop de Animação ---------- */
    /**
     * Executado a cada frame (~60fps)
     * Responsável por:
     * - atualizar tempo do shader
     * - aplicar rotações sutis e orgânicas
     */
    useFrame((state) => {
      const t = state.clock.getElapsedTime();

      uniforms.iTime.value = t;
      uniforms.scrollProgress.value = scrollProgress.current;

      flowerRef.current.rotation.z = t * 0.12;
      flowerRef.current.rotation.y = Math.cos(t * 0.3) * 0.15;

      cubeRef.current.rotation.y = t * 0.05;
      cubeRef.current.rotation.x = Math.sin(t * 0.15) * 0.05;
    });

    /**
     * ======================================================
     * RENDER DO OBJETO 3D
     * ======================================================
     */
    return (
      <group scale={0.42} position={[0.12, -0.08, 0]}>
        {/* Cubo de vidro externo */}
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
          {/* 7 Núcleos com shader custom */}
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

          {intermediatePositions.map((pos, i) => (
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

/**
 * Controlador da cena:
 * - controla câmera
 * - conecta scroll → câmera
 * - injeta scrollProgress no objeto
 */
const GalacticScene = memo(() => {
  const { camera } = useThree();
  const scrollProgress = useRef(0);

  /**
   * Configuração inicial da câmera (estado HERO)
   * Executa apenas uma vez no mount
   */
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 42;
      camera.position.y = 0.15;
      camera.position.z = 5.4;
      camera.lookAt(-1.5, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  /**
   * ScrollTrigger global
   * Controla a aproximação da câmera conforme o usuário navega
   */
  useEffect(() => {
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,

      onUpdate: (self) => {
        scrollProgress.current = self.progress;

        if (camera instanceof THREE.PerspectiveCamera) {
          const heroZ = 5.4;
          const endZ = 1.6;

          camera.position.z = THREE.MathUtils.lerp(
            heroZ,
            endZ,
            self.progress
          );

          camera.updateProjectionMatrix();
        }
      }
    });
  }, [camera]);

  /**
   * Float adiciona movimento orgânico contínuo
   * (não relacionado ao scroll)
   */
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <FlowerOfLifeCube scrollProgress={scrollProgress} />
    </Float>
  );
});

/* ======================================================
   BACKGROUND
====================================================== */

/**
 * Background fixo:
 * - ocupa a viewport inteira
 * - fica atrás de todas as seções
 * - contém Canvas, câmera, luzes e cena
 */
export const HomeBackground = memo(() => (
  <Box sx={{ position: 'fixed', inset: 0, zIndex: -1, background: '#010411' }}>
    <Canvas dpr={[1, 2]}>
      {/* Câmera default do Canvas */}
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />

      {/* Background procedural */}
      <Stars radius={120} depth={60} count={6000} factor={4} fade />

      {/* Iluminação básica */}
      <ambientLight intensity={0.5} />
      <pointLight position={[-3, 2, 5]} intensity={1.2} />

      {/* Cena principal */}
      <GalacticScene />
    </Canvas>
  </Box>
));
