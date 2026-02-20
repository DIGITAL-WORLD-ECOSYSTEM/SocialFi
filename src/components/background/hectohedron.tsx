'use client';

import * as THREE from 'three';
import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

// ----------------------------------------------------------------------

type HectohedronProps = {
  scrollProgress: React.MutableRefObject<number>;
};

export const Hectohedron = memo(({ scrollProgress }: HectohedronProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const sp = scrollProgress.current;

    // ✅ LÓGICA DE EXCLUSIVIDADE CTA (Gatilho: 0.88)
    // O objeto só existe visualmente na última seção do roteiro.
    if (sp > 0.88) {
      // Ativa a renderização
      meshRef.current.visible = true;

      // Normaliza o progresso interno da seção (0 a 1)
      const omegaFactor = (sp - 0.88) / 0.12;

      // 1. ANIMAÇÃO DE ROTAÇÃO (Mais dinâmica para o fechamento)
      meshRef.current.rotation.y = t * 0.15; 
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;

      // 2. ESCALA E IMPACTO
      // O objeto "nasce" do centro e cresce conforme o mergulho da câmera
      const targetScale = (1.2 * omegaFactor) + Math.sin(t * 0.5) * 0.02;
      meshRef.current.scale.setScalar(targetScale);

      // 3. MATERIAL E BRILHO (Vision Pro Style)
      if (materialRef.current) {
        // Transição suave de opacidade (fade-in)
        materialRef.current.opacity = THREE.MathUtils.lerp(0, 0.45, omegaFactor);
        // Aumenta a espessura do "vidro" para distorcer a luz no final
        materialRef.current.thickness = THREE.MathUtils.lerp(0.5, 1.5, omegaFactor);
      }
    } else {
      // ✅ DESLIGA O OBJETO: Invisível em todas as outras seções (Hero até FAQs)
      if (meshRef.current) {
        meshRef.current.visible = false;
      }
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      visible={false} // Começa invisível por padrão
      castShadow 
      receiveShadow
    >
      {/* Geometria Hectohedron (Icosaedro com detalhamento técnico) */}
      <icosahedronGeometry args={[4.2, 1]} />

      <meshPhysicalMaterial
        ref={materialRef}
        color="#ffffff"
        metalness={0.1}
        roughness={0.02}
        transmission={0.96} // Alta refração
        ior={1.45}          // Índice de refração do cristal
        transparent
        opacity={0}         // Começa zerado para o fade-in controlado pelo useFrame
        depthWrite={false}
        side={THREE.DoubleSide}
      />

      {/* Aramado Tecnológico (Edges) */}
      <Edges 
        threshold={15} 
        color="#6fa8ff" 
      >
        <meshBasicMaterial 
          transparent 
          opacity={0.3} 
          blending={THREE.AdditiveBlending} 
        />
      </Edges>
    </mesh>
  );
});

Hectohedron.displayName = 'Hectohedron';