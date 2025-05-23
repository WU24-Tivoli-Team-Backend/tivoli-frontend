'use client'
import { useState, useEffect, useCallback } from 'react'
import axios from '@/lib/axios'

export function useFetch(url, dependencies = []) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [refreshFlag, setRefreshFlag] = useState(0)

    const fetchData = useCallback(async () => {
        if (!url) {
            setLoading(false)
            return
        }

        const controller = new AbortController()
        const { signal } = controller

        setLoading(true)
        try {
            const res = await axios.get(url, {
                signal,
                headers: {
                    'Cache-Control': 'no-store',
                },
            })
            setData(res.data)
            setError(null)
        } catch (e) {
            if (e.name !== 'CanceledError' && e.name !== 'AbortError') {
                setError(e)
            }
        } finally {
            setLoading(false)
        }

        return () => {
            controller.abort()
        }
    }, [url, ...dependencies, refreshFlag]) // Add refreshFlag to dependencies

    // Create a refetch function that updates the refresh flag
    const refetch = useCallback(() => {
        setRefreshFlag(prev => prev + 1)
    }, [])

    useEffect(() => {
        const cleanup = fetchData()
        return () => {
            if (cleanup && typeof cleanup === 'function') {
                cleanup()
            }
        }
    }, [fetchData])

    return { data, error, loading, refetch }
}
