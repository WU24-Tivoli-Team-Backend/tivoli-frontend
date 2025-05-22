'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * Avatar Component
 *
 * A visual representation that can move between grid cells with responsive sizing
 *
 * @param {Object} props
 * @param {number} props.x - Current X position of the avatar
 * @param {number} props.y - Current Y position of the avatar
 * @param {Function} props.onArrival - Callback when avatar arrives at a cell
 * @param {string} props.imageUrl - Optional image URL for the avatar
 * @param {string} props.cellSize - Size of grid cells (e.g., "70px", "100px")
 * @param {number} props.gap - Gap between cells in pixels
 */
const Avatar = ({
    x,
    y,
    onArrival,
    imageUrl = '/avatar-placeholder.png',
    gridRef,
    currentCols,
    currentRows,
}) => {
    const avatarRef = useRef(null)
    const [position, setPosition] = useState({ left: 0, top: 0 })

    // Calculate position based on actual grid cell positions
    useEffect(() => {
        if (!gridRef?.current) return

        const grid = gridRef.current
        const targetCellId = `cell-${x}-${y}`
        const targetCell = grid.querySelector(`[id="${targetCellId}"]`)

        if (targetCell) {
            const gridRect = grid.getBoundingClientRect()
            const cellRect = targetCell.getBoundingClientRect()

            // Calculate center of the cell relative to the grid
            const leftPos = cellRect.left - gridRect.left + cellRect.width / 2
            const topPos = cellRect.top - gridRect.top + cellRect.height / 2

            setPosition({ left: leftPos, top: topPos })
        }
    }, [x, y, gridRef, currentCols, currentRows])

    // Calculate avatar size
    const getAvatarSize = () => {
        if (!gridRef?.current) return '40px'

        const grid = gridRef.current
        const firstCell = grid.querySelector('[data-x="0"][data-y="0"]')

        if (firstCell) {
            const cellRect = firstCell.getBoundingClientRect()
            const avatarSize = Math.max(cellRect.width * 0.6, 30)
            return `${avatarSize}px`
        }

        return '40px'
    }

    const avatarSize = getAvatarSize()

    useEffect(() => {
        if (onArrival) {
            const timer = setTimeout(() => {
                onArrival({ x, y })
            }, 300)

            return () => clearTimeout(timer)
        }
    }, [x, y, onArrival])

    return (
        <div
            ref={avatarRef}
            className="tivoli-avatar"
            style={{
                position: 'absolute',
                width: avatarSize,
                height: avatarSize,
                left: `${position.left}px`,
                top: `${position.top}px`,
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 20,
            }}>
            {/* Avatar glow effect */}
            <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-30 animate-pulse"
                style={{
                    transform: 'scale(1.3)',
                    filter: 'blur(4px)',
                }}
            />

            {/* Main avatar container */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white shadow-2xl overflow-hidden transform transition-transform duration-200 hover:scale-110">
                {/* Avatar image or fallback */}
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        onError={e => {
                            // Fallback to default styling if image fails to load
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                        }}
                    />
                ) : null}

                {/* Fallback avatar display */}
                <div
                    className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg"
                    style={{ display: imageUrl ? 'none' : 'flex' }}>
                    🎯
                </div>

                {/* Inner shine effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent" />
            </div>

            {/* Movement trail effect */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-50 animate-ping" />
        </div>
    )
}

export default Avatar
