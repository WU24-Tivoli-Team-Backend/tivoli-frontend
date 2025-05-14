'use client'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'

export function useFetch(url) {
    const [loading, setLoading] = useState()
    const [data, setData] = useState()
    const [error, setErrror] = useState()

    useEffect(() => {
        setLoading(true)
        axios
            .get(url)
            .then(res => {
                setData(res.data)
            })
            .catch(e => {
                setErrror(e)
            })
            .finally(() => setLoading(false))
    }, [])

    return { data, error, loading }
}
