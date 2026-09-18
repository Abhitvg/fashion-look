'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function GoldThread({ count = 40 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const t = time * 0.1 + i * 0.1;
      const x = Math.sin(t) * (Math.sin(i * 1.5) * 5 + 3);
      const y = Math.cos(t * 0.8) * (Math.cos(i * 0.5) * 4);
      const z = Math.sin(t * 1.2) * (Math.sin(i * 0.8) * 3);
      
      dummy.position.set(x, y, z - 2);
      dummy.rotation.set(x * 0.5, y * 0.5, z * 0.5);
      dummy.scale.setScalar(Math.max(0.1, Math.sin(i * 0.5 + time) * 0.2));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.rotation.y = time * 0.05;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial 
        color="#d4af37" 
        roughness={0.2}
        metalness={0.8}
        emissive="#d4af37"
        emissiveIntensity={0.2}
      />
    </instancedMesh>
  );
}

function AbstractFabric() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} position={[0, -1, -5]} rotation={[-Math.PI / 4, 0, 0]}>
        <torusKnotGeometry args={[3, 1.2, 256, 32]} />
        <meshStandardMaterial 
          color="#0a0a0a"
          roughness={0.1}
          metalness={0.9}
          wireframe={true}
          transparent
          opacity={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <PresentationControls 
          global 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <AbstractFabric />
          <GoldThread count={50} />
        </PresentationControls>
        
        <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={4} color="#000000" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
