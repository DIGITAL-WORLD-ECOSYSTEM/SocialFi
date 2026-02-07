'use client';

import React, { useRef, useMemo, useEffect, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Edges } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Box from '@mui/material/Box';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
          
          let zoomCurve = self.progress < 0.5 
            ? gsap.utils.clamp(0, 1, self.progress * 2) 
            : gsap.utils.clamp(0, 1, 2 - self.progress * 2);
          
          zoomCurve = gsap.parseEase("power2.inOut")(zoomCurve);
          
          if (camera instanceof THREE.PerspectiveCamera) {
            camera.fov = 60 - (35 * zoomCurve); // Zoom levemente menos agressivo para não cortar o layout
            camera.position.z = THREE.MathUtils.lerp(6, 1.5, zoomCurve); // Afastado um pouco mais no início
            camera.updateProjectionMatrix();
          }
        }
      });
    });
    return () => ctx.revert();
  }, [camera, uniforms]);

  useFrame((state) => {
    uniforms.iTime.value = state.clock.getElapsedTime();
    meshRef.current.rotation.x += 0.0004;
    meshRef.current.rotation.y += 0.0006;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2, 64, 64, 64]} />
        
        {/* Ajuste 4: Wireframe mais sutil (Azul escuro com baixíssima opacidade) */}
        <Edges scale={1.002} threshold={15}>
          <lineBasicMaterial color="#1a3a6a" transparent opacity={0.04} />
        </Edges>

        <shaderMaterial
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false} // Melhora a renderização de transparências sobrepostas
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
            uniform vec2 iResolution;
            uniform float scrollProgress;
            varying vec2 vUv;
            varying vec3 vNormal;

            void mainImage(out vec4 O, vec2 I) {
                vec2 r = iResolution.xy;
                vec2 z;
                vec2 i;
                // Ajuste 3: Refinamento da escala do fractal para filamentos mais detalhados
                vec2 f = I * (z += 4.5 - 4.0 * abs(0.7 - dot(I = (I + I - r) / r.y, I)));
                
                float timeOffset = sin(iTime * 0.15) * 0.1;
                f.x += timeOffset;
                f.y -= timeOffset;
                
                float iterations = mix(9.0, 13.0, scrollProgress);
                
                for(O *= 0.0; i.y++ < iterations; 
                    O += (sin(f += cos(f.yx * i.y + i + iTime) / i.y + 0.7) + 1.0).xyyx * abs(f.x - f.y));
                
                O = tanh(7.0 * exp(z.x - 4.0 - I.y * vec4(-1, 1, 2, 0)) / O);
                
                // Ajuste 2: Cores mais equilibradas (menos saturadas no início)
                vec3 color1 = mix(vec3(0.05, 0.15, 0.6), vec3(0.7, 0.1, 0.4), scrollProgress); // Azul Profundo -> Magenta Suave
                vec3 color2 = mix(vec3(0.6, 0.1, 0.5), vec3(0.1, 0.7, 0.6), scrollProgress); // Roxo -> Teal
                vec3 colorMix = mix(color1, color2, sin(iTime * 0.3) * 0.5 + 0.5);
                
                float nebula = abs(sin(I.x * 0.01 + iTime * 0.25) * sin(I.y * 0.01 - iTime * 0.15)) * 0.4;
                O.rgb = mix(O.rgb, colorMix, nebula * (1.1 - length(O.rgb)));
            }

            void main() {
                vec4 fragColor;
                mainImage(fragColor, vUv * iResolution);
                
                float depthFactor = abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
                fragColor.rgb *= 0.6 + 0.4 * depthFactor;
                
                // Ciano Elétrico nas quinas (mais suave)
                float edge = 1.0 - max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)) * 2.0;
                edge = pow(edge, 5.0);
                fragColor.rgb += edge * vec3(0.2, 0.4, 0.9) * (0.5 + scrollProgress * 0.5);
                
                // Ajuste 1: Alfa dinâmico baseado no brilho para transparência real
                float alpha = clamp(length(fragColor.rgb) * 1.5, 0.0, 1.0);
                
                gl_FragColor = vec4(fragColor.rgb * 1.8, alpha);
            }
          `}
        />
      </mesh>
    </Float>
  );
});

export const HomeBackground = memo(() => {
  return (
    <Box sx={{ top: 0, left: 0, width: '100vw', height: '100vh', position: 'fixed', zIndex: -1, background: '#010411' }}>
      <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={60} />
        <Stars radius={120} depth={60} count={6000} factor={4} saturation={0} fade speed={0.8} />
        <ambientLight intensity={0.5} />
        <pointLight position={[-3, 2, 5]} intensity={1.2} color="#4488ff" />
        <GalacticVortex />
      </Canvas>
      {/* Vinheta para melhorar integração com o layout/texto */}
      <Box
        sx={{
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          background: 'radial-gradient(circle at center, transparent 30%, rgba(1, 4, 17, 0.8) 100%)',
          pointerEvents: 'none'
        }}
      />
    </Box>
  );
});