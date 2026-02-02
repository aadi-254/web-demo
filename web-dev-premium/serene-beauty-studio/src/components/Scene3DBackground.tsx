import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingSphereProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
}

const FloatingSphere = ({ position, scale = 1, color = '#C9A96E', speed = 1 }: FloatingSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
};

interface FloatingRibbonProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

const FloatingRibbon = ({ position, rotation = [0, 0, 0], scale = 1 }: FloatingRibbonProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, 0, 0),
      new THREE.Vector3(-1, 0.5, 0.5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, -0.5, -0.5),
      new THREE.Vector3(2, 0, 0),
    ]);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <tubeGeometry args={[curve, 64, 0.05, 8, false]} />
        <meshStandardMaterial
          color="#E8DFD8"
          transparent
          opacity={0.2}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
};

interface Scene3DProps {
  variant?: 'hero' | 'minimal' | 'contact';
}

const Scene3DContent = ({ variant = 'hero' }: Scene3DProps) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.3} />
      <pointLight position={[-10, -10, -5]} intensity={0.2} color="#C9A96E" />

      {variant === 'hero' && (
        <>
          <FloatingSphere position={[3, 1, -3]} scale={1.5} color="#C9A96E" speed={0.5} />
          <FloatingSphere position={[-3, -1, -4]} scale={1} color="#E8DFD8" speed={0.7} />
          <FloatingSphere position={[0, 2, -5]} scale={0.8} color="#E8D5D0" speed={0.6} />
          <FloatingRibbon position={[-2, 0, -2]} scale={0.8} />
          <FloatingRibbon position={[2, -1, -3]} rotation={[0.5, 0.5, 0]} scale={0.6} />
        </>
      )}

      {variant === 'minimal' && (
        <>
          <FloatingSphere position={[4, 2, -5]} scale={1.2} color="#C9A96E" speed={0.4} />
          <FloatingSphere position={[-4, -2, -6]} scale={0.8} color="#E8DFD8" speed={0.5} />
        </>
      )}

      {variant === 'contact' && (
        <>
          <FloatingSphere position={[3, 0, -4]} scale={1} color="#C9A96E" speed={0.3} />
          <FloatingRibbon position={[-3, 1, -3]} scale={0.5} />
        </>
      )}
    </>
  );
};

interface Scene3DBackgroundProps {
  variant?: 'hero' | 'minimal' | 'contact';
  className?: string;
}

const Scene3DBackground = ({ variant = 'hero', className = '' }: Scene3DBackgroundProps) => {
  // Check if we should disable 3D on mobile for performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return null; // Skip 3D on mobile for performance
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <Scene3DContent variant={variant} />
      </Canvas>
    </div>
  );
};

export default Scene3DBackground;
