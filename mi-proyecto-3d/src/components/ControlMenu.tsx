import { useState } from 'react'
import './ControlMenu.css'

interface ControlMenuProps {
  toothpasteCount: number
  onAddMultipleToothpastes: (quantity: number) => void
  onClearAll: () => void
  onColorChange: (color: string) => void
  currentColor: string
}

export const ControlMenu: React.FC<ControlMenuProps> = ({
  toothpasteCount,
  onAddMultipleToothpastes,
  onClearAll,
  onColorChange,
  currentColor,
}) => {
  const [quantity, setQuantity] = useState(1)
  const colors = ['#FF0000', '#0000FF', '#00AA00']
  const colorNames = ['Rojo', 'Azul', 'Verde']

  const handleAddClick = () => {
    if (quantity > 0) {
      onAddMultipleToothpastes(quantity)
      setQuantity(1)
    }
  }

  return (
    <div className="controls-panel">
      <h3>Configuración</h3>

      <div className="color-group">
        <label>Color del dentífrico:</label>
        {colors.map((color, index) => (
          <button
            key={color}
            className={`color-btn ${currentColor === color ? 'active' : ''}`}
            onClick={() => onColorChange(color)}
            style={{ backgroundColor: color }}
            title={colorNames[index]}
          />
        ))}
      </div>

      <div className="button-group">
        <label htmlFor="quantity">¿Cuántos dentífricos?</label>
        <input
          id="quantity"
          type="number"
          min="1"
          max="8"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
          className="quantity-input"
        />
        <button className="add-btn" onClick={handleAddClick}>
          + Agregar
        </button>
        <p className="count">Total: {toothpasteCount}</p>
      </div>

      <button className="clear-btn" onClick={onClearAll}>
        🗑 Borrar Todo
      </button>
    </div>
  )
}
