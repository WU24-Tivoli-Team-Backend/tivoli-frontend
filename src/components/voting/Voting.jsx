'use client'
import React, { useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth' // För att hämta användarens data

export default function Voting() {
    const { user } = useAuth() // Hämta den inloggade användaren
    const {
        data: amusements,
        error,
        loading,
        mutate,
    } = useFetch('/api/amusements') // Hämta amusements från backend
    const [message, setMessage] = useState('')
    const [loadingVote, setLoadingVote] = useState(false)

    const submitVote = async amusementId => {
        if (!user) {
            setMessage('You must be logged in to vote.')
            return
        }

        setLoadingVote(true)
        setMessage('')

        console.log('Submitting vote for amusement ID:', amusementId)

        try {
            const response = await axios.post('/api/votes', {
                amusement_id: amusementId,
                user_id: user.id, // Skicka användarens ID
            })

            if (response.status === 201) {
                setMessage('Vote submitted successfully!')
                mutate() // Uppdatera amusements efter framgångsrik röstning
            }
        } catch (error) {
            console.error(
                'Error submitting vote:',
                error.response?.data || error.message,
            )
            setMessage(error.response?.data?.message || 'Failed to submit vote')
        } finally {
            setLoadingVote(false)
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <h1>Vote Counts</h1>
            {message && <p className="text-green-500">{message}</p>}
            <ul>
                {Array.isArray(amusements?.data) &&
                    amusements.data.map((amusement, index) => (
                        <li key={index}>
                            <p>Amusement: {amusement.name}</p>
                            <p>Votes: {amusement.votes}</p>
                            <button
                                onClick={() => submitVote(amusement.id)}
                                disabled={loadingVote}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400">
                                {loadingVote ? 'Submitting...' : 'Vote'}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
