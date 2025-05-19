'use client'
import React, { useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'

export default function Voting() {
    const { user } = useAuth()
    const {
        data: voteData,
        error: voteError,
        loading: voteLoading,
        mutate: mutateVotes,
        refetch: refetchVotes,
    } = useFetch('/api/votes')

    const {
        data: amusements,
        error: amusementError,
        loading: amusementLoading,
        mutate: mutateAmusements,
    } = useFetch('/api/amusements')

    const [message, setMessage] = useState('')
    const [loadingVote, setLoadingVote] = useState(false)
    const [votingForId, setVotingForId] = useState(null)

    const submitVote = async amusementId => {
        if (!user) {
            setMessage('You must be logged in to vote.')
            return
        }

        setLoadingVote(true)
        setVotingForId(amusementId)
        setMessage('')

        try {
            const response = await axios.post('/api/votes', {
                amusement_id: amusementId,
                user_id: user.id,
            })

            if (response.status === 201) {
                setMessage('Vote submitted successfully!')

                await Promise.all([mutateVotes(), mutateAmusements()])
            }
        } catch (error) {
            console.error(
                'Error submitting vote:',
                error.response?.data || error.message,
            )
            setMessage(error.response?.data?.message || 'Failed to submit vote')
        } finally {
            setLoadingVote(false)
            setVotingForId(null)
            refetchVotes()
        }
    }

    // Combine amusements with vote counts
    const processedAmusements = React.useMemo(() => {
        if (!amusements?.data || !voteData) return []

        return amusements.data.map(amusement => {
            // Find vote count for this amusement from the vote data
            const voteInfo = voteData.find(
                v => v.amusement === amusement.name,
            ) || { votes: 0 }

            return {
                ...amusement,
                votes: voteInfo.votes || 0,
            }
        })
    }, [amusements, voteData])

    if (voteLoading || amusementLoading) return <p>Loading...</p>
    if (voteError || amusementError)
        return <p>Error: {(voteError || amusementError).message}</p>

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Vote for Your Favorite Amusement
            </h1>
            {message && (
                <div className="p-3 mb-4 bg-green-100 text-green-800 rounded">
                    {message}
                </div>
            )}
            <ul className="space-y-4">
                {Array.isArray(processedAmusements) &&
                    processedAmusements.map(amusement => {
                        const isOwner =
                            !!user && amusement.group_id === user.group_id
                        return (
                            <li
                                key={amusement.id}
                                className="p-4 border rounded shadow-sm flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">
                                        {amusement.name}
                                    </p>
                                    <p className="text-gray-600">
                                        Votes: {amusement.votes}
                                    </p>
                                    {isOwner && (
                                        <p className="text-xs text-red-500">
                                            You own this amusement
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => submitVote(amusement.id)}
                                    disabled={loadingVote || isOwner}
                                    className={`px-4 py-2 rounded text-white ${
                                        isOwner
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600'
                                    }`}>
                                    {votingForId === amusement.id
                                        ? 'Submitting...'
                                        : 'Vote'}
                                </button>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}
