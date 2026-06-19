"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PresentationControls, MeshDistortMaterial } from "@react-three/drei"
import type { Mesh } from "three"

function Bubble() {
  const mesh = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Smoothly ease the scale toward its target on hover/press for a tactile feel.
  useFrame((_, delta) => {
    if (!mesh.current) return
    const target = hovered ? 1.08 : 1
    const s = mesh.current.scale.x
    const next = s + (target - s) * Math.min(1, delta * 6)
    mesh.current.scale.setScalar(next)
  })

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* High-subdivision sphere so the morphing surface stays smooth */}
      <icosahedronGeometry args={[1.25, 64]} />
      <MeshDistortMaterial
        color="#f6f5f7"
        distort={hovered ? 0.45 : 0.32}
        speed={hovered ? 3 : 1.8}
        roughness={0.08}
        metalness={0.12}
        clearcoat={1}
        clearcoatRoughness={0.15}
        envMapIntensity={1.2}
      />
    </mesh>
  )
}

export function HeroBubble() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 4]} intensity={1.6} />
      {/* Warm accent light to echo the brand's orange glow */}
      <pointLight position={[-3, -2, 2]} intensity={2.4} color="#ff7a45" />
      <Suspense fallback={null}>
        <PresentationControls
          global
          cursor
          snap
          speed={1.4}
          polar={[-0.5, 0.5]}
          azimuth={[-0.9, 0.9]}
          config={{ mass: 1, tension: 180, friction: 26 }}
        >
          <Float speed={2.2} rotationIntensity={0.5} floatIntensity={1.4}>
            <Bubble />
          </Float>
        </PresentationControls>
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  )
}
