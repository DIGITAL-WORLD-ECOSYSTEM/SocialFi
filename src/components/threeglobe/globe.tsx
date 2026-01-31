'use client';

import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { useEffect, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import countries from './world.json';

// ----------------------------------------------------------------------

type ArcData = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

interface GlobeConfig {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

interface GlobeProps {
  data: ArcData[];
  globeConfig: GlobeConfig;
}

// ----------------------------------------------------------------------

export function World({ data, globeConfig }: GlobeProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);

  const config = useMemo(
    () => ({
      pointSize: globeConfig.pointSize ?? 2.5,
      globeColor: globeConfig.globeColor ?? '#020617',
      polygonColor: globeConfig.polygonColor ?? 'rgba(255,255,255,0.08)',
      atmosphereColor: globeConfig.atmosphereColor ?? '#60a5fa',
      atmosphereAltitude: globeConfig.atmosphereAltitude ?? 0.35,
      showAtmosphere: globeConfig.showAtmosphere ?? true,
      emissive: globeConfig.emissive ?? '#0f172a',
      emissiveIntensity: globeConfig.emissiveIntensity ?? 0.9,
      shininess: globeConfig.shininess ?? 40,
      arcTime: globeConfig.arcTime ?? 1600,
      arcLength: globeConfig.arcLength ?? 0.35,
      rings: globeConfig.rings ?? 6,
      maxRings: globeConfig.maxRings ?? 10,
    }),
    [globeConfig]
  );

  useEffect(() => {
    if (!globeRef.current) return;
    const globe = globeRef.current;

    // 🌍 Material do globo
    globe.globeMaterial(
      new THREE.MeshPhongMaterial({
        color: new THREE.Color(config.globeColor),
        emissive: new THREE.Color(config.emissive),
        emissiveIntensity: config.emissiveIntensity,
        shininess: config.shininess,
      })
    );

    // 🌐 Continentes
    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .hexPolygonColor(() => config.polygonColor);

    // 🔵 Hotspots estilo DEX (somente eles em pointsData)
    const hotspots = [
      { lat: 45, lng: -100, size: 1.6 },
      { lat: -15, lng: -60, size: 1.8 },
      { lat: 50, lng: 15, size: 1.5 },
      { lat: 5, lng: 20, size: 1.7 },
      { lat: 35, lng: 95, size: 2.0 },
      { lat: -25, lng: 135, size: 1.6 },
    ];

    globe
      .pointsData(hotspots)
      .pointLat((d: any) => d.lat)
      .pointLng((d: any) => d.lng)
      .pointColor(() => '#60a5fa')
      .pointAltitude(0.045)
      .pointRadius((d: any) => d.size)
      .pointsMerge(false);

    // 🌊 Rings pulsantes (DEX World style)
    globe
      .ringsData(hotspots)
      .ringLat((d: any) => d.lat)
      .ringLng((d: any) => d.lng)
      .ringColor(() => 'rgba(96,165,250,0.8)')
      .ringMaxRadius(7)
      .ringPropagationSpeed(2.4)
      .ringRepeatPeriod(1400);

    // 🚀 Arcos animados
    globe
      .arcsData(data)
      .arcStartLat((d: any) => d.startLat)
      .arcStartLng((d: any) => d.startLng)
      .arcEndLat((d: any) => d.endLat)
      .arcEndLng((d: any) => d.endLng)
      .arcColor((d: any) => d.color)
      .arcAltitude((d: any) => d.arcAlt)
      .arcStroke(0.7)
      .arcDashLength(config.arcLength)
      .arcDashGap(2.5)
      .arcDashInitialGap((d: any) => d.order)
      .arcDashAnimateTime(config.arcTime)
      .arcsTransitionDuration(1000);

    // 🌫 Atmosfera
    if (config.showAtmosphere) {
      globe
        .showAtmosphere(true)
        .atmosphereColor(config.atmosphereColor)
        .atmosphereAltitude(config.atmosphereAltitude);
    }
  }, [data, config]);

  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
      style={{
        background:
          'radial-gradient(circle at 30% 30%, #0f172a, #020617 60%, #000 100%)',
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 300]} fov={50} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={globeConfig.autoRotate}
        autoRotateSpeed={globeConfig.autoRotateSpeed || 0.6}
      />

      {/* 💡 Iluminação */}
      <ambientLight intensity={1.4} />
      <directionalLight position={[-300, 200, 300]} intensity={2.4} />
      <pointLight position={[200, 300, 200]} intensity={1.8} color="#60a5fa" />

      <group rotation={[-Math.PI / 2, 0, 0]}>
        <primitive object={new ThreeGlobe()} ref={globeRef} />
      </group>
    </Canvas>
  );
}
