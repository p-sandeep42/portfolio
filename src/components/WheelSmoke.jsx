import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_PUFFS = 120;

export default function WheelSmoke({ carRef, scrollSpeed = 0, isAccelerating = false }) {
  const meshRef = useRef();

  // Particle pool for volumetric cartoon smoke clouds
  const particles = useMemo(() => {
    return Array.from({ length: MAX_PUFFS }, () => ({
      pos: new THREE.Vector3(0, -30, 0),
      vel: new THREE.Vector3(0, 0, 0),
      scale: 0.1,
      maxScale: 0.6 + Math.random() * 0.35,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 3,
      life: 0,
      maxLife: 0.9 + Math.random() * 0.4,
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const carForward = useMemo(() => new THREE.Vector3(), []);

  // Tire contact points in car local coordinates (Rear-Left & Rear-Right)
  const tireLocalOffsets = useMemo(
    () => [
      new THREE.Vector3(-1.25, 0.04, 1.05),  // Rear Left
      new THREE.Vector3(-1.25, 0.04, -1.05), // Rear Right
    ],
    []
  );

  let nextIdx = 0;
  let spawnTimer = 0;

  useFrame((_, delta) => {
    // Road speed is ALWAYS active (base cruise speed 3.0, up to 24 in boost)
    const baseDriveSpeed = 3.2;
    const roadSpeed = baseDriveSpeed + scrollSpeed * 7.5 + (isAccelerating ? 18 : 0);

    // Get car orientation to direct drift smoke behind its heading
    let carRotY = 0;
    let carPosX = 0;
    let carPosZ = 0;
    let carPosY = 0;

    if (carRef && carRef.current) {
      carRotY = carRef.current.rotation.y;
      carPosX = carRef.current.position.x;
      carPosY = carRef.current.position.y;
      carPosZ = carRef.current.position.z;
      carForward.set(Math.cos(carRotY), 0, -Math.sin(carRotY));
    } else {
      carForward.set(1, 0, 0);
    }

    spawnTimer += delta;
    // Spawn continuously at all times! (Faster during acceleration)
    const interval = isAccelerating ? 0.018 : 0.035;

    if (spawnTimer >= interval && carRef && carRef.current) {
      spawnTimer = 0;

      tireLocalOffsets.forEach((localOffset) => {
        const p = particles[nextIdx];
        nextIdx = (nextIdx + 1) % MAX_PUFFS;

        // Calculate world spawn position of this tire
        tempVec.copy(localOffset);
        tempVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), carRotY);
        tempVec.x += carPosX;
        tempVec.y += carPosY;
        tempVec.z += carPosZ;

        p.pos.set(
          tempVec.x + (Math.random() - 0.5) * 0.12,
          Math.max(0.03, tempVec.y + Math.random() * 0.05),
          tempVec.z + (Math.random() - 0.5) * 0.12
        );

        // Velocity: shoots behind car heading and moves back with the road
        const kickbackSpeed = roadSpeed * (0.8 + Math.random() * 0.35);
        p.vel.set(
          -carForward.x * kickbackSpeed * 0.75 - roadSpeed * 0.45,
          0.32 + Math.random() * 0.42, // Rises off the asphalt
          -carForward.z * kickbackSpeed * 0.75 + (Math.random() - 0.5) * 0.4 // Lateral drift curl
        );

        p.scale = 0.12;
        p.maxScale = isAccelerating ? 0.8 + Math.random() * 0.35 : 0.5 + Math.random() * 0.25;
        p.life = 0;
        p.maxLife = isAccelerating ? 1.0 + Math.random() * 0.35 : 0.75 + Math.random() * 0.25;
        p.rotSpeed = (Math.random() - 0.5) * 3.5;
      });
    }

    // Update active volumetric puffs
    if (meshRef.current) {
      for (let i = 0; i < MAX_PUFFS; i++) {
        const p = particles[i];
        if (p.life < p.maxLife) {
          p.life += delta;
          const prog = p.life / p.maxLife;

          // Billowing cloud expansion
          const scaleProg = Math.sin(Math.min(1, prog * 1.5) * Math.PI * 0.5);
          p.scale = THREE.MathUtils.lerp(0.12, p.maxScale, scaleProg);

          // Position integration
          p.pos.x += p.vel.x * delta;
          p.pos.y += p.vel.y * delta;
          p.pos.z += p.vel.z * delta;
          p.rot += p.rotSpeed * delta;

          dummy.position.copy(p.pos);
          dummy.scale.set(p.scale, p.scale, p.scale);
          dummy.rotation.set(p.rot, p.rot * 0.8, p.rot * 1.2);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        } else {
          dummy.position.set(0, -30, 0);
          dummy.scale.set(0.001, 0.001, 0.001);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, MAX_PUFFS]}>
      {/* 
        Chunky volumetric cartoon cloud geometry:
        Subdivided icosahedron creates soft, billowing mounds of dust/smoke
      */}
      <icosahedronGeometry args={[1, 1]} />
      <meshToonMaterial
        color={isAccelerating ? '#FFDF9E' : '#F6EBDD'} // Creamy desert sand & smoke tone
        transparent
        opacity={0.88}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
