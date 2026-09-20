'use client';

import { Canvas } from '@react-three/fiber';
import { Sparkles, Float, Icosahedron } from '@react-three/drei';

export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#5eead4" />
      <pointLight position={[-4, -2, -4]} intensity={25} color="#a78bfa" />

      <Sparkles count={140} scale={[10, 6, 6]} size={2.5} speed={0.3} color="#5eead4" opacity={0.6} />

      <Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.6}>
        <Icosahedron args={[1.4, 1]}>
          <meshStandardMaterial
            color="#0a0c12"
            emissive="#5eead4"
            emissiveIntensity={0.25}
            wireframe
          />
        </Icosahedron>
      </Float>
    </Canvas>
  );
}
