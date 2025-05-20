'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function AmusementCard({ amusement }) {
    // Now we only need mode 0 and 2 (simplified from 3 modes to 2)
    const [expanded, setExpanded] = useState(false)

    // Toggle between compact (0) and expanded (2) modes on click
    const handleClick = () => setExpanded(prev => !prev)

    // Base classes for all states
    const baseClasses =
        'cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300'

    // Size classes - now just compact or expanded
    const sizeClasses = expanded ? 'w-full' : 'w-full h-32'

    return (
        <div
            className={`${baseClasses} ${sizeClasses} group/card`}
            onClick={handleClick}>
            <div
                className="relative w-full"
                style={expanded ? { paddingTop: '56.25%' } : { height: '100%' }}>
                {/* Name overlay - shows on hover or when expanded */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <h3 className="text-lg font-medium text-white">
                        {amusement.name}
                    </h3>
                </div>

                <Image
                    src="/Red_panda.png"
                    alt={amusement.name}
                    fill
                    className={`object-cover ${expanded ? 'brightness-150' : ''}`}
                />

                {/* Type overlay - shows on hover or when expanded */}
                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <p className="text-sm text-white uppercase">
                        {amusement.type}
                    </p>
                </div>

                {/* Expanded overlay - only shows when in expanded mode */}
                {expanded && (
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
