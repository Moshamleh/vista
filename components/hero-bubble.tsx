"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber"
import { Environment, MeshDistortMaterial } from "@react-three/drei"
import type { Group, Mesh } from "three"

// Tracks normalized cursor position (-1..1) across the whole page so the orb
// can subtly lean toward it. Gated to fine-pointer desktops for performance.
function usePointerLean() {
  const pointer = useRef({ x: 0, y: 0 })
  const enabled = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)")
    enabled.current = mq.matches
    const onChange = () => {
      enabled.current = mq.matches
      if (!mq.matches) pointer.current = { x: 0, y: 0 }
    }
    const onMove = (e: PointerEvent) => {
      if (!enabled.current) return
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    mq.addEventListener("change", onChange)
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      mq.removeEventListener("change", onChange)
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  return pointer
}

// A small colored sphere that travels a tilted circular orbit around the orb.
function OrbitSphere({
  radius,
  speed,
  phase,
  tilt,
  size,
  color,
  emissive,
}: {
  radius: number
  speed: number
  phase: number
  tilt: number
  size: number
  color: string
  emissive: string
}) {
  const ref = useRef<Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + phase
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t) * radius * tilt,
      Math.sin(t) * radius,
    )
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.35}
        roughness={0.15}
        metalness={0.1}
        envMapIntensity={1.2}
      />
    </mesh>
  )
}

function Scene() {
  const lean = useRef<Group>(null)
  const spin = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const pointer = usePointerLean()

  // Manual spin state kept in refs so it survives frames without re-rendering.
  const dragging = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const scale = useRef(1)

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    dragging.current = true
    lastPointer.current = { x: e.clientX, y: e.clientY }
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current || !spin.current) return
    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }
    velocity.current.y = dx * 0.005
    velocity.current.x = dy * 0.005
    spin.current.rotation.y += velocity.current.y
    spin.current.rotation.x += velocity.current.x
  }

  const endDrag = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = false
    ;(e.target as Element).releasePointerCapture?.(e.pointerId)
  }

  useFrame((_, delta) => {
    const d = Math.min(1, delta * 6)

    // Whole assembly eases toward the cursor for a subtle parallax lean.
    if (lean.current) {
      const targetY = pointer.current.x * 0.28
      const targetX = pointer.current.y * 0.2
      lean.current.rotation.y += (targetY - lean.current.rotation.y) * d
      lean.current.rotation.x += (targetX - lean.current.rotation.x) * d
    }

    if (spin.current) {
      if (!dragging.current) {
        // Momentum after release, easing out via friction.
        spin.current.rotation.y += velocity.current.y
        spin.current.rotation.x += velocity.current.x
        velocity.current.y *= 0.94
        velocity.current.x *= 0.94

        // Slow idle auto-rotation once momentum has settled.
        if (Math.abs(velocity.current.y) < 0.0008 && Math.abs(velocity.current.x) < 0.0008) {
          spin.current.rotation.y += delta * 0.22
        }
      }

      // Smooth hover scale for a tactile, premium feel.
      const target = hovered ? 1.05 : 1
      scale.current += (target - scale.current) * d
      spin.current.scale.setScalar(scale.current)
    }
  })

  return (
    <group ref={lean}>
      {/* Main white orb — spins on drag / idle */}
      <group ref={spin}>
        <mesh
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <icosahedronGeometry args={[1.25, 64]} />
          <MeshDistortMaterial
            color="#f6f5f7"
            distort={hovered ? 0.38 : 0.26}
            speed={hovered ? 2.4 : 1.3}
            roughness={0.08}
            metalness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.15}
            envMapIntensity={1.2}
          />
        </mesh>
      </group>

      {/* Colored accent spheres orbiting the orb */}
      <OrbitSphere radius={2.0} speed={0.32} phase={0} tilt={0.35} size={0.16} color="#d6409f" emissive="#a01f6d" />
      <OrbitSphere radius={2.25} speed={0.24} phase={2.4} tilt={-0.5} size={0.11} color="#ff7a45" emissive="#c2440f" />
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
        <Scene />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  )
}
