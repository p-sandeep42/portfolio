import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import WheelSmoke from './WheelSmoke';
import { CHAPTERS } from '../data/chapters';

useGLTF.preload('/che.glb');

// Procedural contact shadow with 100% alpha transparency (no white box)
function createInkShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 512, 512);

  const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 230);
  grad.addColorStop(0, 'rgba(26, 22, 34, 0.95)');
  grad.addColorStop(0.55, 'rgba(26, 22, 34, 0.7)');
  grad.addColorStop(0.85, 'rgba(26, 22, 34, 0.25)');
  grad.addColorStop(1, 'rgba(26, 22, 34, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(256, 256, 220, 150, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function CarModel({ scrollSpeed = 0, isAccelerating = false, activeChapterIndex = 0 }) {
  const { scene } = useGLTF('/che.glb');
  const carGroupRef = useRef();
  const headlightBeamLeft = useRef();
  const headlightBeamRight = useRef();

  const shadowTexture = useMemo(() => createInkShadowTexture(), []);

  // Process scene meshes: hide opaque JPEG shadows and studio backdrop planes
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Hide opaque white/grey JPEG shadow plane & oversized background objects
        if (
          child.name.includes('Plane') ||
          child.name.includes('GP_Layer') ||
          (child.material && (child.material.name === 'shadow' || child.material.name === 'clouds'))
        ) {
          child.visible = false;
        }

        // Ensure wheels and car body remain 100% visible, intact and solid
        if (child.name.includes('Cube.005') || (child.material && child.material.name === 'ruedas')) {
          child.visible = true;
        }
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    const currentChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];
    const time = state.clock.elapsedTime;
    const speedBoost = isAccelerating ? 2.5 : 1.0;
    const speedFactor = 1.0 + scrollSpeed * 3.5 + (isAccelerating ? 7.0 : 0);

    if (carGroupRef.current) {
      // 1. Suspension idle bounce + high-speed road vibration
      const bounceAmount = currentChapter.car.suspensionBounce;
      const bounceY = Math.sin(time * 8 * speedBoost) * 0.02 * bounceAmount;
      const pitchZ = Math.cos(time * 4) * 0.012 * bounceAmount;

      carGroupRef.current.position.y = bounceY;
      carGroupRef.current.rotation.z = pitchZ;

      // 2. Smoothly rotate car based on active chapter stance (e.g. drift between Hero and About)
      const targetRotY = currentChapter.car.rotation[1];
      carGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        carGroupRef.current.rotation.y,
        targetRotY,
        0.06
      );

      // 3. Smoothly position car across chapters (e.g. pulled back and left for Deployed Builds)
      const targetPos = currentChapter.car.position || [0, 0, 0];
      carGroupRef.current.position.x = THREE.MathUtils.lerp(
        carGroupRef.current.position.x,
        targetPos[0],
        0.06
      );
      carGroupRef.current.position.z = THREE.MathUtils.lerp(
        carGroupRef.current.position.z,
        targetPos[2],
        0.06
      );
    }

    // 5. Headlights for Chapter 5 (Contact finale)
    const isContactChapter = activeChapterIndex === 4;
    const targetBeamOpacity = isContactChapter ? 0.75 : 0;
    if (headlightBeamLeft.current && headlightBeamRight.current) {
      headlightBeamLeft.current.material.opacity = THREE.MathUtils.lerp(
        headlightBeamLeft.current.material.opacity,
        targetBeamOpacity,
        0.1
      );
      headlightBeamRight.current.material.opacity = THREE.MathUtils.lerp(
        headlightBeamRight.current.material.opacity,
        targetBeamOpacity,
        0.1
      );
    }
  });

  const SCALE = 0.45;

  return (
    <group position={[0, 0, 0]}>
      {/* 
        Continuous Volumetric drift smoke clouds in world space:
        Trails behind the car's dynamic heading, fanning out naturally during drifts
      */}
      <WheelSmoke
        carRef={carGroupRef}
        scrollSpeed={scrollSpeed}
        isAccelerating={isAccelerating}
      />

      {/* Main Car Group with dynamic chapter position & drift rotation */}
      <group ref={carGroupRef} position={[0, 0, 0]}>
        {/* Clean transparent ink contact shadow under the car */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
          <planeGeometry args={[4.2, 2.6]} />
          <meshBasicMaterial
            map={shadowTexture}
            transparent
            opacity={0.88}
            depthWrite={false}
          />
        </mesh>

        {/* 
          The solid, factory-welded 3D car model:
          Scale = 0.45, tires resting firmly on road surface Y = 0
        */}
        <group
          position={[0.34 * SCALE, 1.23 * SCALE, 0]}
          scale={SCALE}
        >
          <primitive object={scene} />
        </group>



        {/* Headlight beams (activated in Chapter 5 finale) */}
        <group position={[1.5, 0.45, 0]}>
          <mesh ref={headlightBeamLeft} position={[1.2, 0, 0.45]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.5, 3.0, 16, 1, true]} />
            <meshBasicMaterial
              color="#ffe38f"
              transparent
              opacity={0}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>

          <mesh ref={headlightBeamRight} position={[1.2, 0, -0.45]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.5, 3.0, 16, 1, true]} />
            <meshBasicMaterial
              color="#ffe38f"
              transparent
              opacity={0}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
