import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CHAPTERS } from '../data/chapters';

export default function EnvironmentRoad({ scrollSpeed = 0, isAccelerating = false, activeChapterIndex = 0 }) {
  const roadLinesRef = useRef();
  const speedStreaksRef = useRef();
  const groundMatRef = useRef();

  const currentChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  // Yellow wind streaks
  const streakCount = 50;
  const streakData = useMemo(() => {
    const pos = new Float32Array(streakCount * 3);
    const speed = new Float32Array(streakCount);
    for (let i = 0; i < streakCount; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 24; // X
      pos[i * 3 + 1] = Math.random() * 2.8 + 0.1;   // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;  // Z
      speed[i] = 0.8 + Math.random() * 1.0;
    }
    return { pos, speed };
  }, []);

  const targetBgColor = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    const velocity = (scrollSpeed * 6 + (isAccelerating ? 20 : 2.5)) * delta;

    // 1. Move dashed center line markings
    if (roadLinesRef.current) {
      roadLinesRef.current.position.x = (roadLinesRef.current.position.x - velocity) % 3;
    }

    // 2. Animate speed streaks flying backwards past the car
    if (speedStreaksRef.current) {
      const positions = speedStreaksRef.current.geometry.attributes.position.array;
      for (let i = 0; i < streakCount; i++) {
        positions[i * 3 + 0] -= velocity * streakData.speed[i] * 1.5;
        if (positions[i * 3 + 0] < -12) {
          positions[i * 3 + 0] = 12;
        }
      }
      speedStreaksRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 3. Ground color interpolation
    if (groundMatRef.current) {
      targetBgColor.set(currentChapter.theme.bgBottom);
      groundMatRef.current.color.lerp(targetBgColor, 0.05);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]} receiveShadow>
        <planeGeometry args={[140, 140]} />
        <meshToonMaterial ref={groundMatRef} color={currentChapter.theme.bgBottom} />
      </mesh>

      {/* Styled asphalt road strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[120, 5.0]} />
        <meshToonMaterial color="#221E28" />
      </mesh>

      {/* Red curbs */}
      <mesh position={[0, 0.01, 2.55]}>
        <boxGeometry args={[120, 0.06, 0.12]} />
        <meshToonMaterial color="#D9453D" />
      </mesh>
      <mesh position={[0, 0.01, -2.55]}>
        <boxGeometry args={[120, 0.06, 0.12]} />
        <meshToonMaterial color="#D9453D" />
      </mesh>

      {/* Moving dashed center road markings */}
      <group ref={roadLinesRef} position={[0, -0.01, 0]}>
        {Array.from({ length: 30 }).map((_, idx) => (
          <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]} position={[-40 + idx * 3, 0, 0]}>
            <planeGeometry args={[1.5, 0.15]} />
            <meshBasicMaterial color="#FFD98A" />
          </mesh>
        ))}
      </group>

      {/* Yellow wind / speed streaks */}
      <points ref={speedStreaksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={streakCount}
            array={streakData.pos}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#FFD98A"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
