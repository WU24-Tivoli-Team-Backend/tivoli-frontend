'use client'
import { useAuth } from '@/hooks/auth'
import { useFetch } from '@/hooks/useFetch'
import AmusementForm from './AmusementForm'
import Button from '../Button'
import Link from 'next/link'

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
        return <p>Error loading amusements: {amusementError.message}</p>

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
    const handleFormSuccess = data => {
        console.log('Form submission successful with data:', data)
        setShowCreateForm(false)
        setEditingAmusementId(null)
        refetch()
        setSuccessMessage('Amusement created and/or updated')// Refresh the data
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Amusements</h2>
                {successMessage && <p className='text-green-500'>{successMessage}</p>}
                <Button onClick={handleCreateClick}>Add New Amusement</Button>
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
                                    <p className="text-gray-600">
                                        {amusement.description}
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
    )
}
