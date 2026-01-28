'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.2, 64, 64]}>
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  );
}

function FloatingNode({
  position,
  color,
  size = 0.12,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime + offset;
      meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
      meshRef.current.position.x = position[0] + Math.cos(t * 0.6) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function ConnectionLines({ nodes }: { nodes: [number, number, number][] }) {
  const linesRef = useRef<THREE.Group>(null);

  const connections = useMemo(() => {
    const result: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    const center = new THREE.Vector3(0, 0, 0);

    for (const node of nodes) {
      result.push({
        start: center.clone(),
        end: new THREE.Vector3(...node),
      });
    }

    for (let i = 0; i < nodes.length; i++) {
      const j = (i + 1) % nodes.length;
      const dist = new THREE.Vector3(...nodes[i]).distanceTo(new THREE.Vector3(...nodes[j]));
      if (dist < 3.5) {
        result.push({
          start: new THREE.Vector3(...nodes[i]),
          end: new THREE.Vector3(...nodes[j]),
        });
      }
    }

    return result;
  }, [nodes]);

  const lineObjects = useMemo(() => {
    return connections.map((conn) => {
      const points = [conn.start, conn.end];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: '#a855f7', transparent: true, opacity: 0.15 });
      return new THREE.Line(geometry, material);
    });
  }, [connections]);

  return (
    <group ref={linesRef}>
      {lineObjects.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7aa2f7"
        size={0.02}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function MouseCamera() {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.1) * 0.3;
    camera.position.y = Math.cos(t * 0.08) * 0.2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

const NODE_POSITIONS: [number, number, number][] = [
  [-2.5, 1.2, -1],
  [2.8, 0.8, -0.5],
  [-1.8, -1.5, 0.5],
  [1.5, -1.2, -1.5],
  [-3, -0.3, 0.8],
  [3.2, -0.5, 0.3],
  [0.5, 2, -0.8],
  [-0.8, -2.2, -0.5],
  [2, 1.8, 0.5],
  [-2.2, 0.5, -1.5],
  [1, -0.2, 1.5],
  [-1.2, 1.5, 1],
];

const NODE_COLORS = [
  '#a855f7', '#7aa2f7', '#7dcfff', '#22c55e',
  '#ec4899', '#a855f7', '#7aa2f7', '#7dcfff',
  '#22c55e', '#ec4899', '#f59e0b', '#a855f7',
];

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#a855f7" />
          <pointLight position={[-5, -3, 3]} intensity={0.4} color="#7aa2f7" />

          <CentralOrb />

          {NODE_POSITIONS.map((pos, i) => (
            <FloatingNode
              key={i}
              position={pos}
              color={NODE_COLORS[i]}
              size={0.08 + Math.random() * 0.08}
            />
          ))}

          <ConnectionLines nodes={NODE_POSITIONS} />
          <ParticleField />
          <MouseCamera />
        </Suspense>
      </Canvas>
    </div>
  );
}
