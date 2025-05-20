'use client'

import React, { useState, useEffect } from 'react'
import GridCell from './GridCell'
import Avatar from './Avatar'
import './grid.css'

/**
 * GridPrinter Component
 *
 * Creates a grid system and manages the avatar's position
 *
 * @param {Object} props
 * @param {number} props.rows - Number of rows in the grid
 * @param {number} props.cols - Number of columns in the grid
 * @param {Array} props.specialCells - Array of cell coordinates with special content
 * @param {Function} props.onCellActivated - Callback when a cell is activated by the avatar
 * @param {string} props.avatarImage - URL for the avatar image
 */
const GridPrinter = ({
    rows = 3,
    cols = 3,
    specialCells = [],
    onCellActivated,
    avatarImage,
}) => {
    const [avatarPosition, setAvatarPosition] = useState({ x: 0, y: 0 })
    const [activeCell, setActiveCell] = useState({ x: 0, y: 0 })
    const [cellsWithContent, setCellsWithContent] = useState({})

    useEffect(() => {
        if (specialCells.length > 0) {
            const contentMap = {}

            specialCells.forEach(cell => {
                const key = `${cell.x}-${cell.y}`
                contentMap[key] = cell.content || true
            })

            setCellsWithContent(contentMap)
        }
    }, [specialCells])

    const handleCellClick = ({ x, y }) => {
        setAvatarPosition({ x, y })
    }

    const handleAvatarArrival = ({ x, y }) => {
        setActiveCell({ x, y })

        if (onCellActivated) {
            const key = `${x}-${y}`
            const hasSpecialContent = cellsWithContent[key] !== undefined

            onCellActivated({
                x,
                y,
                hasContent: hasSpecialContent,
                content: hasSpecialContent ? cellsWithContent[key] : null,
            })
        }
    }

    const renderGrid = () => {
        const grid = []

        for (let y = 0; y < rows; y++) {
            const row = []

            for (let x = 0; x < cols; x++) {
                const key = `${x}-${y}`
                const isActive = x === activeCell.x && y === activeCell.y
                const hasContent = cellsWithContent[key] !== undefined
                const content = hasContent ? cellsWithContent[key] : null

                row.push(
                    <div key={key} className="relative">
                        <GridCell
                            x={x}
                            y={y}
                            isActive={isActive}
                            hasContent={hasContent}
                            content={content}
                            onClick={handleCellClick}
                        />
                    </div>,
                )
            }

            grid.push(
                <div key={`row-${y}`} className="grid-row flex">
                    {row}
                </div>,
            )
        }

        return grid
    }

    return (
        <div className="grid-container relative">
            <div
                className="grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, 100px)`,
                    gridTemplateRows: `repeat(${rows}, 100px)`,
                    gap: '8px',
                }}>
                {/* Generate cells in a grid */}
                {Array.from({ length: rows * cols }).map((_, index) => {
                    const x = index % cols
                    const y = Math.floor(index / cols)
                    const key = `${x}-${y}`
                    const isActive = x === activeCell.x && y === activeCell.y
                    const hasContent = cellsWithContent[key] !== undefined
                    const content =
                        hasContent && cellsWithContent[key] !== true
                            ? cellsWithContent[key]
                            : null

                    return (
                        <GridCell
                            key={key}
                            x={x}
                            y={y}
                            isActive={isActive}
                            hasContent={hasContent}
                            content={content}
                            onClick={handleCellClick}
                        />
                    )
                })}
            </div>

            {/* Position the avatar absolutely over the grid */}
            <div className="avatar-container absolute top-0 left-0 w-full h-full">
                <Avatar
                    x={avatarPosition.x}
                    y={avatarPosition.y}
                    onArrival={handleAvatarArrival}
                    imageUrl={avatarImage}
                />
            </div>
        </div>
    )
}

export default GridPrinter
