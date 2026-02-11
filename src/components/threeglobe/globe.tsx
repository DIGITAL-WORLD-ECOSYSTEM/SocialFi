'use client';

import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import countries from './world.json';

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
  ambientLightIntensity?: number;
  directionalLightIntensity?: number;
  pointLightIntensity?: number;
  arcTime?: number;
  arcLength?: number;
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
  ambientLightIntensity: 1.2,
  directionalLightIntensity: 1.8,
  pointLightIntensity: 1.5,
  arcTime: 1600,
  arcLength: 0.35,
  initialCameraPosition: [0, 0, 300],
  autoRotate: false,
  autoRotateSpeed: 0.6,
  enableZoom: false,
  enablePan: false,
};

// ======================================================
// CUSTOM HOOK
// ======================================================

function useGlobe(
  globe: ThreeGlobe,
  data: ArcData[],
  hotspots: Hotspot[],
  config: Required<GlobeConfig>
) {
  const isLargeDataset = data.length > 50000;

  const material = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color(config.globeColor),
      emissive: new THREE.Color(config.emissive),
      emissiveIntensity: config.emissiveIntensity,
      shininess: config.shininess,
      transparent: true,
      opacity: 0.95,
    });
  }, [
    config.globeColor,
    config.emissive,
    config.emissiveIntensity,
    config.shininess,
  ]);

  useEffect(() => {
    if (!globe) return;

    globe.globeMaterial(material);

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
        .pointLat(obj => (obj as Hotspot).lat)
        .pointLng(obj => (obj as Hotspot).lng)
        .pointColor(obj => (obj as Hotspot).color ?? '#60a5fa')
        .pointAltitude(0.045)
        .pointRadius(obj => (obj as Hotspot).size)
        .pointsMerge(true);

      globe
        .ringsData(hotspots)
        .ringLat(obj => (obj as Hotspot).lat)
        .ringLng(obj => (obj as Hotspot).lng)
        .ringColor(() => 'rgba(96,165,250,0.8)')
        .ringMaxRadius(7)
        .ringPropagationSpeed(2.4)
        .ringRepeatPeriod(1400);
    }

    globe
      .arcsData(data)
      .arcStartLat(obj => (obj as ArcData).startLat)
      .arcStartLng(obj => (obj as ArcData).startLng)
      .arcEndLat(obj => (obj as ArcData).endLat)
      .arcEndLng(obj => (obj as ArcData).endLng)
      .arcColor(obj => (obj as ArcData).color)
      .arcAltitude(obj => (obj as ArcData).arcAlt)
      .arcStroke(0.5)
      .arcDashLength(isLargeDataset ? 1 : config.arcLength)
      .arcDashGap(isLargeDataset ? 0 : 2.5)
      .arcDashInitialGap(obj => (obj as ArcData).order)
      .arcDashAnimateTime(isLargeDataset ? 0 : config.arcTime)
      .arcsTransitionDuration(isLargeDataset ? 0 : 1000);

    if (config.showAtmosphere && !isLargeDataset) {
      globe
        .showAtmosphere(true)
        .atmosphereColor(config.atmosphereColor)
        .atmosphereAltitude(config.atmosphereAltitude);
    } else {
      globe.showAtmosphere(false);
    }

    return () => {
      globe.showAtmosphere(false);
      globe.arcsData([]);
      globe.pointsData([]);
      globe.ringsData([]);
      globe.hexPolygonsData([]);
    };
  }, [
    globe,
    data,
    hotspots,
    material,
    config.polygonColor,
    config.arcLength,
    config.arcTime,
    config.showAtmosphere,
    config.atmosphereColor,
    config.atmosphereAltitude,
    isLargeDataset,
  ]);
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
      />

      <ambientLight intensity={mergedConfig.ambientLightIntensity} />
      <directionalLight
        position={[-300, 200, 300]}
        intensity={mergedConfig.directionalLightIntensity}
      />
      <pointLight
        position={[200, 300, 200]}
        intensity={mergedConfig.pointLightIntensity}
        color="#60a5fa"
      />

      <primitive object={globeInstance} />
    </Canvas>
  );
}
