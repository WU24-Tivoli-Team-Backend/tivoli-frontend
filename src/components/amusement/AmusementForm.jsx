'use client'
import axios from '@/lib/axios'
import Input from '../Input'
import { useFetch } from '@/hooks/useFetch'
import { useState, useEffect } from 'react'
import Button from '../Button'
import Select from '../Select'
import Label from '../Label'

export default function AmusementForm({
    amusementId,
    onSuccess = () => {},
    ...props
}) {
    // Initialize state with empty values
    const [form, setForm] = useState({
        name: '',
        type: '',
        description: '',
        url: '',
        image_url: '',
        stamp_id: '',
    })

    // Only fetch if we have an amusementId (editing mode)
    const isEditMode = !!amusementId
    const amusementUrl = isEditMode ? `/api/amusements/${amusementId}` : null

    const {
        data: amusementData,
        error: amusementError,
        loading: amusementLoading,
    } = useFetch(amusementUrl || '/api/dummy-endpoint')

    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()
    const [validationErrors, setValidationErrors] = useState({})

    // Only update form with existing data if in edit mode and data is loaded
    useEffect(() => {
        if (isEditMode && amusementData && !amusementLoading) {
            console.log('Loading existing amusement data:', amusementData)
            setForm({
                name: amusementData.name || '',
                type: amusementData.type || '',
                description: amusementData.description || '',
                url: amusementData.url || '',
                image_url: amusementData.image_url || '',
                stamp_id: amusementData.stamp_id || '',
            })
        }
    }, [isEditMode, amusementData, amusementLoading])

    const handleChange = e => {
        const { name, value } = e.target
        setForm(f => ({ ...f, [name]: value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log('Form data being sent:', form)
        setSuccessMessage('')
        setError(null)
        setValidationErrors({})
        try {
            await axios.get('/sanctum/csrf-cookie')
            console.log('CSRF cookie obtained')
            let res

            if (isEditMode) {
                // Update existing amusement
                res = await axios.put(`/api/amusements/${amusementId}`, form, {
                    headers: { 'Content-Type': 'application/json' },
                })
                setSuccessMessage('Amusement updated successfully!')
                onSuccess(res.data)
            } else {
                // Create new amusement
                console.log('About to send POST request to /api/amusements')
                const res = await axios.request({
                    method: 'post',
                    url: '/api/amusements',
                    data: form,
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                })

                setSuccessMessage('Amusement created successfully!')

                console.log('Calling onSuccess with created data')
                onSuccess(res.data)
            }
            setForm({
                name: '',
                type: '',
                description: '',
                url: '',
                image_url: '',
                stamp_id: '',
            })

            // Show success message
        } catch (err) {
            console.log(err)
            if (err.response?.data?.errors) {
                // Set validation errors
                setValidationErrors(err.response.data.errors)

                // Set general error message
                if (err.response.data.message) {
                    setError(err.response.data.message)
                } else {
                    setError('Please correct the validation errors below')
                }
            }
            // Show error message
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            {...props}>
            <h2 className="text-2xl font-bold">
                {isEditMode ? 'Edit Amusement' : 'Create New Amusement'}
            </h2>

            <p className="text-gray-500">
                {isEditMode
                    ? 'Update the amusement details below.'
                    : 'Fill in the details to create a new amusement.'}
            </p>

            {isEditMode && amusementError && (
                <div className="text-red-500">Error loading amusement data</div>
            )}

            {error && <div className="text-red-500">{error}</div>}

            {successMessage && (
                <div className="text-green-500">{successMessage}</div>
            )}

            <Label>Name</Label>
            <Input
                name="name"
                type="text"
                label="Name"
                placeholder="Name of amusement"
                value={form.name}
                onChange={handleChange}
                required
            />
            {validationErrors.name && validationErrors.name[0] && (
                <p className="text-red-500 text-sm mt-1">
                    {validationErrors.name[0]}
                </p>
            )}
            <Label>Type of amusement</Label>
            <Select
                id="type"
                name="type"
                className="block w-full mt-1"
                value={form.type}
                onChange={handleChange}
                required
                options={[
                    { value: '', label: 'Choose your type' },
                    { value: 'game', label: 'Game' },
                    { value: 'attraction', label: 'Attraction' },
                ]}
            />
            {validationErrors.type && validationErrors.type[0] && (
                <p className="text-red-500 text-sm mt-1">
                    {validationErrors.type[0]}
                </p>
            )}
            <Label>Description</Label>
            <Input
                name="description"
                type="text"
                label="Description"
                placeholder="Description of amusement"
                value={form.description}
                onChange={handleChange}
                required
            />
            {validationErrors.description &&
                validationErrors.description[0] && (
                    <p className="text-red-500 text-sm mt-1">
                        {validationErrors.description[0]}
                    </p>
                )}
            <Label>Deploy URL</Label>
            <Input
                name="url"
                type="text"
                label="URL"
                placeholder="URL for amusement"
                value={form.url}
                onChange={handleChange}
            />
            {validationErrors.url && validationErrors.url[0] && (
                <p className="text-red-500 text-sm mt-1">
                    {validationErrors.url[0]}
                </p>
            )}
            <Label>Image</Label>
            <Input
                name="image_url"
                type="text"
                label="Image URL"
                placeholder="Image URL for amusement"
                value={form.image_url}
                onChange={handleChange}
            />
            {validationErrors.image_url && validationErrors.image_url[0] && (
                <p className="text-red-500 text-sm mt-1">
                    {validationErrors.image_url[0]}
                </p>
            )}
            <Label>Stamp ID</Label>
            {/* <Input
                name="stamp_id"
                type="text"
                label="Stamp ID"
                placeholder="Stamp ID for amusement"
                value={form.stamp_id}
                onChange={handleChange}
            /> */}
            <Select
                id="stamp_id"
                name="stamp_id"
                className="block w-full mt-1"
                value={form.stamp_id}
                onChange={handleChange}
                required
                options={[
                    { value: '', label: 'Choose your stamp' },
                    { value: '1', label: 'Panda' },
                    { value: '6', label: 'Silver panda' },
                    { value: '7', label: 'Gold panda' },
                    { value: '8', label: 'Platinum panda' },
                    { value: '2', label: 'Orca' },
                    { value: '9', label: 'Silver Orca' },
                    { value: '10', label: 'Gold Orca' },
                    { value: '11', label: 'Platinum Orca' },
                    { value: '3', label: 'Raven' },
                    { value: '12', label: 'Silver Raven' },
                    { value: '13', label: 'Gold Raven' },
                    { value: '14', label: 'Platinum Raven' },
                    { value: '4', label: 'Blobfish' },
                    { value: '15', label: 'Silver Blobfish' },
                    { value: '16', label: 'Gold Blobfish' },
                    { value: '17', label: 'Platinum Blobfish' },
                    { value: '5', label: 'Pallas cat' },
                    { value: '18', label: 'Silver Pallas cat' },
                    { value: '19', label: 'Gold Pallas cat' },
                    { value: '20', label: 'Platinum Pallas cat' },
                ]}
            />
            {validationErrors.stamp_Id && validationErrors.stamp_id[0] && (
                <p className="text-red-500 text-sm mt-1">
                    {validationErrors.stamp_id[0]}
                </p>
            )}

            <Button type="submit" disabled={amusementLoading}>
                {isEditMode ? 'Update Amusement' : 'Create Amusement'}
            </Button>
        </form>
    )
}
