'use client'

import React, { useEffect, useRef } from 'react'

/**
 * Avatar Component
 *
 * A visual representation that can move between grid cells
 *
 * @param {Object} props
 * @param {number} props.x - Current X position of the avatar
 * @param {number} props.y - Current Y position of the avatar
 * @param {Function} props.onArrival - Callback when avatar arrives at a cell
 * @param {string} props.imageUrl - Optional image URL for the avatar
 */
const Avatar = ({ x, y, onArrival, imageUrl = '/avatar-placeholder.png' }) => {
    const avatarRef = useRef(null)

    // When position changes, trigger animation and onArrival callback
    useEffect(() => {
        if (onArrival) {
            // Add a slight delay to allow for animation
            const timer = setTimeout(() => {
                onArrival({ x, y })
            }, 300) // Match this with your transition duration

            return () => clearTimeout(timer)
        }
    }, [x, y, onArrival])

    return (
        <div
            ref={avatarRef}
            className="
        absolute
        w-16
        h-16
        transition-all
        duration-300
        ease-in-out
        transform
        -translate-x-1/2
        -translate-y-1/2
        z-10
      "
            style={{
                left: `calc(${x} * (100px + 8px) + 50px)`,
                top: `calc(${y} * (100px + 8px) + 50px)`,
            }}>
            <div
                className="
        w-full 
        h-full 
        rounded-full 
        bg-blue-500 
        flex 
        items-center 
        justify-center
        border-4
        border-white
        shadow-lg
        overflow-hidden
      ">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-white text-2xl">A</div>
                )}
            </div>
        </div>
    )
}

export default Avatar
