'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function AmusementCard({ amusement }) {
    const [mode, setMode] = useState(0)

    // Cycle through modes 0 → 1 → 2 → 0 on click
    const handleClick = () => setMode(prev => (prev + 1) % 3)

    // Base classes for all modes
    const baseClasses =
        'cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300'

    // Dynamic size-classes based on mode
    let sizeClasses
    if (mode === 0) {
        sizeClasses = 'w-full h-32'
    } else if (mode === 1) {
        sizeClasses = 'w-full'
    } else {
        sizeClasses = 'w-full'
    }

    return (
        <div className={`${baseClasses} ${sizeClasses}`} onClick={handleClick}>
            {/* Image section - always renders */}
            <div
                className="relative w-full"
                style={
                    mode === 0 ? { height: '100%' } : { paddingTop: '56.25%' }
                }>
                {/* Name overlay for mode 1 - at the top */}
                {mode === 1 && (
                    <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
                        <h3 className="text-lg font-medium text-white">
                            {amusement.name}
                        </h3>
                    </div>
                )}

                <Image
                    src="/Red_panda.png"
                    alt={amusement.name}
                    fill
                    className={`object-cover ${mode === 2 ? 'brightness-150' : ''}`}
                />

                {/* Type overlay for mode 1 - at the bottom */}
                {mode === 1 && (
                    <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-sm text-white uppercase">
                            {amusement.type}
                        </p>
                    </div>
                )}

                {/* Overlay for mode 2 - unchanged */}
                {mode === 2 && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-6 text-white">
                        <div>
                            <h3 className="text-2xl font-semibold">
                                {amusement.name}
                            </h3>
                            <p className="uppercase text-sm mt-1">
                                {amusement.type}
                            </p>
                        </div>
                        <p className="flex-1 mt-4 overflow-auto text-base">
                            {amusement.description}
                        </p>
                        <button className="mt-6 w-full py-2 bg-white text-black font-medium rounded-md">
                            Play Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
