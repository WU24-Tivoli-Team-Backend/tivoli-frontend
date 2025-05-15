'use client'
import React from 'react'
import { useFetch } from '@/hooks/useFetch'

export default function Voting() {
    const { data: votes, error, loading } = useFetch('/api/votes')

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <h1>Vote Counts</h1>
            <ul>
                {votes.map((vote, index) => (
                    <li key={index}>
                        <p>Amusement: {vote.amusement}</p>
                        <p>Votes: {vote.votes}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
