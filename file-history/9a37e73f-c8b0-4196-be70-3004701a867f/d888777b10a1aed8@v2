/**
 * Pixel Art Canvas Widget
 * Simple pixel art drawing tool
 */

import React, { useState } from 'react';
import { BaseWidget } from './BaseWidget';

const GRID_SIZE = 16;
const COLORS = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

export const PixelArtWidget: React.FC = () => {
  const [pixels, setPixels] = useState<string[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('#FFFFFF'))
  );
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);

  const handlePixelClick = (row: number, col: number) => {
    const newPixels = [...pixels];
    newPixels[row][col] = selectedColor;
    setPixels(newPixels);
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsDrawing(true);
    handlePixelClick(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDrawing) {
      handlePixelClick(row, col);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setPixels(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('#FFFFFF')));
  };

  return (
    <BaseWidget title="Pixel Art" icon="🎨">
      <div className="space-y-3">
        {/* Color palette */}
        <div className="flex gap-2 flex-wrap">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-button border-2 transition-all duration-standard ease-smooth ${
                selectedColor === color ? 'border-accent-blue' : 'border-border-light dark:border-border-dark'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
          <button
            onClick={clearCanvas}
            className="px-2 py-1 text-xs bg-surface-light-elevated dark:bg-surface-dark rounded-button text-text-light-primary dark:text-text-dark-primary hover:bg-surface-light dark:hover:bg-surface-dark-elevated transition-all duration-standard ease-smooth"
          >
            Clear
          </button>
        </div>

        {/* Canvas */}
        <div
          className="inline-block bg-surface-light-elevated dark:bg-surface-dark p-1 rounded-button transition-all duration-standard ease-smooth"
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {pixels.map((row, rowIdx) => (
            <div key={rowIdx} className="flex">
              {row.map((color, colIdx) => (
                <div
                  key={colIdx}
                  onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                  onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                  className="w-4 h-4 border border-border-light dark:border-border-dark cursor-pointer"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
};
