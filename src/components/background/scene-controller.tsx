'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const SceneController = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 42;
      camera.position.y = 0.15;
      camera.position.z = 5.4;
      camera.lookAt(-1.5, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
        if (camera instanceof THREE.PerspectiveCamera) {
          camera.position.z = THREE.MathUtils.lerp(5.4, 1.6, self.progress);
          camera.updateProjectionMatrix();
        }
      }
    });
    return () => trigger.kill();
  }, [camera, scrollProgress]);

  return null;
};