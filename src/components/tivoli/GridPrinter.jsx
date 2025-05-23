'use client'

import React, { useState, useEffect, useRef } from 'react'
import GridCell from './GridCell'
import Avatar from './Avatar'
import './grid.css'

const GridPrinter = ({
    rows = 5,
    cols = 5,
    mobileRows = 3,
    mobileCols = 3,
    specialCells = [],
    onCellActivated,
}) => {
    const [avatarPosition, setAvatarPosition] = useState({ x: 0, y: 0 })
    const [prevAvatarPosition, setPrevAvatarPosition] = useState({ x: 0, y: 0 })
    const [activeCell, setActiveCell] = useState({ x: 0, y: 0 })
    const [cellsWithContent, setCellsWithContent] = useState({})
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)
    const [facingDirection, setFacingDirection] = useState('right') // 'left' or 'right'

    const [avatarState, setAvatarState] = useState('idle')
    const sleepTimeoutRef = useRef(null)
    const gridRef = useRef(null)

    useEffect(() => {
        const startSleepTimer = () => {
            if (sleepTimeoutRef.current) {
                clearTimeout(sleepTimeoutRef.current)
            }

            sleepTimeoutRef.current = setTimeout(() => {
                setAvatarState('asleep')
            }, 15000) // 15 seconds
        }

        startSleepTimer()

        return () => {
            if (sleepTimeoutRef.current) {
                clearTimeout(sleepTimeoutRef.current)
            }
        }
    }, [])

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

    const getCurrentGridDimensions = () => {
        if (isMobile) {
            return { rows: mobileRows, cols: mobileCols }
        }
        return { rows, cols }
    }

    const { rows: currentRows, cols: currentCols } = getCurrentGridDimensions()

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
                if (cell.x < currentCols && cell.y < currentRows) {
                    const key = `${cell.x}-${cell.y}`
                    contentMap[key] = cell.content || true
                }
            })

            setCellsWithContent(contentMap)
        }
    }, [specialCells, currentRows, currentCols])

    const handleCellClick = ({ x, y }) => {
        if (x !== avatarPosition.x || y !== avatarPosition.y) {
            if (sleepTimeoutRef.current) {
                clearTimeout(sleepTimeoutRef.current)
            }

            if (x > avatarPosition.x) {
                setFacingDirection('right')
            } else if (x < avatarPosition.x) {
                setFacingDirection('left')
            }

            const deltaX = Math.abs(x - avatarPosition.x)
            const deltaY = Math.abs(y - avatarPosition.y)
            const totalSquares = Math.max(deltaX, deltaY)

            let movementDuration =
                totalSquares === 1 ? 1100 : 1100 + (totalSquares - 1) * 900

            if (movementDuration > 2200) {
                movementDuration = 2200
            }

            setPrevAvatarPosition(avatarPosition)
            setAvatarPosition({ x, y })

            setAvatarState('movement')

            setTimeout(() => {
                setAvatarState('idle')

                sleepTimeoutRef.current = setTimeout(() => {
                    setAvatarState('asleep')
                }, 15000)
            }, movementDuration)
        }
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

    const getCellSize = () => {
        if (isMobile) return 'clamp(50px, 15vw, 70px)'
        if (isTablet) return 'clamp(70px, 12vw, 90px)'
        return 'clamp(80px, 8vw, 120px)'
    }

    const cellSize = getCellSize()

    return (
        <div className="tivoli-grid-container w-full h-full">
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
                            gap: '0px',
                            justifyContent: 'center',
                            alignContent: 'center',
                        }}>
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
                                        prevX={prevAvatarPosition.x}
                                        prevY={prevAvatarPosition.y}
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

                    <div className="avatar-layer">
                        <Avatar
                            x={avatarPosition.x}
                            y={avatarPosition.y}
                            onArrival={handleAvatarArrival}
                            gridRef={gridRef}
                            currentCols={currentCols}
                            currentRows={currentRows}
                            avatarState={avatarState}
                            facingDirection={facingDirection}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GridPrinter
