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
    const sizeClasses =
        mode === 0
            ? 'w-48 h-32' // liten vy, bara bilden
            : mode === 1
              ? 'w-64' // medium vy, bild + titel/type
              : 'w-full' // full bredd + overlay

    return (
        <div className={`${baseClasses} ${sizeClasses}`} onClick={handleClick}>
            {/* Image section - always renders */}
            <div
                className="relative w-full"
                style={
                    mode === 0 ? { height: '100%' } : { paddingTop: '56.25%' }
                }>
                <Image
                    src="/Red_panda.png"
                    alt={amusement.name}
                    fill
                    className={`object-cover ${mode === 2 ? 'brightness-150' : ''}`}
                />

                {/* Overlay for mode 2 */}
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

            {/* Titel + genre visible in mode 1 */}
            {mode === 1 && (
                <div className="bg-white px-4 py-2">
                    <h3 className="text-lg font-medium text-gray-800">
                        {amusement.name}
                    </h3>
                    <p className="text-sm text-gray-600 uppercase">
                        {amusement.type}
                    </p>
                </div>
            )}
        </div>
    )
}
