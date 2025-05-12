'use client'

import { useEffect, useRef, useState, cloneElement } from 'react'

/**
 * JwtMessageBridge - A component that handles JWT token communication with game iframes
 *
 * @param {Object} props
 * @param {string} props.url - The URL of the game iframe
 * @param {string|null} props.jwt - The JWT token to send to the game
 * @param {Function} [props.onGameReady] - Callback when game signals it's ready
 * @param {Function} [props.onTokenSent] - Callback when token is sent to the game
 * @param {ReactNode} props.children - The iframe element (will be cloned with ref)
 */
const JwtMessageBridge = ({ url, jwt, onGameReady, onTokenSent, children }) => {
    const iframeRef = useRef(null)
    const [gameReady, setGameReady] = useState(false)
    const [tokenSent, setTokenSent] = useState(false)

    // Handle communication with the game iframe
    useEffect(() => {
        const handleMessage = event => {
            try {
                // Only accept messages from the game URL
                const gameUrlObj = new URL(url)
                if (
                    event.origin !==
                    `${gameUrlObj.protocol}//${gameUrlObj.host}`
                ) {
                    return
                }

                // Handle GAME_READY message
                if (event.data && event.data.type === 'GAME_READY') {
                    console.log('Game is ready to receive messages')
                    setGameReady(true)
                    if (onGameReady) onGameReady()
                }
            } catch (error) {
                console.error('Error handling iframe message:', error)
            }
        }

        window.addEventListener('message', handleMessage)

        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [url, onGameReady])

    // Send JWT token to the game when it's ready
    useEffect(() => {
        if (gameReady && jwt && iframeRef.current && !tokenSent) {
            try {
                console.log('Sending JWT token to game')

                // Post the token to the iframe
                iframeRef.current.contentWindow.postMessage(
                    {
                        type: 'JWT_TOKEN',
                        token: jwt,
                    },
                    new URL(url).origin,
                )

                setTokenSent(true)
                if (onTokenSent) onTokenSent()
            } catch (error) {
                console.error('Error sending token to iframe:', error)
            }
        }
    }, [gameReady, jwt, url, tokenSent, onTokenSent])

    // Reset tokenSent if JWT changes
    useEffect(() => {
        setTokenSent(false)
    }, [jwt])

    // Clone the iframe child and add our ref to it
    if (!children) {
        return null
    }

    // Clone the iframe element to add our ref
    const childWithRef = cloneElement(children, {
        ref: iframeRef,
    })

    return childWithRef
}

export default JwtMessageBridge
