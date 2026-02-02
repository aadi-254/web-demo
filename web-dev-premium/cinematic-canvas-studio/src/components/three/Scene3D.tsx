import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  scale?: number;
}

const FloatingShape = ({ position, color, speed = 1, distort = 0.3, scale = 1 }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.002 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const FloatingTorus = ({ position, color, scale = 1 }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <Torus ref={meshRef} args={[1, 0.3, 16, 100]} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </Torus>
    </Float>
  );
};

const FloatingBox = ({ position, color, scale = 1 }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={0.6}>
      <Box ref={meshRef} args={[1, 1, 1]} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.7}
          wireframe
        />
      </Box>
    </Float>
  );
};

const CameraController = () => {
  const { camera } = useThree();
  const { scrollY } = useScrollProgress();

  useFrame(() => {
    // Smooth camera movement based on scroll
    const targetY = -scrollY * 0.001;
    const targetZ = 8 + scrollY * 0.002;
    
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.lookAt(0, camera.position.y + 1, 0);
  });

  return null;
};

const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 30;
      pos[i + 1] = (Math.random() - 0.5) * 30;
      pos[i + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#d4a843"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Scene3DContent = () => {
  const goldColor = "#d4a843";
  const dimGoldColor = "#8b7635";

  return (
    <>
      <CameraController />
      
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#fff5e6" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#d4a843" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#d4a843"
      />

      {/* Floating 3D shapes */}
      <FloatingShape position={[-4, 2, -3]} color={goldColor} speed={0.8} distort={0.4} scale={0.8} />
      <FloatingShape position={[4, -1, -5]} color={dimGoldColor} speed={1.2} distort={0.2} scale={1.2} />
      <FloatingTorus position={[3, 3, -4]} color={goldColor} scale={0.6} />
      <FloatingTorus position={[-3, -2, -6]} color={dimGoldColor} scale={0.4} />
      <FloatingBox position={[5, 0, -8]} color={goldColor} scale={0.5} />
      <FloatingBox position={[-5, 1, -7]} color={dimGoldColor} scale={0.7} />

      {/* Particle field */}
      <Particles />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0a', 5, 25]} />
    </>
  );
};

interface Scene3DProps {
  className?: string;
}

const Scene3D = ({ className }: Scene3DProps) => {
  return (
    <div className={`fixed inset-0 -z-10 ${className || ''}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <Scene3DContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
