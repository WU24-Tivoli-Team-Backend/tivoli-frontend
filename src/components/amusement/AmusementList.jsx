'use client'
import { useAuth } from '@/hooks/auth'
import { useFetch } from '@/hooks/useFetch'
import { useState } from 'react'
import AmusementForm from './AmusementForm'
import Button from '../Button'
import Link from 'next/link'
import Image from 'next/image'

export default function AmusementList() {
    const { user } = useAuth({ middleware: 'auth' })
    const amusementsApiUrl = `/api/amusements?group_id=${user?.group_id}`
    const {
        data: amusementData,
        error: amusementError,
        loading: amusementLoading,
        refetch,
    } = useFetch(amusementsApiUrl, [user?.id])

    const [showCreateForm, setShowCreateForm] = useState(false)
    const [editingAmusementId, setEditingAmusementId] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    if (amusementLoading) return <p>Loading amusements...</p>
    if (amusementError)
        return (
            <p>
                Error loading amusements:{' '}
                {amusementError.message || String(amusementError)}
            </p>
        )

    const hasAmusements = amusementData?.data?.length > 0

    function handleCreateClick() {
        setShowCreateForm(true)
        setEditingAmusementId(null)
    }

    function handleEditClick(amusementId) {
        setEditingAmusementId(amusementId)
        setShowCreateForm(false)
    }

    // Form submitted successfully - reset state to hide forms
    const handleFormSuccess = (data, action = 'unknown') => {
        console.log('Form submission successful with data:', data)
        setShowCreateForm(false)
        setEditingAmusementId(null)
        refetch()
        if (action === 'create') {
            setSuccessMessage('Amusement created successfully')
        } else if (action === 'update') {
            setSuccessMessage('Amusement updated successfully')
        } else if (action === 'delete') {
            setSuccessMessage('Amusement deleted successfully')
        } else {
            setSuccessMessage('Operation completed successfully')
        } // Refresh the data
    }

    return (
        <section className="bg-white shadow-md rounded-lg px-8 p-4 flex flex-col gap-2">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Amusements</h2>
                    {successMessage && (
                        <p className="text-green-500">{successMessage}</p>
                    )}
                    <Button onClick={handleCreateClick}>
                        Add New Amusement
                    </Button>
                </div>

                {/* Show create form conditionally */}
                {showCreateForm && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <AmusementForm onSuccess={handleFormSuccess} />
                    </div>
                )}

                {/* Display amusements if available */}
                {hasAmusements ? (
                    <ul className="space-y-4">
                        {amusementData.data.map(amusement => (
                            <li
                                key={amusement.id}
                                className="bg-white p-4 rounded-lg shadow">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {amusement.name}
                                        </h3>
                                        {!amusement.image_url && (
                                            <Image
                                                src="/Red_panda.png"
                                                width={200}
                                                height={200}
                                                alt={amusement.name}
                                            />
                                        )}
                                        {amusement.image_url && (
                                            <Image
                                                src={amusement.image_url}
                                                width={200}
                                                height={200}
                                                alt={amusement.name}
                                            />
                                        )}
                                        <p className="text-gray-600">
                                            Type: {amusement.type}
                                        </p>
                                        <p className="text-gray-600">
                                            Description: {amusement.description}
                                        </p>
                                        <p className="text-gray-600">
                                            Amusement id: {amusement.id}
                                        </p>
                                        <p className="text-gray-600">
                                            Stamp id: {amusement.stamp_id}
                                        </p>
                                        {amusement.url && (
                                            <Link
                                                href={amusement.url}
                                                className="text-blue-700">
                                                {amusement.name}
                                            </Link>
                                        )}
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleEditClick(amusement.id)
                                        }>
                                        Edit
                                    </Button>
                                </div>

                                {/* Show edit form for this specific amusement */}
                                {editingAmusementId === amusement.id && (
                                    <div className="mt-4 border-t pt-4">
                                        <AmusementForm
                                            amusementId={amusement.id}
                                            onSuccess={handleFormSuccess}
                                        />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    // No amusements available - show create form or message
                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <p className="text-gray-500 mb-4">
                            No amusements found. Create your first one!
                        </p>

                        {!showCreateForm && (
                            <Button onClick={handleCreateClick}>
                                Create Amusement
                            </Button>
                        )}

                        {showCreateForm && (
                            <div className="mt-4 text-left">
                                <AmusementForm onSuccess={handleFormSuccess} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
