'use client'

import React from 'react'

/**
 * GridCell Component
 *
 * Represents a single cell in the grid system with production-ready styling
 *
 * @param {Object} props
 * @param {number} props.x - X coordinate of the cell
 * @param {number} props.y - Y coordinate of the cell
 * @param {boolean} props.isActive - Whether this cell is currently active
 * @param {boolean} props.hasContent - Whether this cell has special content
 * @param {Object} props.content - Optional content to display in this cell
 * @param {Function} props.onClick - Function to call when cell is clicked
 * @param {boolean} props.isMobile - Whether we're in mobile view
 */
const GridCell = ({
    x,
    y,
    isActive = false,
    hasContent = false,
    content = null,
    onClick,
}) => {
    const cellId = `cell-${x}-${y}`

    const handleClick = () => {
        if (onClick) {
            onClick({ x, y })
        }
        document.activeElement?.blur()
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
        }
    }

    const baseClasses = `
        tivoli-grid-cell
        w-full 
        h-full 
        flex 
        items-center 
        justify-center
        transition-all
        duration-300
        cursor-pointer
        relative
        rounded-lg
    `

    const stateClasses = `
        ${isActive ? 'scale-105' : 'hover:scale-102'}
        ${hasContent ? '' : ''}
    `

    return (
        <div
            id={cellId}
            data-x={x}
            data-y={y}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Grid cell at position ${x}, ${y}${hasContent ? ' with content' : ''}`}
            className={`${baseClasses} ${stateClasses}`}>
            {isActive && (
                <div className="absolute inset-0 rounded-lg animate-pulse opacity-50" />
            )}

            {hasContent && content && (
                <div className="content-container relative z-10 w-full h-full flex items-center justify-center">
                    {content}
                </div>
            )}

            {hasContent && !content && (
                <div className="relative z-10">
                    <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce shadow-lg">
                        <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-75" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default GridCell
