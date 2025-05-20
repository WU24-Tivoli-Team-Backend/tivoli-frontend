'use client'

import React from 'react'

/**
 * GridCell Component
 *
 * Represents a single cell in the grid system
 *
 * @param {Object} props
 * @param {number} props.x - X coordinate of the cell
 * @param {number} props.y - Y coordinate of the cell
 * @param {boolean} props.isActive - Whether this cell is currently active
 * @param {boolean} props.hasContent - Whether this cell has special content
 * @param {Object} props.content - Optional content to display in this cell
 * @param {Function} props.onClick - Function to call when cell is clicked
 */
const GridCell = ({
    x,
    y,
    isActive = false,
    hasContent = false,
    content = null,
    onClick,
}) => {
    // Generate a unique ID for this cell based on coordinates
    const cellId = `cell-${x}-${y}`

    // Handle the click event and pass the coordinates to the parent
    const handleClick = () => {
        if (onClick) {
            onClick({ x, y })
        }
    }

    return (
        <div
            id={cellId}
            data-x={x}
            data-y={y}
            onClick={handleClick}
            className={`
        grid-cell
        w-full 
        h-full 
        border-2 
        flex 
        items-center 
        justify-center
        transition-all
        duration-200
        ${isActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:border-gray-400'}
        ${hasContent ? 'bg-gray-100' : ''}
        cursor-pointer
      `}>
            <div className="text-xs text-gray-500 absolute top-1 left-1">
                {x},{y}
            </div>

            {hasContent && content && (
                <div className="content-container">{content}</div>
            )}
        </div>
    )
}

export default GridCell
