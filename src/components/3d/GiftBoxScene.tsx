'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Environment, ContactShadows, RoundedBox } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface GiftBoxSceneProps {
  boxType: string;
}

function Box({ boxType }: { boxType: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });

  // Determine material based on boxType
  const getMaterialProps = () => {
    switch (boxType) {
      case 'velvet':
        return { color: '#800000', roughness: 0.9, metalness: 0.1 };
      case 'wood':
        return { color: '#3d2314', roughness: 0.4, metalness: 0.3 };
      case 'matte':
      default:
        return { color: '#1a1a1a', roughness: 0.6, metalness: 0.2 };
    }
  };

  return (
    <group position={[0, -0.5, 0]}>
      {/* Box Base */}
      <RoundedBox ref={mesh} args={[3, 1, 4]} radius={0.05} smoothness={4} castShadow>
        <meshStandardMaterial {...getMaterialProps()} />
      </RoundedBox>
      {/* Box Lid */}
      <RoundedBox position={[0, 0.6, 0]} args={[3.1, 0.2, 4.1]} radius={0.05} smoothness={4} castShadow>
        <meshStandardMaterial {...getMaterialProps()} />
      </RoundedBox>
      {/* Gold Ribbon / Ribbon placeholder */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <boxGeometry args={[0.4, 0.2, 4.15]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.65, 0]} castShadow>
        <boxGeometry args={[3.15, 0.2, 0.4]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

export default function GiftBoxScene({ boxType }: GiftBoxSceneProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 4, 8], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <PresentationControls 
          global 
          rotation={[Math.PI / 8, Math.PI / 4, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI, Math.PI]}
        >
          <Box boxType={boxType} />
        </PresentationControls>
        
        <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#000000" />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
