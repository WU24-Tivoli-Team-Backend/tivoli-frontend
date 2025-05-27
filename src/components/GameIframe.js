'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import JwtMessageBridge to avoid SSR issues
const JwtMessageBridge = dynamic(() => import('./JwtMessageBridge'), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-200 w-full h-full" />,
})

export const ScreenSize = {
    MOBILE_PORTRAIT: 'mobile-portrait',
    MOBILE_LANDSCAPE: 'mobile-landscape',
    TABLET_PORTRAIT: 'tablet-portrait',
    TABLET_LANDSCAPE: 'tablet-landscape',
    DESKTOP: 'desktop',
    CUSTOM: 'custom',
}

export const AspectRatio = {
    WIDESCREEN: '16/9',
    STANDARD: '4/3',
    SQUARE: '1/1',
    MOBILE: '9/16',
    ULTRAWIDE: '21/9',
    CUSTOM: 'custom',
}

const defaultAspectRatios = {
    [ScreenSize.MOBILE_PORTRAIT]: AspectRatio.MOBILE,
    [ScreenSize.MOBILE_LANDSCAPE]: AspectRatio.WIDESCREEN,
    [ScreenSize.TABLET_PORTRAIT]: AspectRatio.STANDARD,
    [ScreenSize.TABLET_LANDSCAPE]: AspectRatio.WIDESCREEN,
    [ScreenSize.DESKTOP]: AspectRatio.WIDESCREEN,
    [ScreenSize.CUSTOM]: AspectRatio.CUSTOM,
}

const breakpoints = {
    mobile: 576,
    tablet: 992,
}

// Modern iOS detection using Next.js patterns (no deprecated APIs)
const useIOSDetection = () => {
    const [isIOS, setIsIOS] = useState(false)

    useEffect(() => {
        // Only run on client side
        const checkIOS = () => {
            // Check for iOS devices in user agent
            const isIOSUserAgent = /iPad|iPhone|iPod/.test(navigator.userAgent)

            // Modern way to detect iPad on iOS 13+ (which reports as desktop)
            const isIPadOS =
                navigator.maxTouchPoints > 1 &&
                /Mac/.test(navigator.userAgent) &&
                !window.MSStream

            // Additional check for touch-enabled Safari
            const isTouchSafari =
                'ontouchstart' in window &&
                /Safari/.test(navigator.userAgent) &&
                !/Chrome|CriOS|FxiOS/.test(navigator.userAgent)

            return isIOSUserAgent || isIPadOS || isTouchSafari
        }

        setIsIOS(checkIOS())
    }, [])

    return isIOS
}

