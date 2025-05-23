'use client'

import { useState } from 'react'
import Image from 'next/image'
import GameIframe from '../GameIframe'

export default function AmusementCard({ amusement }) {
    const [expanded, setExpanded] = useState(false)
    const [gameOpen, setGameOpen] = useState(false)
    const [showData, setShowData] = useState(true)

    // Only toggle expand when clicking on the card but not on the button
    const handleClick = e => {
        if (!e.target.closest('button')) {
            setExpanded(prev => !prev)
        }
    }

    // Toggle game open/closed
    const handlePlayClick = e => {
        e.stopPropagation() // Prevent card from toggling
        setGameOpen(prev => !prev)
        setShowData(prev => !prev)
    }

    // Base classes
    const baseClasses =
        'cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300'

    return (
        <div
            className={`${baseClasses} w-full group/card ${expanded ? '' : 'h-32'}`}
            onClick={handleClick}>
            {!expanded ? (
                // Compact view (shows image with hover effects)
                <div className="relative h-full w-full">
                    {/* Hover overlays with proper group targeting */}
                    <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4 opacity-0 group-hover/card:opacity-100 transition-opacity">
                        <h3 className="text-lg font-medium text-white">
                            {amusement.name}
                        </h3>
                    </div>

                    <Image
                        src={
                            amusement.image_url
                                ? amusement.image_url
                                : '/images/Redpanda2.png'
                        }
                        alt={amusement.name}
                        fill
                        className="object-cover"
                    />

                    <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover/card:opacity-100 transition-opacity">
                        <p className="text-sm text-white uppercase">
                            {amusement.type}
                        </p>
                    </div>
                </div>
            ) : (
                // Expanded view
                <div className="w-full flex flex-col bg-black text-white">
                    {/* Image at the top */}
                    <div className="relative w-full h-48">
                        <Image
                            src="/Red_panda.png"
                            alt={amusement.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content below image */}
                    <div className="p-6 flex flex-col">
                        {showData && (
                            <>
                                <h3 className="text-2xl font-semibold mb-1 uppercase">
                                    {amusement.name}
                                </h3>

                                <p className="my-4">
                                    {amusement.description ||
                                        'No description available'}
                                </p>

                                <p className="uppercase text-sm">
                                    {amusement.type}
                                </p>
                            </>
                        )}
                        <button
                            className="w-full py-2 bg-white text-black font-medium rounded-md mt-4"
                            onClick={handlePlayClick}>
                            {gameOpen ? 'Close Game' : 'Play Now'}
                        </button>

                        {/* Game iframe */}
                        {gameOpen && amusement.url && (
                            <div className="mt-4 w-full">
                                <GameIframe url={amusement.url} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
