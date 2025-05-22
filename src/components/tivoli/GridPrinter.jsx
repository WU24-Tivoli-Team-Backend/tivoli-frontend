'use client'

import React, { useState, useEffect, useRef } from 'react'
import GridCell from './GridCell'
import Avatar from './Avatar'
import './grid.css'

/**
 * GridPrinter Component
 *
 * Creates a responsive grid system with mobile and desktop layouts
 *
 * @param {Object} props
 * @param {number} props.rows - Number of rows in the grid (desktop default)
 * @param {number} props.cols - Number of columns in the grid (desktop default)
 * @param {number} props.mobileRows - Number of rows for mobile layout
 * @param {number} props.mobileCols - Number of columns for mobile layout
 * @param {Array} props.specialCells - Array of cell coordinates with special content
 * @param {Function} props.onCellActivated - Callback when a cell is activated by the avatar
 * @param {string} props.avatarImage - URL for the avatar image
 */
const GridPrinter = ({
    rows = 5,
    cols = 5,
    mobileRows = 3,
    mobileCols = 3,
    specialCells = [],
    onCellActivated,
    avatarImage,
}) => {
    const [avatarPosition, setAvatarPosition] = useState({ x: 0, y: 0 })
    const [activeCell, setActiveCell] = useState({ x: 0, y: 0 })
    const [cellsWithContent, setCellsWithContent] = useState({})
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)
    const gridRef = useRef(null)

    // Detect device type
    useEffect(() => {
        const checkDeviceType = () => {
            const width = window.innerWidth
            setIsMobile(width < 768)
            setIsTablet(width >= 768 && width < 1024)
        }

        checkDeviceType()
        window.addEventListener('resize', checkDeviceType)
        return () => window.removeEventListener('resize', checkDeviceType)
    }, [])

    // Get current grid dimensions based on device
    const getCurrentGridDimensions = () => {
        if (isMobile) {
            return { rows: mobileRows, cols: mobileCols }
        }
        return { rows, cols }
    }

    const { rows: currentRows, cols: currentCols } = getCurrentGridDimensions()

    // Reset avatar position when switching between mobile/desktop
    useEffect(() => {
        const maxX = currentCols - 1
        const maxY = currentRows - 1

        if (avatarPosition.x > maxX || avatarPosition.y > maxY) {
            setAvatarPosition({ x: 0, y: 0 })
        }
    }, [isMobile, currentRows, currentCols, avatarPosition])

    useEffect(() => {
        if (specialCells.length > 0) {
            const contentMap = {}

            specialCells.forEach(cell => {
                // Only include cells that fit in current grid
                if (cell.x < currentCols && cell.y < currentRows) {
                    const key = `${cell.x}-${cell.y}`
                    contentMap[key] = cell.content || true
                }
            })

            setCellsWithContent(contentMap)
        }
    }, [specialCells, currentRows, currentCols])

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

    // Get responsive cell size with better mobile responsiveness
    const getCellSize = () => {
        if (isMobile) return 'clamp(50px, 15vw, 70px)'
        if (isTablet) return 'clamp(70px, 12vw, 90px)'
        return 'clamp(80px, 8vw, 120px)'
    }

    const cellSize = getCellSize()

    return (
        <div className="tivoli-grid-container w-full h-full">
            {/* Grid background container */}
            <div
                className={`grid-background ${isMobile ? 'mobile-background' : 'desktop-background'} w-full h-full`}
                style={{
                    backgroundImage: isMobile
                        ? 'url(/mobile.png)'
                        : 'url(/desktop.png)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'transparent',
                }}>
                <div className="grid-overlay w-full h-full">
                    <div
                        ref={gridRef}
                        className="game-grid w-full h-full"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${currentCols}, ${cellSize})`,
                            gridTemplateRows: `repeat(${currentRows}, ${cellSize})`,
                            gap: isMobile
                                ? 'clamp(2px, 1vw, 6px)'
                                : 'clamp(4px, 1vw, 10px)',
                            justifyContent: 'center',
                            alignContent: 'center',
                        }}>
                        {/* Generate cells */}
                        {Array.from({ length: currentRows * currentCols }).map(
                            (_, index) => {
                                const x = index % currentCols
                                const y = Math.floor(index / currentCols)
                                const key = `${x}-${y}`
                                const isActive =
                                    x === activeCell.x && y === activeCell.y
                                const hasContent =
                                    cellsWithContent[key] !== undefined
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
                                        isMobile={isMobile}
                                    />
                                )
                            },
                        )}
                    </div>

                    {/* Avatar container */}
                    <div className="avatar-layer">
                        <Avatar
                            x={avatarPosition.x}
                            y={avatarPosition.y}
                            onArrival={handleAvatarArrival}
                            imageUrl={avatarImage}
                            gridRef={gridRef}
                            currentCols={currentCols}
                            currentRows={currentRows}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GridPrinter
