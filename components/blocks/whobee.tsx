"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * WhobeeModel — loads /whobee.glb and applies:
 *  - Idle breathing bob (sine wave Y translation)
 *  - Soft cursor tracking (rotation follows mouse)
 *  - Eye blink via emissive intensity pulse on cyan/glowing materials
 *  - Boot-up fade-in on first mount
 */
// Eye overlay position relative to the model's bounding box center.
// Tweak these if the disks don't land over the eyes.
const EYE_Y_RATIO = 0.32; // how far up the head from bbox center (0 = center, 1 = top)
const EYE_Z_RATIO = 0.55; // how far forward from bbox center toward the front
const EYE_SPACING_RATIO = 0.18; // horizontal spacing between the two eyes
const EYE_RADIUS_RATIO = 0.07; // size of each eye disk relative to bbox height

function WhobeeModel({ mouse }: { mouse: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const gltf = useLoader(GLTFLoader, "/whobee.glb");
  const [bootProgress, setBootProgress] = useState(0);
  const nextBlinkRef = useRef<number>(2 + Math.random() * 3);
  const blinkStateRef = useRef<{ active: boolean; t: number; double: boolean }>(
    { active: false, t: 0, double: false },
  );

  // Compute eye overlay positions from the GLB's bounding box
  const eyeConfig = useMemo(() => {
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const radius = size.y * EYE_RADIUS_RATIO;
    const y = center.y + size.y * EYE_Y_RATIO;
    const z = center.z + size.z * EYE_Z_RATIO;
    const xOffset = size.x * EYE_SPACING_RATIO;
    return {
      radius,
      leftPos: [center.x - xOffset, y, z] as [number, number, number],
      rightPos: [center.x + xOffset, y, z] as [number, number, number],
    };
  }, [gltf]);

  // Find materials that look like eyes. Meshy's image-to-3D bakes eye glow
  // into the base color texture map, so material.color is often neutral.
  // We use several heuristics AND log everything for diagnosis.
  const eyeMaterials = useMemo(() => {
    const found: THREE.MeshStandardMaterial[] = [];
    const debugLog: Array<{
      mesh: string;
      material: string;
      color: string;
      hasMap: boolean;
      emissive: string;
      picked: boolean;
      reason: string;
    }> = [];

    gltf.scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const meshName = (mesh.name || "").toLowerCase();
        const mats = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];

        mats.forEach((m) => {
          if (!(m instanceof THREE.MeshStandardMaterial)) return;
          const matName = (m.name || "").toLowerCase();
          const col = m.color;

          // Heuristics (OR'd together):
          // 1. material name contains eye/lens/glow/light/led/screen/face
          const matNameMatch =
            /eye|lens|glow|light|led|screen|face|visor|display/.test(matName);
          // 2. mesh name contains those keywords
          const meshNameMatch =
            /eye|lens|glow|light|led|screen|face|visor|display|head/.test(
              meshName,
            );
          // 3. solid color is cyan-ish (loose threshold)
          const cyanMatch =
            col.b > 0.45 && col.g > 0.35 && col.r < 0.55 && col.b > col.r;
          // 4. already has emissive intensity > 0 (Meshy marked it as glowing)
          const emissiveMatch =
            m.emissiveIntensity > 0.01 &&
            (m.emissive.b > 0.3 || m.emissive.g > 0.3);

          let picked = false;
          let reason = "";
          if (matNameMatch) {
            picked = true;
            reason = "material-name";
          } else if (meshNameMatch) {
            picked = true;
            reason = "mesh-name";
          } else if (cyanMatch) {
            picked = true;
            reason = "cyan-color";
          } else if (emissiveMatch) {
            picked = true;
            reason = "pre-emissive";
          }

          if (picked) {
            m.emissive = new THREE.Color("#22d3ee");
            m.emissiveIntensity = 2.0;
            m.toneMapped = false;
            found.push(m);
          }

          debugLog.push({
            mesh: mesh.name || "(unnamed)",
            material: m.name || "(unnamed)",
            color: `rgb(${col.r.toFixed(2)}, ${col.g.toFixed(2)}, ${col.b.toFixed(2)})`,
            hasMap: !!m.map,
            emissive: `rgb(${m.emissive.r.toFixed(2)}, ${m.emissive.g.toFixed(2)}, ${m.emissive.b.toFixed(2)}) @${m.emissiveIntensity.toFixed(2)}`,
            picked,
            reason,
          });
        });
      }
    });

    // eslint-disable-next-line no-console
    console.log("🤖 [Whobee] GLB inspection:");
    // eslint-disable-next-line no-console
    console.table(debugLog);
    // eslint-disable-next-line no-console
    console.log(
      `🤖 [Whobee] Picked ${found.length} material(s) as eyes. If this is wrong, share the table above with Claude.`,
    );

    return found;
  }, [gltf]);

  // Tune body materials for a more premium look regardless of Meshy texture
  useMemo(() => {
    gltf.scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mats = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        mats.forEach((m) => {
          if (m instanceof THREE.MeshStandardMaterial) {
            // Only nudge non-eye materials toward "chrome" aesthetic
            if (!eyeMaterials.includes(m)) {
              m.metalness = Math.min(1, (m.metalness ?? 0) + 0.45);
              m.roughness = Math.max(0.15, (m.roughness ?? 0.5) - 0.2);
              m.envMapIntensity = 1.1;
            }
          }
        });
      }
    });
  }, [gltf, eyeMaterials]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    // Boot-up fade (first ~1.2s)
    if (bootProgress < 1) {
      setBootProgress((p) => Math.min(1, p + delta / 1.2));
    }

    // Idle breathing bob
    group.current.position.y = Math.sin(t * 1.4) * 0.06;

    // Cursor tracking — soft lerp toward mouse
    const targetY = mouse.x * 0.35; // yaw
    const targetX = -mouse.y * 0.18; // pitch
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.06;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.06;

    // Eye blink state machine — animates the overlay disk materials
    const blink = blinkStateRef.current;
    const BASE_INTENSITY = 2.6;
    let intensity = BASE_INTENSITY;

    if (!blink.active) {
      nextBlinkRef.current -= delta;
      if (nextBlinkRef.current <= 0) {
        blink.active = true;
        blink.t = 0;
        blink.double = Math.random() < 0.25; // 25% chance of a double blink
      }
    } else {
      blink.t += delta;
      const phase = blink.t;
      if (phase < 0.14) {
        intensity = BASE_INTENSITY - (phase / 0.14) * (BASE_INTENSITY - 0.05);
      } else if (phase < 0.28) {
        intensity = 0.05 + ((phase - 0.14) / 0.14) * (BASE_INTENSITY - 0.05);
      } else if (blink.double && phase < 0.42) {
        intensity =
          BASE_INTENSITY - ((phase - 0.28) / 0.14) * (BASE_INTENSITY - 0.05);
      } else if (blink.double && phase < 0.56) {
        intensity = 0.05 + ((phase - 0.42) / 0.14) * (BASE_INTENSITY - 0.05);
      } else {
        intensity = BASE_INTENSITY;
        blink.active = false;
        nextBlinkRef.current = 3 + Math.random() * 3; // 3–6s until next blink
      }
    }

    const finalIntensity = intensity * bootProgress;
    [leftEyeRef.current, rightEyeRef.current].forEach((m) => {
      if (m && m.material instanceof THREE.MeshStandardMaterial) {
        m.material.emissiveIntensity = finalIntensity;
        m.material.opacity = 0.4 + bootProgress * 0.6;
      }
    });

    // Boot-up scale pop
    const s = 0.85 + bootProgress * 0.15;
    group.current.scale.set(s, s, s);
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={gltf.scene} />

      {/* Left eye glow overlay */}
      <mesh ref={leftEyeRef} position={eyeConfig.leftPos}>
        <sphereGeometry args={[eyeConfig.radius, 32, 32]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2.6}
          transparent
          opacity={1}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      {/* Right eye glow overlay */}
      <mesh ref={rightEyeRef} position={eyeConfig.rightPos}>
        <sphereGeometry args={[eyeConfig.radius, 32, 32]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2.6}
          transparent
          opacity={1}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      // Normalize to -1..1 based on viewport
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.4, 4.2], fov: 35 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      dpr={[1, 2]}
    >
      {/* Transparent canvas background — page bg shows through */}
      <color attach="background" args={["#05050a"]} />

      {/* Lighting rig — tuned for a clean Pixar-style key/fill/rim */}
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 6, 4]}
        intensity={2.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-4, 2, -3]}
        intensity={1.0}
        color="#3b82f6"
      />
      <directionalLight
        position={[0, 3, -5]}
        intensity={0.8}
        color="#22d3ee"
      />
      <spotLight
        position={[0, 5, 2]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.2}
        color="#ffffff"
      />

      <Suspense fallback={null}>
        <WhobeeModel mouse={mouse} />
        <Environment preset="city" />
      </Suspense>

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.45}
        scale={6}
        blur={2.4}
        far={3}
        color="#000000"
      />
    </Canvas>
  );
}

// Export a client-only version so Three.js / WebGL never touch SSR
const WhobeeClient = dynamic(() => Promise.resolve(Scene), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        className="mr-3 h-5 w-5 animate-spin text-glow-blue"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"
        />
      </svg>
      <span className="font-mono text-xs uppercase tracking-widest text-white/50">
        booting whobee…
      </span>
    </div>
  ),
});

export function Whobee({ className }: { className?: string }) {
  return (
    <div className={className}>
      <WhobeeClient />
    </div>
  );
}
