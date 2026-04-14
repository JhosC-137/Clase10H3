import { useRef, Suspense } from 'react'
import { Mesh, Group } from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

interface ToothpasteProps {
  color: string
  position: [number, number, number]
}

const ToothpasteContent: React.FC<{ color: string; position: [number, number, number] }> = ({
  color,
  position,
}) => {
  const groupRef = useRef<Group>(null)
  const tubeRef = useRef<Mesh>(null)
  const capRef = useRef<Mesh>(null)

  let texture
  try {
    texture = useTexture('/image/colgate.jpg')
  } catch (error) {
    texture = null
  }

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.01
      groupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Tubo */}
      <mesh ref={tubeRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.35, 2, 32]} />
        {texture ? (
          <meshStandardMaterial map={texture} metalness={0.3} roughness={0.4} />
        ) : (
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
        )}
      </mesh>

      {/* Tubo fino */}
      <mesh position={[0, -1.2, 0]}>
        <coneGeometry args={[0.2, 0.4, 32]} />
        {texture ? (
          <meshStandardMaterial map={texture} metalness={0.3} roughness={0.4} />
        ) : (
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
        )}
      </mesh>

      {/* Tapita */}
      <mesh ref={capRef} position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.45, 0.42, 0.3, 32]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Detalle tapa */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
        <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.15} />
      </mesh>
    </group>
  )
}

export const Toothpaste: React.FC<ToothpasteProps> = ({ color, position }) => {
  return (
    <Suspense fallback={null}>
      <ToothpasteContent color={color} position={position} />
    </Suspense>
  )
}
