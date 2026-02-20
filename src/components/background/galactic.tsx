'use client';

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const PARAMS = {
  count: 100000,
  majorCount: 2500,
  gasCount: 45000,
  radius: 8.5,
  branches: 5,
  spin: 1.2,
  randomness: 0.22,
  randomnessPower: 3,
};

export function GalacticCore({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const starsRef = useRef<THREE.Points>(null!);
  const majorRef = useRef<THREE.Points>(null!);
  const gasRef = useRef<THREE.Points>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  // 1. GERAÇÃO DA TEXTURA RADIAL DAS ESTRELAS (Suavizada para 64px para evitar serrilhado)
  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  // 2. GERAÇÃO DOS DADOS GEOMÉTRICOS (POSIÇÕES E CORES RECALIBRADAS)
  const data = useMemo(() => {
    const pos = new Float32Array(PARAMS.count * 3);
    const cols = new Float32Array(PARAMS.count * 3);
    const mPos = new Float32Array(PARAMS.majorCount * 3);
    const mCols = new Float32Array(PARAMS.majorCount * 3);
    const gPos = new Float32Array(PARAMS.gasCount * 3);
    const gCols = new Float32Array(PARAMS.gasCount * 3);

    const colorTemp = new THREE.Color();
    
    // ✅ PALETA DE CORES DA REFERÊNCIA (Vibrante e Neon)
    const cCore = new THREE.Color('#ffffff'); // Branco Puro
    const cMid = new THREE.Color('#ff00ff');  // Magenta/Rosa Shock
    const cArm = new THREE.Color('#4400ff');  // Azul Elétrico/Roxo
    const cEdge = new THREE.Color('#000033'); // Azul Escuro de Profundidade

    // --- 2.1 ESTRELAS BASE (Com foco no núcleo denso) ---
    for (let i = 0; i < PARAMS.count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * PARAMS.radius;
      const spinAngle = radius * PARAMS.spin;
      const branchAngle = ((i % PARAMS.branches) / PARAMS.branches) * Math.PI * 2;

      // ✅ LÓGICA DE BOJO (BULGE): Cria a densidade central da imagem
      // 35% das estrelas são forçadas para uma distribuição esférica central
      const isBulge = Math.random() < 0.35; 

      if (isBulge && radius < 3.0) {
        const r = Math.pow(Math.random(), 0.5) * 1.8; 
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        pos[i3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5; // Disco levemente achatado
        pos[i3 + 2] = r * Math.cos(phi);
      } else {
        const mRX = Math.pow(Math.random(), PARAMS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * PARAMS.randomness * radius;
        const mRY = Math.pow(Math.random(), PARAMS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * PARAMS.randomness * radius * 0.5;
        const mRZ = Math.pow(Math.random(), PARAMS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * PARAMS.randomness * radius;

        pos[i3] = Math.cos(branchAngle + spinAngle) * radius + mRX;
        pos[i3 + 1] = mRY;
        pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + mRZ;
      }

      // ✅ GRADIENTE DE COR: Sincronizado com a imagem (Branco -> Rosa -> Azul)
      const distRatio = radius / PARAMS.radius;
      if (distRatio < 0.1) {
          colorTemp.copy(cCore);
      } else if (distRatio < 0.4) {
          colorTemp.copy(cCore).lerp(cMid, (distRatio - 0.1) / 0.3);
      } else {
          colorTemp.copy(cMid).lerp(cArm, (distRatio - 0.4) / 0.6);
      }

      cols[i3] = colorTemp.r; cols[i3+1] = colorTemp.g; cols[i3+2] = colorTemp.b;
    }

    // --- 2.2 ESTRELAS GIGANTES ---
    for (let i = 0; i < PARAMS.majorCount; i++) {
      const i3 = i * 3;
      const r = Math.random() * PARAMS.radius;
      const angle = r * PARAMS.spin + ((i % PARAMS.branches) / PARAMS.branches) * Math.PI * 2;
      mPos[i3] = Math.cos(angle) * r + (Math.random() - 0.5) * 0.5;
      mPos[i3+1] = (Math.random() - 0.5) * 0.6;
      mPos[i3+2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.5;

      const rand = Math.random();
      if (rand < 0.3) colorTemp.set('#ffffff'); 
      else if (rand < 0.6) colorTemp.set('#ff00ff'); // Alterado para rosa para combinar
      else colorTemp.set('#88ccff');
      mCols[i3] = colorTemp.r; mCols[i3+1] = colorTemp.g; mCols[i3+2] = colorTemp.b;
    }

    // --- 2.3 NUVENS DE GÁS (NEBULA) ---
    const gPalette = [new THREE.Color('#ff00ff'), new THREE.Color('#4400ff'), new THREE.Color('#00ffff')];
    for (let i = 0; i < PARAMS.gasCount; i++) {
      const i3 = i * 3;
      const r = Math.random() * PARAMS.radius * 0.85;
      const angle = r * PARAMS.spin + ((i % PARAMS.branches) / PARAMS.branches) * Math.PI * 2;
      gPos[i3] = Math.cos(angle) * r + (Math.random() - 0.5) * 2.5; // Maior espalhamento
      gPos[i3+1] = (Math.random() - 0.5) * 1.5;
      gPos[i3+2] = Math.sin(angle) * r + (Math.random() - 0.5) * 2.5;
      
      const col = gPalette[Math.floor(Math.random() * 3)].clone().multiplyScalar(0.5);
      gCols[i3] = col.r; gCols[i3+1] = col.g; gCols[i3+2] = col.b;
    }

    return { pos, cols, mPos, mCols, gPos, gCols };
  }, []);

  // 3. ANIMAÇÃO E LÓGICA DE CRESCIMENTO/VISIBILIDADE
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const sp = scrollProgress.current;

    if (groupRef.current) {
      // ✅ VISIBILIDADE: Inicia em 0.18 para sincronizar com a saída da Flor da Vida
      groupRef.current.visible = sp > 0.11 && sp < 0.65;
      
      // Rotações em eixos independentes para profundidade
      starsRef.current.rotation.y = t * 0.04;
      gasRef.current.rotation.y = t * 0.03;
      majorRef.current.rotation.y = t * 0.035;

      const majorMat = majorRef.current.material as THREE.PointsMaterial;
      if (majorMat) {
        majorMat.opacity = 0.6 + Math.sin(t * 2) * 0.3;
      }

      // Pulsação do brilho central
      const pulse = Math.sin(t * 1.5) * 0.05 + 1;
      if (glowRef.current) glowRef.current.scale.set(pulse, pulse, pulse);
      
      // ✅ CRESCIMENTO: Começa em 0.5 (50%) e expande com o scroll
      const s = 0.5 + (sp * 1.7); 
      groupRef.current.scale.set(s, s, s);
    }
  });
  
  return (
    // ✅ POSIÇÃO E INCLINAÇÃO ATUALIZADAS:
    // Position: [-8, -2, -15] -> Mantém à esquerda, um pouco abaixo e ao fundo.
    // Rotation: [1.0, 0, 0.4] -> 1.0 rad (~60°) tomba a galáxia para frente; 
    //                            0.4 rad dá uma inclinação lateral estilosa.
    <group 
      ref={groupRef} 
      position={[-8, -2, -15]} 
      rotation={[0.1, 0, -0.2]}
    >
      {/* Estrelas de Fundo (Pequenas) */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[data.cols, 3]} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.012} 
          alphaMap={starTexture} 
          transparent 
          vertexColors 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
          opacity={0.8} 
        />
      </points>

      {/* Estrelas Principais (Maiores) */}
      <points ref={majorRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.mPos, 3]} />
          <bufferAttribute attach="attributes-color" args={[data.mCols, 3]} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.04} 
          alphaMap={starTexture} 
          transparent 
          vertexColors 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </points>

      {/* Nuvens de Gás Galáctico */}
      <points ref={gasRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.gPos, 3]} />
          <bufferAttribute attach="attributes-color" args={[data.gCols, 3]} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.15} 
          alphaMap={starTexture} 
          transparent 
          vertexColors 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
          opacity={0.12} 
        />
      </points>

      {/* Núcleo Luminoso (Core) */}
      <group>
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshBasicMaterial color="#ffffcc" />
        </mesh>
        <mesh ref={glowRef}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial color="#ff6600" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );

  

}