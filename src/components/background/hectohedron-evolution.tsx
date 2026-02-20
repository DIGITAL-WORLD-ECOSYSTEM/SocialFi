'use client';

import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

// ----------------------------------------------------------------------

type Props = {
  scrollProgress: React.MutableRefObject<number>;
};

export function EvolutionController({ scrollProgress }: Props) {
  const { camera, size } = useThree();
  
  // Breakpoints para garantir que o objeto 3D não saia da tela
  const isMobile = size.width < 600;
  const isTablet = size.width >= 600 && size.width < 1200;

  useFrame(() => {
    const sp = scrollProgress.current;

    /**
     * FASE 1: HERO (0.0 a 0.2) - Bloco A
     * Texto à Direita -> Objeto à Esquerda
     */
    if (sp <= 0.2) {
      const targetX = isMobile ? 0 : -2.5;
      const targetZ = isMobile ? 12 : 6;
      const targetY = isMobile ? 1 : 0;

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    }

    /**
     * FASE 2: CONTEÚDO CENTRAL (0.2 a 0.88) - Bloco B
     * Seções de recursos e Roadmap. O objeto flutua suavemente no centro ou alterna.
     */
    else if (sp > 0.2 && sp <= 0.88) {
      // Movimento sutil de "respiração" da câmera para manter o dinamismo
      const breath = Math.sin(Date.now() * 0.001) * 0.5;
      
      const targetX = isMobile ? 0 : 2.5; // Alterna para a direita se o texto for à esquerda
      const targetZ = isMobile ? 15 : 10;

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    }

    /**
     * FASE 3: CTA FINAL / ÔMEGA (0.88 a 1.0) - Bloco C
     * O objeto deve "saltar" para dentro do Banner CTA.
     * Texto à Direita -> Objeto à Esquerda (compensando o layout row-reverse)
     */
    else if (sp > 0.88) {
      const t = (sp - 0.88) / 0.12; // Progresso interno da seção final

      // X: No Desktop, deslocamos para a esquerda (-3.2) para alinhar com o render3DSpace()
      const targetX = isMobile ? 0 : -3.2;
      
      // Y: Ajuste de altura para centralizar no card do banner
      const targetY = isMobile ? -0.5 : 0;

      // Z: Zoom agressivo (Dolly-in). No mobile ficamos em 10, no desktop em 4.5 para "saltar"
      const targetZ = isMobile ? 10 : 4.8;

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.1);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
    }

    // Mantém o foco sempre no centro do Hectohedron para evitar distorções de perspectiva
    camera.lookAt(0, 0, 0);
  });

  return null;
}