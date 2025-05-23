'use client'

import React, { useEffect, useRef, useState } from 'react'
import AvatarAnimation from './AvatarAnimation'

const Avatar = ({
    x,
    y,
    onArrival,
    gridRef,
    currentCols,
    currentRows,
    avatarState = 'idle',
    facingDirection = 'right',
}) => {
    const avatarRef = useRef(null)
    const [position, setPosition] = useState({ left: 0, top: 0 })

    useEffect(() => {
        if (!gridRef?.current) return

        const grid = gridRef.current
        const targetCellId = `cell-${x}-${y}`
        const targetCell = grid.querySelector(`[id="${targetCellId}"]`)

        if (targetCell) {
            const gridRect = grid.getBoundingClientRect()
            const cellRect = targetCell.getBoundingClientRect()

            const leftPos = cellRect.left - gridRect.left + cellRect.width / 2
            const topPos = cellRect.top - gridRect.top + cellRect.height / 2

            setPosition(prevPos => {
                // Calculate distance for transition duration
                const deltaX = leftPos - prevPos.left
                const deltaY = topPos - prevPos.top
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

                // Base time per unit distance (adjust as needed)
                const timePerUnit = 8 // ms per pixel
                const minTime = 500 // minimum transition time
                const maxTime = 2000 // maximum transition time

                const calculatedTime = Math.max(
                    minTime,
                    Math.min(distance * timePerUnit, maxTime),
                )

                // Update CSS transition duration with !important to override CSS
                if (avatarRef.current) {
                    avatarRef.current.style.setProperty(
                        'transition',
                        `all ${calculatedTime}ms linear`,
                        'important',
                    )
                }

                return { left: leftPos, top: topPos }
            })
        }
    }, [x, y, gridRef, currentCols, currentRows])

    const getAvatarSize = () => {
        if (!gridRef?.current) return 40

        const grid = gridRef.current
        const firstCell = grid.querySelector('[data-x="0"][data-y="0"]')

        if (firstCell) {
            const cellRect = firstCell.getBoundingClientRect()
            return Math.max(cellRect.width * 0.6, 30)
        }

        return 40
    }

    const avatarSize = getAvatarSize()

    useEffect(() => {
        if (onArrival) {
            // Calculate distance to determine arrival delay
            const prevPos = position
            const deltaX = position.left - prevPos.left
            const deltaY = position.top - prevPos.top
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

            const timePerUnit = 8
            const minTime = 500
            const maxTime = 2000
            const arrivalDelay = Math.max(
                minTime,
                Math.min(distance * timePerUnit, maxTime),
            )

            const timer = setTimeout(() => {
                onArrival({ x, y })
            }, arrivalDelay)

            return () => clearTimeout(timer)
        }
    }, [x, y, onArrival, position])

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
                transition: '',
                zIndex: 20,
            }}>
            <AvatarAnimation
                spriteSheet="/rune-avatar.png"
                state={avatarState}
                size={avatarSize}
                facingDirection={facingDirection}
            />
        </div>
    )
}

export default Avatar
