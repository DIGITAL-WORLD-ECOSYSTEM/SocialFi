'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registro seguro do plugin no client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type SceneControllerProps = {
  scrollProgress: React.MutableRefObject<number>;
};

export function SceneController({ scrollProgress }: SceneControllerProps) {
  const { camera } = useThree();

  // Configuração inicial da câmera
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    camera.fov = 42;
    camera.position.set(0, 0.15, 5.4);
    camera.lookAt(-1.5, 0, 0);
    camera.updateProjectionMatrix(); // só aqui é necessário
  }, [camera]);

  // Controle via ScrollTrigger
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;
        scrollProgress.current = progress;

        // Anima apenas a posição (sem recalcular matriz de projeção)
        camera.position.z = THREE.MathUtils.lerp(5.4, 1.6, progress);
      }
    });

    return () => {
      trigger.kill();
    };
  }, [camera, scrollProgress]);

  return null;
}