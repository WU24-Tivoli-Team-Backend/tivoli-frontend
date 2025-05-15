'use client'
import { useState, useEffect, useCallback } from 'react'
import axios from '@/lib/axios'

export function useFetch(url, dependencies = []) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  // Add a refresh flag state
  const [refreshFlag, setRefreshFlag] = useState(0)

  // Define the fetch function with useCallback
  const fetchData = useCallback(async () => {
    // Don't attempt to fetch if URL is null/empty
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
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      })
      setData(res.data)
      setError(null)
    } catch (e) {
      // Check if this is an abort error
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

  // Call fetchData in useEffect
  useEffect(() => {
    const cleanup = fetchData()
    return () => {
      if (cleanup && typeof cleanup === 'function') {
        cleanup()
      }
    }
  }, [fetchData]) // Only dependency is fetchData which has its own dependencies

  // Return both the data and the refetch function
  return { data, error, loading, refetch }
}