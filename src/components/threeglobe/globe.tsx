'use client';

/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

import countries from 'src/assets/data/world.json';

// ======================================================
// TYPES
// ======================================================

export type ArcData = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type Hotspot = {
  lat: number;
  lng: number;
  size: number;
  color?: string;
};

export interface GlobeConfig {
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
  ambientLightIntensity?: number;
  directionalLightIntensity?: number;
  pointLightIntensity?: number;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialCameraPosition?: [number, number, number];
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
}

// ======================================================
// DEFAULT CONFIG
// ======================================================

const DEFAULT_CONFIG: Required<GlobeConfig> = {
  pointSize: 2.5,
  globeColor: '#020617',
  showAtmosphere: true,
  atmosphereColor: '#60a5fa',
  atmosphereAltitude: 0.35,
  emissive: '#0f172a',
  emissiveIntensity: 0.9,
  shininess: 40,
  polygonColor: 'rgba(255,255,255,0.7)',
  ambientLight: '#ffffff',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#60a5fa',
  ambientLightIntensity: 1.2,
  directionalLightIntensity: 1.8,
  pointLightIntensity: 1.5,
  arcTime: 1600,
  arcLength: 0.35,
  rings: 1,
  maxRings: 7,
  initialCameraPosition: [0, 0, 300],
  autoRotate: false,
  autoRotateSpeed: 0.6,
  enableZoom: false,
  enablePan: false,
};

// ======================================================
// CUSTOM HOOK (OTIMIZADO)
// ======================================================

function useGlobe(
  globe: ThreeGlobe,
  data: ArcData[],
  hotspots: Hotspot[],
  config: Required<GlobeConfig>
) {
  const isLargeDataset = data.length > 50000;

  const material = useMemo(() => new THREE.MeshPhongMaterial({
      color: new THREE.Color(config.globeColor),
      emissive: new THREE.Color(config.emissive),
      emissiveIntensity: config.emissiveIntensity,
      shininess: config.shininess,
      transparent: true,
      opacity: 0.95,
    }), [config.globeColor, config.emissive, config.emissiveIntensity, config.shininess]);

  // EFEITO 1: Estética e Materiais
  useEffect(() => {
    if (!globe) return;
    globe.globeMaterial(material);
    
    if (config.showAtmosphere && !isLargeDataset) {
      globe
        .showAtmosphere(true)
        .atmosphereColor(config.atmosphereColor)
        .atmosphereAltitude(config.atmosphereAltitude);
    } else {
      globe.showAtmosphere(false);
    }
  }, [globe, material, config.showAtmosphere, config.atmosphereColor, config.atmosphereAltitude, isLargeDataset]);

  // EFEITO 2: Geometria e Dados
  useEffect(() => {
    if (!globe) return undefined; // Ajuste para consistent-return

    if (countries?.features) {
      globe
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(isLargeDataset ? 2 : 3)
        .hexPolygonMargin(0.6)
        .hexPolygonColor(() => config.polygonColor);
    }

    if (hotspots.length) {
      globe
        .pointsData(hotspots)
        .pointLat((obj: any) => obj.lat)
        .pointLng((obj: any) => obj.lng)
        .pointColor((obj: any) => obj.color ?? '#60a5fa')
        .pointAltitude(0.045)
        .pointRadius((obj: any) => obj.size)
        .pointsMerge(true);

      globe
        .ringsData(hotspots)
        .ringLat((obj: any) => obj.lat)
        .ringLng((obj: any) => obj.lng)
        .ringColor(() => 'rgba(96,165,250,0.8)')
        .ringMaxRadius(config.maxRings)
        .ringPropagationSpeed(2.4)
        .ringRepeatPeriod(1400);
    }

    globe
      .arcsData(data)
      .arcStartLat((obj: any) => obj.startLat)
      .arcStartLng((obj: any) => obj.startLng)
      .arcEndLat((obj: any) => obj.endLat)
      .arcEndLng((obj: any) => obj.endLng)
      .arcColor((obj: any) => obj.color)
      .arcAltitude((obj: any) => obj.arcAlt)
      .arcStroke(0.5)
      .arcDashLength(isLargeDataset ? 1 : config.arcLength)
      .arcDashGap(isLargeDataset ? 0 : 2.5)
      .arcDashInitialGap((obj: any) => obj.order)
      .arcDashAnimateTime(isLargeDataset ? 0 : config.arcTime)
      .arcsTransitionDuration(isLargeDataset ? 0 : 1000);

    return () => {
      globe.arcsData([]).pointsData([]).ringsData([]).hexPolygonsData([]);
    };
  }, [globe, data, hotspots, config.polygonColor, config.arcLength, config.arcTime, config.maxRings, isLargeDataset]);

  // Cleanup final do material (GPU)
  useEffect(() => () => material.dispose(), [material]);
}

// ======================================================
// MAIN COMPONENT
// ======================================================

interface GlobeProps {
  data: ArcData[];
  hotspots?: Hotspot[];
  globeConfig?: GlobeConfig;
}

export function World({
  data,
  hotspots = [],
  globeConfig = {},
}: GlobeProps) {
  const mergedConfig = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...globeConfig }),
    [globeConfig]
  );

  const globeInstance = useMemo(() => new ThreeGlobe(), []);

  useGlobe(globeInstance, data, hotspots, mergedConfig);

  return (
    <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera
        makeDefault
        position={mergedConfig.initialCameraPosition}
        fov={50}
      />

      <OrbitControls
        enablePan={mergedConfig.enablePan}
        enableZoom={mergedConfig.enableZoom}
        autoRotate={mergedConfig.autoRotate}
        autoRotateSpeed={mergedConfig.autoRotateSpeed}
        enableDamping
        dampingFactor={0.05}
      />

      <ambientLight 
        color={mergedConfig.ambientLight} 
        intensity={mergedConfig.ambientLightIntensity} 
      />
      
      <directionalLight
        color={mergedConfig.directionalLeftLight}
        position={[-300, 200, 300]}
        intensity={mergedConfig.directionalLightIntensity}
      />

      <directionalLight
        color={mergedConfig.directionalTopLight}
        position={[0, 500, 0]}
        intensity={mergedConfig.directionalLightIntensity * 0.5}
      />

      <pointLight
        position={[200, 300, 200]}
        intensity={mergedConfig.pointLightIntensity}
        color={mergedConfig.pointLight}
      />

      <primitive object={globeInstance} />
    </Canvas>
  );
}