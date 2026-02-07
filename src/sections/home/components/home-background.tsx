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

// ----------------------------------------------------------------------

// Função para criar a textura de estrela com brilho em cruz (Sparkle) do seu original
function createStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(200, 200, 255, 0.7)');
  gradient.addColorStop(1, 'rgba(40, 40, 120, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  ctx.globalCompositeOperation = 'lighten';
  ctx.fillStyle = 'rgba(250, 250, 255, 0.7)';
  ctx.fillRect(31, 0, 2, 64); // Linha vertical
  ctx.fillRect(0, 31, 64, 2); // Linha horizontal

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// ----------------------------------------------------------------------

const GalacticVortex = memo(() => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { camera, size } = useThree();

  const uniforms = useMemo(() => ({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(size.width, size.height) },
    scrollProgress: { value: 0 }
  }), [size.width, size.height]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        onUpdate: (self) => {
          uniforms.scrollProgress.value = self.progress;
          
          // Curva de Bell para Zoom: aproxima no meio e afasta no final
          const zoomCurve = gsap.parseEase("power2.inOut")(
            self.progress < 0.5 ? self.progress * 2 : 2 - self.progress * 2
          );
          
          // ✅ CORREÇÃO TS: Garantindo que a câmera é do tipo PerspectiveCamera
          if (camera instanceof THREE.PerspectiveCamera) {
            camera.position.z = THREE.MathUtils.lerp(8, 1.2, zoomCurve);
            camera.fov = THREE.MathUtils.lerp(60, 25, zoomCurve);
            camera.updateProjectionMatrix();
          }
        }
      });
    });
    return () => ctx.revert();
  }, [camera, uniforms]);

  useFrame((state) => {
    uniforms.iTime.value = state.clock.getElapsedTime();
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.z += 0.0015;
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2.8, 2.8, 2.8, 64, 64, 64]} />
        <shaderMaterial
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          uniforms={uniforms}
          vertexShader={`
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
              vUv = uv;
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float iTime;
            uniform float scrollProgress;
            uniform vec2 iResolution;
            varying vec2 vUv;
            varying vec3 vNormal;

            void main() {
                vec2 r = iResolution.xy;
                vec2 i = vec2(0.0);
                vec2 I = vUv * 2.0 - 1.0;
                
                vec2 f = I * (4.0 - 3.5 * abs(0.7 - dot(I, I)));
                float iterations = mix(8.0, 14.0, scrollProgress);
                
                vec4 O = vec4(0.0);
                for(float n=1.0; n < 14.0; n++) {
                    if(n > iterations) break;
                    f += cos(f.yx * n + iTime) / n + 0.7;
                    O += (sin(f.xyyx) + 1.0) * abs(f.x - f.y);
                }
                
                O = tanh(7.0 * exp(-4.0 - I.y * vec4(-1,1,2,0)) / O);
                
                vec3 col1 = mix(vec3(0.05, 0.1, 0.6), vec3(0.0, 0.8, 0.5), scrollProgress);
                vec3 col2 = mix(vec3(0.1, 0.4, 0.9), vec3(0.9, 0.7, 0.1), scrollProgress);
                vec3 finalCol = mix(col1, col2, sin(iTime * 0.3) * 0.5 + 0.5);

                float edge = pow(1.0 - max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)) * 2.0, 3.0);
                
                gl_FragColor = vec4(O.rgb * finalCol * 2.5 + (edge * col1), 1.0);
            }
          `}
        />
      </mesh>
    </Float>
  );
});

// ----------------------------------------------------------------------

export const HomeBackground = memo(({ sx, ...other }: any) => {
  const starTexture = useMemo(() => createStarTexture(), []);

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
          background: '#010411', // Azul escuro profundo (Space)
          pointerEvents: 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Canvas 
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
        
        {/* Estrelas com a textura de brilho personalizada */}
        <Stars 
          radius={120} 
          depth={60} 
          count={5000} 
          factor={5} 
          saturation={0} 
          fade 
          speed={0.8} 
        />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <GalacticVortex />
      </Canvas>

      {/* Vinheta para dar profundidade e destacar o texto central */}
      <Box
        sx={{
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          background: 'radial-gradient(circle at center, transparent 20%, rgba(1, 4, 17, 0.95) 100%)',
        }}
      />
    </Box>
  );
});

HomeBackground.displayName = 'HomeBackground';
