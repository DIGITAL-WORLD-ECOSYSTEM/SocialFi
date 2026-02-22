'use client';

/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

// Importação da malha geográfica (GeoJSON)
import countries from 'src/assets/data/world.json';

// ======================================================
// 1. DEFINIÇÕES DE TIPOS (INTERFACES)
// ======================================================

export interface ArcData {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
}

export interface Hotspot {
  lat: number;
  lng: number;
  size: number;
  color?: string;
}

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

interface WorldProps {
  data: ArcData[];
  hotspots?: Hotspot[];
  globeConfig?: GlobeConfig;
}

// ======================================================
// 2. CONFIGURAÇÕES PADRÃO (FALLBACKS)
// ======================================================

const DEFAULT_CONFIG: Required<GlobeConfig> = {
  pointSize: 2.5,
  globeColor: '#020617',
  showAtmosphere: true,
  atmosphereColor: '#60a5fa',
  atmosphereAltitude: 0.15,
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
  initialCameraPosition: [0, 0, 380], // Posição segura para visualização
  autoRotate: false,
  autoRotateSpeed: 0.6,
  enableZoom: false,
  enablePan: false,
};

// ======================================================
// 3. HOOK DE LÓGICA DO GLOBO (IMPERATIVO)
// ======================================================

function useGlobeLogic(
  globe: ThreeGlobe,
  data: ArcData[],
  hotspots: Hotspot[],
  config: Required<GlobeConfig>
) {
  const isLargeDataset = data.length > 1000;

  // Gerenciamento de Material: MeshPhongMaterial para aceitar luzes
  const globeMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(config.globeColor),
      emissive: new THREE.Color(config.emissive),
      emissiveIntensity: config.emissiveIntensity,
      shininess: config.shininess,
      transparent: true,
      opacity: 0.95,
    });
    return material;
  }, [config.globeColor, config.emissive, config.emissiveIntensity, config.shininess]);

  // Efeito 1: Materiais e Atmosfera
  useEffect(() => {
    if (!globe) return;
    
    globe.globeMaterial(globeMaterial);
    
    if (config.showAtmosphere && !isLargeDataset) {
      globe
        .showAtmosphere(true)
        .atmosphereColor(config.atmosphereColor)
        .atmosphereAltitude(config.atmosphereAltitude);
    } else {
      globe.showAtmosphere(false);
    }
  }, [globe, globeMaterial, config.showAtmosphere, config.atmosphereColor, config.atmosphereAltitude, isLargeDataset]);

  // Efeito 2: Injeção de Dados e Geometria
  useEffect(() => {
    if (!globe) return;

    // Países (Hexágonos)
    if (countries?.features) {
      globe
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(isLargeDataset ? 2 : 3)
        .hexPolygonMargin(0.6)
        .hexPolygonColor(() => config.polygonColor);
    }

    // Pontos e Anéis
    if (hotspots.length > 0) {
      globe
        .pointsData(hotspots)
        .pointLat((d: object) => (d as Hotspot).lat)
        .pointLng((d: object) => (d as Hotspot).lng)
        .pointColor((d: object) => (d as Hotspot).color ?? config.pointLight)
        .pointAltitude(0.045)
        .pointRadius((d: object) => (d as Hotspot).size)
        .pointsMerge(true);

      globe
        .ringsData(hotspots)
        .ringLat((d: object) => (d as Hotspot).lat)
        .ringLng((d: object) => (d as Hotspot).lng)
        .ringColor(() => (t: number) => `rgba(96,165,250,${1 - t})`)
        .ringMaxRadius(config.maxRings)
        .ringPropagationSpeed(2.4)
        .ringRepeatPeriod(1400);
    }

    // Arcos
    globe
      .arcsData(data)
      .arcStartLat((d: object) => (d as ArcData).startLat)
      .arcStartLng((d: object) => (d as ArcData).startLng)
      .arcEndLat((d: object) => (d as ArcData).endLat)
      .arcEndLng((d: object) => (d as ArcData).endLng)
      .arcColor((d: object) => (d as ArcData).color)
      .arcAltitude((d: object) => (d as ArcData).arcAlt)
      .arcStroke(0.5)
      .arcDashLength(config.arcLength)
      .arcDashGap(2.5)
      .arcDashInitialGap((d: object) => (d as ArcData).order)
      .arcDashAnimateTime(config.arcTime)
      .arcsTransitionDuration(1000);

    return () => {
      globe.arcsData([]).pointsData([]).ringsData([]).hexPolygonsData([]);
    };
  }, [globe, data, hotspots, config, isLargeDataset]);

  // Limpeza de recursos da GPU
  useEffect(() => () => globeMaterial.dispose(), [globeMaterial]);
}

// ======================================================
// 4. COMPONENTE DE RENDERIZAÇÃO
// ======================================================

export function World({
  data,
  hotspots = [],
  globeConfig = {},
}: WorldProps) {
  const mergedConfig = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...globeConfig }),
    [globeConfig]
  );

  const globeInstance = useMemo(() => new ThreeGlobe(), []);

  useGlobeLogic(globeInstance, data, hotspots, mergedConfig);

  return (
    <Canvas 
      dpr={[1, 2]} 
      gl={{ antialias: true, alpha: true }}
    >
      {/* Definimos a câmera apenas aqui para evitar conflitos de renderização */}
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
        minDistance={150}
        maxDistance={500}
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

      <pointLight
        position={[200, 300, 200]}
        intensity={mergedConfig.pointLightIntensity}
        color={mergedConfig.pointLight}
      />

      {/* Primitive injeta o objeto ThreeGlobe puramente no grafo de cena */}
      <primitive object={globeInstance} />
    </Canvas>
  );
}