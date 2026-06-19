"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber"
import { Environment, MeshDistortMaterial } from "@react-three/drei"
import type { Group } from "three"

function Bubble() {
  const group = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  // Drag + spin state kept in refs so it survives frames without re-rendering.
  const dragging = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const scale = useRef(1)

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    dragging.current = true
    lastPointer.current = { x: e.clientX, y: e.clientY }
    // Capture the pointer so dragging continues smoothly off the mesh.
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return
    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }
    // Convert pixel drag into rotation and remember it as spin velocity.
    velocity.current.y = dx * 0.005
    velocity.current.x = dy * 0.005
    if (group.current) {
      group.current.rotation.y += velocity.current.y
      group.current.rotation.x += velocity.current.x
    }
  }

  const endDrag = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = false
    ;(e.target as Element).releasePointerCapture?.(e.pointerId)
  }

  useFrame((_, delta) => {
    if (!group.current) return

    if (!dragging.current) {
      // Momentum: keep spinning after release, easing out via friction.
      group.current.rotation.y += velocity.current.y
      group.current.rotation.x += velocity.current.x
      velocity.current.y *= 0.94
      velocity.current.x *= 0.94

      // Gentle idle auto-spin once momentum has settled.
      if (Math.abs(velocity.current.y) < 0.0008 && Math.abs(velocity.current.x) < 0.0008) {
        group.current.rotation.y += delta * 0.25
      }
    }

    // Smooth scale toward hover target for a tactile feel.
    const target = hovered ? 1.06 : 1
    scale.current += (target - scale.current) * Math.min(1, delta * 6)
    group.current.scale.setScalar(scale.current)
  })

  return (
    <group ref={group}>
      <mesh
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* High-subdivision sphere so the morphing surface stays smooth */}
        <icosahedronGeometry args={[1.25, 64]} />
        <MeshDistortMaterial
          color="#f6f5f7"
          distort={hovered ? 0.4 : 0.28}
          speed={hovered ? 2.6 : 1.4}
          roughness={0.08}
          metalness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.15}
          envMapIntensity={1.2}
        />
      </mesh>
    </group>
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
        <Bubble />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  )
}
