import React, { useState, useEffect } from 'react'

const AvatarAnimation = ({
    spriteSheet,
    state = 'idle',
    size = 64,
    className = '',
    facingDirection = 'right',
}) => {
    const [currentFrame, setCurrentFrame] = useState(0)

    // Frame definitions from the JSON with exact coordinates
    const animations = {
        idle: {
            frames: [
                { x: 0, y: 0 }, // Idle 0
                { x: 32, y: 0 }, // Idle 1
                { x: 64, y: 0 }, // Idle 2
                { x: 96, y: 0 }, // Idle 3
                { x: 128, y: 0 }, // Idle 4
                { x: 160, y: 0 }, // Idle 5
            ],
            duration: 150, // ms per frame
        },
        movement: {
            frames: [
                { x: 0, y: 64 }, // Movement 0
                { x: 32, y: 64 }, // Movement 1
                { x: 64, y: 64 }, // Movement 2
                { x: 96, y: 64 }, // Movement 3
                { x: 128, y: 64 }, // Movement 4
                { x: 160, y: 64 }, // Movement 5
                { x: 192, y: 64 }, // Movement 6
                { x: 224, y: 64 }, // Movement 7
            ],
            duration: 80,
        },
        asleep: {
            frames: [
                { x: 0, y: 192 }, // Sleep 0
                { x: 32, y: 192 }, // Sleep 1
                { x: 64, y: 192 }, // Sleep 2
                { x: 96, y: 192 }, // Sleep 3
                { x: 128, y: 192 }, // Sleep 4
                { x: 160, y: 192 }, // Sleep 5
                { x: 192, y: 192 }, // Sleep 6
                { x: 224, y: 192 }, // Sleep 7
            ],
            duration: 200,
        },
    }

    const currentAnim = animations[state] || animations.idle
    const frameCount = currentAnim.frames.length
    const scale = size / 32

    // Get current frame position
    const getCurrentFramePosition = () => {
        const frame = currentAnim.frames[currentFrame % frameCount]
        if (!frame) return { x: 0, y: 0 }
        return {
            x: -frame.x * scale,
            y: -frame.y * scale,
        }
    }

    // Frame animation loop
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame(prev => (prev + 1) % frameCount)
        }, currentAnim.duration)

        return () => clearInterval(interval)
    }, [state, frameCount, currentAnim.duration])

    // Reset frame when state changes
    useEffect(() => {
        setCurrentFrame(0)
    }, [state])

    const { x, y } = getCurrentFramePosition()

    return (
        <div
            className={`avatar-animation ${className}`}
            style={{
                width: size,
                height: size,
                backgroundImage: `url(${spriteSheet})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${256 * scale}px ${224 * scale}px`,
                backgroundPosition: `${x}px ${y}px`,
                imageRendering: 'pixelated',
                transform:
                    facingDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
            }}
        />
    )
}

export const useAvatarState = (inactivityTimeout = 10000) => {
    const [avatarState, setAvatarState] = useState('idle')
    const [lastActivity, setLastActivity] = useState(Date.now())

    const updateActivity = () => {
        setLastActivity(Date.now())
        if (avatarState === 'asleep') {
            setAvatarState('idle')
        }
    }

    const setMoving = () => {
        setAvatarState('movement')
        updateActivity()
    }

    const setIdle = () => {
        setAvatarState('idle')
        updateActivity()
    }

    useEffect(() => {
        const checkInactivity = () => {
            const now = Date.now()
            if (
                now - lastActivity > inactivityTimeout &&
                avatarState !== 'asleep'
            ) {
                setAvatarState('asleep')
            }
        }

        const interval = setInterval(checkInactivity, 1000)
        return () => clearInterval(interval)
    }, [lastActivity, avatarState, inactivityTimeout])

    return {
        avatarState,
        setMoving,
        setIdle,
        updateActivity,
    }
}

export default AvatarAnimation
