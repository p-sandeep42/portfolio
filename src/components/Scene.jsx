import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import CarModel from './CarModel';
import EnvironmentRoad from './EnvironmentRoad';
import { CHAPTERS } from '../data/chapters';

function CameraRig({ activeChapterIndex, scrollProgress, scrollSpeed, isAccelerating }) {
  const { camera, pointer } = useThree();
  const currentChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  const targetCamPos = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);
  const currentLookAt = useRef(new THREE.Vector3(0, 0.45, 0));

  useFrame((_, delta) => {
    // 1. Calculate destination camera position based on active chapter
    const [cx, cy, cz] = currentChapter.camera.position;
    const [tx, ty, tz] = currentChapter.camera.target;

    // Subtle pointer parallax
    const parallaxX = pointer.x * 0.4;
    const parallaxY = pointer.y * 0.2;

    targetCamPos.set(cx + parallaxX, cy + parallaxY, cz);
    targetLookAt.set(tx, ty, tz);

    // Smooth lerp camera position
    const lerpSpeed = 3.5 * delta;
    camera.position.lerp(targetCamPos, lerpSpeed);

    // Smooth lerp camera lookAt
    currentLookAt.current.lerp(targetLookAt, lerpSpeed);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default function Scene({ scrollProgress, scrollSpeed, isAccelerating, activeChapterIndex }) {
  const currentChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <div
      className="webgl-container"
      style={{
        background: `linear-gradient(180deg, ${currentChapter.theme.bgTop} 0%, ${currentChapter.theme.bgBottom} 100%)`,
        transition: 'background 0.8s ease',
      }}
    >
      <Canvas
        shadows
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        camera={{ position: [5.2, 2.8, 6.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Ambient & Directional Lights */}
        <ambientLight intensity={1.2} color={currentChapter.theme.ambientColor} />
        <directionalLight
          position={[8, 12, 6]}
          intensity={1.8}
          color={currentChapter.theme.lightColor}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Soft fill rim light */}
        <directionalLight position={[-8, 6, -6]} intensity={0.6} color="#ffffff" />

        {/* 3D Car & Moving Road */}
        <React.Suspense fallback={null}>
          <CarModel
            scrollProgress={scrollProgress}
            scrollSpeed={scrollSpeed}
            isAccelerating={isAccelerating}
            activeChapterIndex={activeChapterIndex}
          />
        </React.Suspense>

        <EnvironmentRoad
          scrollSpeed={scrollSpeed}
          isAccelerating={isAccelerating}
          activeChapterIndex={activeChapterIndex}
        />

        {/* Camera Lerp Controller */}
        <CameraRig
          activeChapterIndex={activeChapterIndex}
          scrollProgress={scrollProgress}
          scrollSpeed={scrollSpeed}
          isAccelerating={isAccelerating}
        />
      </Canvas>
    </div>
  );
}
