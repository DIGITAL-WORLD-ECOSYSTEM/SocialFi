'use client';

import React, { useRef, useMemo, useEffect, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Box from '@mui/material/Box';

// Registro do plugin fora do ciclo de render para performance
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ----------------------------------------------------------------------

// Componente interno otimizado para não disparar re-calculos pesados
const GalacticVortex = memo(() => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { camera } = useThree();

  const uniforms = useMemo(() => ({
    iTime: { value: 0 },
    scrollProgress: { value: 0 },
    uGlow: { value: 2.5 }
  }), []);

  useEffect(() => {
    // Sincroniza o movimento do cubo com o scroll de TODA a página
    // Usamos um contexto do GSAP para limpeza automática e performance
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        onUpdate: (self) => {
          uniforms.scrollProgress.value = self.progress;
          
          // Efeito de imersão: O cubo cresce gradualmente
          const zoomLevel = THREE.MathUtils.lerp(8, 1.8, self.progress);
          camera.position.z = zoomLevel;
          
          // O brilho aumenta conforme o progresso nas fases do Roadmap
          uniforms.uGlow.value = 2.5 + (self.progress * 4.0);
        }
      });
    });

    return () => ctx.revert(); // Limpeza eficiente de memória
  }, [camera, uniforms]);

  useFrame((state) => {
    uniforms.iTime.value = state.clock.getElapsedTime();
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.z += 0.001;
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2.8, 2.8, 2.8, 64, 64, 64]} />
        <shaderMaterial
          transparent
          blending={THREE.AdditiveBlending}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float iTime;
            uniform float scrollProgress;
            uniform float uGlow;
            varying vec2 vUv;
            void main() {
              vec2 f = vUv * 2.0 - 1.0;
              float o = 0.0;
              for(float i=1.0; i<12.0; i++) {
                f += cos(f.yx * i + iTime + scrollProgress * 5.0) / i + 0.7;
                o += length(f);
              }
              // Transição cromática: Identidade visual da DEX e Infraestrutura Digital
              vec3 col1 = vec3(0.05, 0.2, 0.7);
              vec3 col2 = vec3(0.0, 0.9, 0.8);
              vec3 finalCol = mix(col1, col2, scrollProgress);
              
              gl_FragColor = vec4(finalCol * (uGlow / o), 1.0);
            }
          `}
          uniforms={uniforms}
        />
      </mesh>
    </Float>
  );
});

// ----------------------------------------------------------------------

// ✅ MELHORIA: Exportamos com memo para evitar re-renderizações globais
export const HomeBackground = memo(({ sx, ...other }: any) => {
  return (
    <Box
      sx={[
        {
          top: 0,
          left: 0,
          width: 1,
          height: '100vh',
          position: 'fixed',
          zIndex: -1,
          background: '#020617',
          pointerEvents: 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Canvas 
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} // Foco em performance
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
        
        <Stars 
          radius={120} 
          depth={60} 
          count={7000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.6} 
        />
        
        <ambientLight intensity={0.4} />
        <GalacticVortex />
      </Canvas>

      <Box
        sx={{
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          background: 'radial-gradient(circle at center, transparent 15%, rgba(2, 6, 23, 0.9) 100%)',
        }}
      />
    </Box>
  );
});

HomeBackground.displayName = 'HomeBackground';