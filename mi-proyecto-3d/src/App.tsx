import { useState } from 'react'
import { ToothpasteCanvas } from './components/ToothpasteCanvas'
import { ControlMenu } from './components/ControlMenu'
import './App.css'

interface Toothpaste {
  id: number
  color: string
}

function App() {
  const [toothpastes, setToothpastes] = useState<Toothpaste[]>([
    { id: 1, color: '#FF0000' },
  ])
  const [currentColor, setCurrentColor] = useState('#FF0000')
  const [nextId, setNextId] = useState(2)

  const handleAddMultipleToothpastes = (quantity: number) => {
    if (toothpastes.length + quantity <= 8) {
      const newToothpastes = [...toothpastes]
      for (let i = 0; i < quantity; i++) {
        newToothpastes.push({ id: nextId + i, color: currentColor })
      }
      setToothpastes(newToothpastes)
      setNextId(nextId + quantity)
    }
  }

  const handleClearAll = () => {
    setToothpastes([])
    setNextId(1)
  }

  const handleColorChange = (color: string) => {
    setCurrentColor(color)
    // Cambiar el color de todos los dentífricos existentes en tiempo real
    setToothpastes(toothpastes.map(t => ({ ...t, color })))
  }

  return (
    <div className="app-container">
      <div className="canvas-wrapper">
        <ToothpasteCanvas toothpastes={toothpastes} />
      </div>
      <div className="menu-wrapper">
        <ControlMenu
          toothpasteCount={toothpastes.length}
          onAddMultipleToothpastes={handleAddMultipleToothpastes}
          onClearAll={handleClearAll}
          onColorChange={handleColorChange}
          currentColor={currentColor}
        />
      </div>
    </div>
  )
}

export default App