const GameIframe = ({
    url = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001'
        : '/game',
    title = 'Game',
    defaultSize = ScreenSize.DESKTOP,
    aspectRatios = defaultAspectRatios,
    customAspectRatio = null,
    className = '',
    allowFullscreen = true,
    onScreenSizeChange = null,
    onGameReady = null,
    onTokenSent = null,
}) => {
    const [currentScreenSize, setCurrentScreenSize] = useState(defaultSize)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [jwtToken, setJwtToken] = useState(null)
    const [mounted, setMounted] = useState(false)

    const containerRef = useRef(null)
    const originalStyleRef = useRef(null)

    const isIOS = useIOSDetection()

    // Handle hydration
    useEffect(() => {
        setMounted(true)
    }, [])

    const getAspectRatio = useCallback(() => {
        if (currentScreenSize === ScreenSize.CUSTOM && customAspectRatio) {
            return customAspectRatio
        }
        return aspectRatios[currentScreenSize] || AspectRatio.WIDESCREEN
    }, [currentScreenSize, customAspectRatio, aspectRatios])

    // Modern resize handler with useCallback
    const handleResize = useCallback(() => {
        if (typeof window === 'undefined') return

        const width = window.innerWidth
        const height = window.innerHeight
        const isLandscape = width > height

        let newScreenSize
        if (width < breakpoints.mobile) {
            newScreenSize = isLandscape
                ? ScreenSize.MOBILE_LANDSCAPE
                : ScreenSize.MOBILE_PORTRAIT
        } else if (width < breakpoints.tablet) {
            newScreenSize = isLandscape
                ? ScreenSize.TABLET_LANDSCAPE
                : ScreenSize.TABLET_PORTRAIT
        } else {
            newScreenSize = ScreenSize.DESKTOP
        }

        if (newScreenSize !== currentScreenSize) {
            setCurrentScreenSize(newScreenSize)
            if (onScreenSizeChange) {
                onScreenSizeChange(newScreenSize)
            }
        }
    }, [currentScreenSize, onScreenSizeChange])

    // JWT token handling (client-side only)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('jwt')
            if (token) setJwtToken(token)
        }
    }, [])

    // Resize event listeners
    useEffect(() => {
        if (!mounted) return

        handleResize()

        window.addEventListener('resize', handleResize)
        window.addEventListener('orientationchange', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('orientationchange', handleResize)
        }
    }, [mounted, handleResize])

    const simulateFullscreenIOS = useCallback(() => {
        const container = containerRef.current
        if (!container) return

        // Store original styles
        originalStyleRef.current = {
            position: container.style.position,
            top: container.style.top,
            left: container.style.left,
            width: container.style.width,
            height: container.style.height,
            zIndex: container.style.zIndex,
            transform: container.style.transform,
        }

        // Apply fullscreen styles
        Object.assign(container.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            zIndex: '2147483647', // Use maximum z-index
            backgroundColor: 'black',
            transform: 'translate3d(0,0,0)',
            isolation: 'isolate', // Better to include it in the Object.assign
        })
        container.classList.add('ios-fullscreen')

        setIsFullscreen(true)

        // Prevent body scroll
        document.body.style.overflow = 'hidden'

        // Hide iOS Safari UI
        setTimeout(() => {
            window.scrollTo(0, 1)
        }, 100)
    }, [])

    const exitSimulatedFullscreenIOS = useCallback(() => {
        const container = containerRef.current
        if (!container || !originalStyleRef.current) return

        // Restore original styles
        Object.assign(container.style, originalStyleRef.current)

        container.classList.remove('ios-fullscreen')
        setIsFullscreen(false)

        // Restore body scroll
        document.body.style.overflow = ''

        // Clean up
        originalStyleRef.current = null
    }, [])

    const enterFullscreen = useCallback(async () => {
        const container = containerRef.current
        if (!container) return

        if (isIOS) {
            simulateFullscreenIOS()
        } else {
            try {
                if (container.requestFullscreen) {
                    await container.requestFullscreen()
                } else if (container.webkitRequestFullscreen) {
                    await container.webkitRequestFullscreen()
                } else if (container.msRequestFullscreen) {
                    await container.msRequestFullscreen()
                } else {
                    simulateFullscreenIOS()
                }
            } catch (error) {
                console.warn(
                    'Native fullscreen failed, using simulated:',
                    error,
                )
                simulateFullscreenIOS()
            }
        }
    }, [isIOS, simulateFullscreenIOS])

    const exitFullscreen = useCallback(async () => {
        const container = containerRef.current

        if (
            isIOS ||
            (container && container.classList.contains('ios-fullscreen'))
        ) {
            exitSimulatedFullscreenIOS()
        } else {
            try {
                if (document.exitFullscreen) {
                    await document.exitFullscreen()
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen()
                } else if (document.msExitFullscreen) {
                    await document.msExitFullscreen()
                }
            } catch (error) {
                console.warn('Exit fullscreen failed:', error)
            }
        }
    }, [isIOS, exitSimulatedFullscreenIOS])

    // Fullscreen change detection
    useEffect(() => {
        if (!mounted) return

        const handleFullscreenChange = () => {
            const container = containerRef.current
            const hasIOSFullscreen =
                container && container.classList.contains('ios-fullscreen')

            if (isIOS) {
                setIsFullscreen(hasIOSFullscreen || false)
            } else {
                const fullscreenElement =
                    document.fullscreenElement ||
                    document.webkitFullscreenElement ||
                    document.msFullscreenElement

                setIsFullscreen(
                    !!fullscreenElement || hasIOSFullscreen || false,
                )
            }
        }

        const events = [
            'fullscreenchange',
            'webkitfullscreenchange',
            'msfullscreenchange',
        ]

        events.forEach(event => {
            document.addEventListener(event, handleFullscreenChange)
        })

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, handleFullscreenChange)
            })
        }
    }, [mounted, isIOS])

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div
                className={`w-full ${className}`}
                style={{
                    aspectRatio: getAspectRatio(),
                    maxWidth: '100%',
                    position: 'relative',
                }}>
                <div className="absolute top-0 left-0 w-full h-full border-0 bg-gray-100 animate-pulse" />
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className={`w-full responsive-game-container ${className}`}
            style={{
                aspectRatio: getAspectRatio(),
                maxWidth: '100%',
                position: 'relative',
                // iOS-specific optimizations
                ...(isIOS && {
                    WebkitOverflowScrolling: 'touch',
                    touchAction: 'manipulation',
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitPerspective: 1000,
                }),
            }}
            data-screen-size={currentScreenSize}>
            <JwtMessageBridge
                url={url}
                jwt={jwtToken}
                onGameReady={onGameReady}
                onTokenSent={onTokenSent}>
                <iframe
                    src={url}
                    title={title}
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen={allowFullscreen}
                />
            </JwtMessageBridge>

            {allowFullscreen && (
                <>
                    {isFullscreen ? (
                        <button
                            onClick={exitFullscreen}
                            className="absolute top-4 right-4 z-[10000] bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Exit fullscreen">
                            {isIOS ? 'Exit' : '✕'}
                        </button>
                    ) : (
                        <button
                            onClick={enterFullscreen}
                            className="absolute bottom-4 right-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Enter fullscreen">
                            {isIOS ? 'Full View' : 'Fullscreen'}
                        </button>
                    )}
                </>
            )}
        </div>
    )
}

export default GameIframe
