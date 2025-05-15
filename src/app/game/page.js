'use client'

import Header from '@/app/(app)/Header'
import GameIframe, { ScreenSize, AspectRatio } from '@/components/GameIframe'
import { useState } from 'react'
import { useEffect } from 'react'

const GamePage = () => {
    const customAspectRatios = {
        [ScreenSize.MOBILE_PORTRAIT]: AspectRatio.MOBILE,
        [ScreenSize.MOBILE_LANDSCAPE]: AspectRatio.WIDESCREEN,
        [ScreenSize.TABLET_PORTRAIT]: AspectRatio.STANDARD,
        [ScreenSize.TABLET_LANDSCAPE]: AspectRatio.WIDESCREEN,
        [ScreenSize.DESKTOP]: AspectRatio.ULTRAWIDE,
    }
    const [jwtToken, setJwtToken] = useState(null)
    const [currentDevice, setCurrentDevice] = useState('Detecting...')

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (token) setJwtToken(token)
    }, [])

    return (
        <>
            <Header title="Test Game" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Testgame: Paneer
                                </h2>
                                <span className="px-3 py-1 bg-gray-100 rounded text-sm">
                                    Current view:{' '}
                                    <span id="current-device">
                                        {currentDevice}
                                    </span>
                                </span>
                            </div>

                            <GameIframe
                                url="http://localhost:3001"
                                title="My Game"
                                jwt={jwtToken}
                                onGameReady={() => console.log('Game ready')}
                                onTokenSent={() => console.log('Token sent')}
                                onScreenSizeChange={size =>
                                    setCurrentDevice(size)
                                }
                            />

                            <div className="mt-6 text-sm text-gray-600">
                                <p>
                                    This game automatically adjusts to your
                                    device and orientation:
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Mobile Portrait: 9:16 aspect ratio</li>
                                    <li>Mobile Landscape: 16:9 aspect ratio</li>
                                    <li>Tablet Portrait: 4:3 aspect ratio</li>
                                    <li>Tablet Landscape: 16:9 aspect ratio</li>
                                    <li>Desktop: 16:9 aspect ratio</li>
                                </ul>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">
                                    Example with Custom Aspect Ratios
                                </h3>

                                <GameIframe
                                    url="http://localhost:3001"
                                    title="Custom Aspect Ratios"
                                    aspectRatios={customAspectRatios}
                                    className="mt-2"
                                />

                                <p className="mt-4 text-sm text-gray-600">
                                    This example uses custom aspect ratios,
                                    including 21:9 ultrawide on desktop.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GamePage
