'use client'
import { useAuth } from '@/hooks/auth'
import { useFetch } from '@/hooks/useFetch'
import { useState } from 'react'
import AmusementForm from './AmusementForm'
import Button from '../Button'
import AmusementCard from './AmusementCard'

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

    const stampMap = {
        1: 'Panda',
        6: 'Silver panda',
        7: 'Gold panda',
        8: 'Platinum panda',
        2: 'Orca',
        9: 'Silver Orca',
        10: 'Gold Orca',
        11: 'Platinum Orca',
        3: 'Raven',
        12: 'Silver Raven',
        13: 'Gold Raven',
        14: 'Platinum Raven',
        4: 'Blobfish',
        15: 'Silver Blobfish',
        16: 'Gold Blobfish',
        17: 'Platinum Blobfish',
        5: 'Pallas cat',
        18: 'Silver Pallas cat',
        19: 'Gold Pallas cat',
        20: 'Platinum Pallas cat',
    }

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
        setEditingAmusementId(prevId =>
            prevId === amusementId ? null : amusementId,
        )
        setShowCreateForm(false)
    }

    const handleFormSuccess = (data, action = 'unknown') => {
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
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                {successMessage && (
                    <p className="text-green-500">{successMessage}</p>
                )}
            </div>

            {showCreateForm && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <AmusementForm onSuccess={handleFormSuccess} />
                </div>
            )}

            {hasAmusements ? (
                <ul className="space-y-4">
                    {amusementData.data.map(amusement => (
                        <li key={amusement.id} className="">
                            <AmusementCard amusement={amusement} />

                            <div className="mt-2 text-sm text-gray-600">
                                <p>
                                    <strong>Group:</strong>{' '}
                                    {amusement.group_id
                                        ? amusement.group_id
                                        : 'No group assigned'}
                                </p>
                                <p>
                                    <strong>Stamp:</strong>{' '}
                                    {amusement.stamp_id
                                        ? `${stampMap[amusement.stamp_id] || 'Unknown stamp'} (ID: ${amusement.stamp_id})`
                                        : 'No stamp assigned'}
                                </p>
                            </div>

                            <button
                                onClick={() => handleEditClick(amusement.id)}
                                className="text-blue-600 hover:underline mt-4">
                                Add and edit info
                            </button>

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
            <Button onClick={handleCreateClick}>Add New Amusement</Button>
        </div>
    )
}
