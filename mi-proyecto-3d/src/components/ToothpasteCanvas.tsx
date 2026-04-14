import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Toothpaste } from './Toothpaste'

interface ToothpasteCanvasProps {
  toothpastes: Array<{ id: number; color: string }>
}

export const ToothpasteCanvas: React.FC<ToothpasteCanvasProps> = ({ toothpastes }) => {
  const positions: [number, number, number][] = [
    [0, 0, 0],
    [2.5, 0, 0],
    [-2.5, 0, 0],
    [1.25, 0, 2.2],
    [-1.25, 0, 2.2],
    [2.5, 0, 2.2],
    [-2.5, 0, 2.2],
    [0, 0, 4.4],
  ]

  return (
    <Canvas style={{ width: '100%', height: '600px' }}>
      <PerspectiveCamera position={[0, 0, 8]} fov={50} />
      <OrbitControls />

      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Suspense fallback={null}>
        {toothpastes.map((toothpaste, index) => (
          <Toothpaste
            key={toothpaste.id}
            color={toothpaste.color}
            position={positions[index] || [0, 0, 0]}
          />
        ))}
      </Suspense>
    </Canvas>
  )
}
