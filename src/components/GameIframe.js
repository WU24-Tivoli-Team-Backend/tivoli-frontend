import React, { useEffect, useState } from 'react'
import JwtMessageBridge from './JwtMessageBridge'

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
}

const breakpoints = {
    mobile: 576,
    tablet: 992,
}

const GameIframe = ({
    url = 'http://localhost:3001',
    title = 'Game',
    defaultSize = ScreenSize.DESKTOP,
    aspectRatios = defaultAspectRatios,
    customAspectRatio = null,
    className = '',
    allowFullscreen = true,
    onScreenSizeChange = null,
    //jwt = null, // Add JWT token prop
    onGameReady = null,
    onTokenSent = null,
}) => {
    const [currentScreenSize, setCurrentScreenSize] = useState(defaultSize)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const getAspectRatio = () => {
        if (currentScreenSize === ScreenSize.CUSTOM && customAspectRatio) {
            return customAspectRatio
        }
        return aspectRatios[currentScreenSize] || AspectRatio.WIDESCREEN
    }

    useEffect(() => {
        const handleResize = () => {
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
        }

        handleResize()

        window.addEventListener('resize', handleResize)
        window.addEventListener('orientationchange', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('orientationchange', handleResize)
        }
    }, [currentScreenSize, onScreenSizeChange])

    const [jwtToken, setJwtToken] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (token) setJwtToken(token)
    }, [])

    const enterFullscreen = () => {
        const container = document.querySelector('.responsive-game-container')
        if (container?.requestFullscreen) {
            container.requestFullscreen()
        } else if (container?.webkitRequestFullscreen) {
            container.webkitRequestFullscreen()
        } else if (container?.msRequestFullscreen) {
            container.msRequestFullscreen()
        }
    }

    // Event listener to detect if fullscreen is active
    useEffect(() => {
        const handleFullscreenChange = () => {
            const fullscreenElement =
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement
            setIsFullscreen(!!fullscreenElement)
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        document.addEventListener(
            'webkitfullscreenchange',
            handleFullscreenChange,
        )
        document.addEventListener('msfullscreenchange', handleFullscreenChange)

        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange,
            )
            document.removeEventListener(
                'webkitfullscreenchange',
                handleFullscreenChange,
            )
            document.removeEventListener(
                'msfullscreenchange',
                handleFullscreenChange,
            )
        }
    }, [])

    // Exit fullscreen function
    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
    }
    return (
        <div
            className={`w-full responsive-game-container ${className}`}
            style={{
                aspectRatio: getAspectRatio(),
                maxWidth: '100%',
                position: 'relative',
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

            {isFullscreen ? (
                <button
                    onClick={exitFullscreen}
                    className="absolute bottom-4 right-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                    Exit fullscreen
                </button>
            ) : (
                <button
                    onClick={enterFullscreen}
                    className="absolute bottom-4 right-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                    Enter fullscreen
                </button>
            )}
        </div>
    )
}

export default GameIframe
