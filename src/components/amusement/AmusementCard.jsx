'use client'

import { useState } from 'react'
import Image from 'next/image'
import GameIframe from '../GameIframe'

export default function AmusementCard({ amusement }) {
    const [expanded, setExpanded] = useState(false)
    const [gameOpen, setGameOpen] = useState(false)
    const [showData, setShowData] = useState(true)

    const handleClick = e => {
        if (!e.target.closest('button')) {
            setExpanded(prev => !prev)
        }
    }

    const handlePlayClick = e => {
        e.stopPropagation()
        setGameOpen(prev => !prev)
        setShowData(prev => !prev)
    }

    const stampMap = {
        1: 'Panda',
        6: 'Silver panda',
        7: 'Gold panda',
        8: 'Platinum panda',
        2: 'Orca',
        9: 'Silver Orca',
        10: 'Gold Orca',
        11: 'Platinum Orca',
        3: 'Raven',
        12: 'Silver Raven',
        13: 'Gold Raven',
        14: 'Platinum Raven',
        4: 'Blobfish',
        15: 'Silver Blobfish',
        16: 'Gold Blobfish',
        17: 'Platinum Blobfish',
        5: 'Pallas cat',
        18: 'Silver Pallas cat',
        19: 'Gold Pallas cat',
        20: 'Platinum Pallas cat',
    }

    const stampName = amusement.stamp_id
        ? stampMap[amusement.stamp_id] || 'Unknown stamp'
        : 'No stamp assigned'

    const baseClasses =
        'cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300'

    return (
        <div
            role="button"
            tabIndex={0}
            aria-expanded={expanded}
            aria-label={`Toggle details for ${amusement.name}`}
            className={`${baseClasses} w-full group/card ${expanded ? '' : 'h-32'}`}
            onClick={handleClick}>
            {!expanded ? (
                <div className="relative h-full w-full">
                    <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4 opacity-0 group-hover/card:opacity-100 transition-opacity">
                        <h3 className="text-lg font-medium text-white">
                            {amusement.name}
                        </h3>
                    </div>

                    <Image
                        src={
                            amusement.image_url && amusement
                                ? amusement.image_url
                                : '/images/Redpanda2.png'
                        }
                        alt={amusement.name}
                        fill
                        className="object-cover"
                    />

                    <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover/card:opacity-100 transition-opacity">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-white uppercase">
                                {amusement.type}
                            </p>
                            {amusement.stamp_id && (
                                <span className="bg-amber-500/80 text-white text-xs px-2 py-1 rounded-full">
                                    {stampName}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col bg-black text-white">
                    <div className="relative w-full h-48">
                        <Image
                            src={
                                amusement.image_url && amusement
                                    ? amusement.image_url
                                    : '/images/Redpanda2.png'
                            }
                            alt={amusement.name}
                            fill
                            className="object-cover"
                        />

                        {amusement.stamp_id && (
                            <div className="absolute top-2 right-2 bg-amber-500/80 text-white text-xs px-2 py-1 rounded-full">
                                {stampName}
                            </div>
                        )}
                    </div>

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

                                <div className="flex flex-wrap gap-2 items-center mb-2">
                                    <p className="uppercase text-sm">
                                        {amusement.type}
                                    </p>
                                </div>
                            </>
                        )}
                        <button
                            className="w-full py-2 bg-white text-black font-medium rounded-md mt-4"
                            onClick={handlePlayClick}>
                            {gameOpen ? 'Close Game' : 'Play Now'}
                        </button>

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
