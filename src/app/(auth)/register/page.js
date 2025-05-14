'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import axios from '@/lib/axios'

const RegisterPage = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [apiKey, setApiKey] = useState('')
    const [errors, setErrors] = useState({
        name: [],
        email: [],
        password: [],
        password_confirmation: [],
        api_key: [],
        group_id: [],
    })
    const [groupId, setGroupId] = useState(null)
    const [apiKeyValidated, setApiKeyValidated] = useState(false)
    const [apiKeyValidating, setApiKeyValidating] = useState(false)

    // Function to validate API key
    const validateApiKey = async () => {
        if (!apiKey.trim()) {
            setErrors(prev => ({ ...prev, api_key: ['API key is required.'] }))
            return
        }

        setApiKeyValidating(true)
        // Clear previous errors for api_key
        setErrors(prev => ({ ...prev, api_key: [] }))

        try {
            const response = await axios.post('/api/validate-api-key', {
                api_key: apiKey,
            })
            setGroupId(response.data.group_id)
            setApiKeyValidated(true)
        } catch (error) {
            console.error('API key validation error:', error)
            setApiKeyValidated(false)
            setGroupId(null)

            // Handle different types of error responses
            if (error.response && error.response.data) {
                if (
                    error.response.data.errors &&
                    error.response.data.errors.api_key
                ) {
                    // Laravel validation errors
                    setErrors(prev => ({
                        ...prev,
                        api_key: error.response.data.errors.api_key,
                    }))
                } else if (error.response.data.error) {
                    // Custom error message
                    setErrors(prev => ({
                        ...prev,
                        api_key: [error.response.data.error],
                    }))
                } else {
                    // Fallback error
                    setErrors(prev => ({
                        ...prev,
                        api_key: ['Error validating API key.'],
                    }))
                }
            } else {
                // Network or other error
                setErrors(prev => ({
                    ...prev,
                    api_key: ['Network error. Please try again.'],
                }))
            }
        } finally {
            setApiKeyValidating(false)
        }
    }

    const submitForm = event => {
        event.preventDefault()

        if (!apiKeyValidated) {
            setErrors(prev => ({
                ...prev,
                api_key: ['Please validate your API key before registering.'],
            }))
            return
        }

        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            group_id: groupId, // Send the validated group_id instead of the API key
            setErrors: newErrors => {
                const formattedErrors = {}
                for (const key in newErrors) {
                    formattedErrors[key] = Array.isArray(newErrors[key])
                        ? newErrors[key]
                        : [newErrors[key]]
                }
                setErrors({ ...errors, ...formattedErrors })
            },
        })
    }

    return (
        <form onSubmit={submitForm}>
            {/* API Key - Now first in the form */}
            <div>
                <Label htmlFor="api_key">API Key</Label>
                <div className="flex">
                    <Input
                        id="api_key"
                        type="text"
                        value={apiKey}
                        className="block mt-1 w-full rounded-r-none"
                        onChange={event => {
                            setApiKey(event.target.value)
                            setApiKeyValidated(false)
                        }}
                        required
                        disabled={apiKeyValidated}
                        autoFocus
                    />
                    <Button
                        type="button"
                        className={`mt-1 rounded-l-none ${apiKeyValidated ? 'bg-green-700 hover:bg-green-800' : ''}`}
                        onClick={validateApiKey}
                        disabled={apiKeyValidating || apiKeyValidated}>
                        {apiKeyValidating
                            ? 'Validating...'
                            : apiKeyValidated
                              ? 'Validated ✓'
                              : 'Validate'}
                    </Button>
                </div>
                {apiKeyValidated && (
                    <p className="mt-1 text-sm text-green-600">
                        API key validated successfully!
                    </p>
                )}
                <InputError messages={errors.api_key} className="mt-2" />
            </div>

            {/* Only show the rest of the form after API key is validated */}
            {apiKeyValidated && (
                <>
                    {/* Name */}
                    <div className="mt-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full"
                            onChange={event => setName(event.target.value)}
                            required
                        />
                        <InputError messages={errors.name} className="mt-2" />
                    </div>

                    {/* Email Address */}
                    <div className="mt-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <InputError
                            messages={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <Label htmlFor="passwordConfirmation">
                            Confirm Password
                        </Label>
                        <Input
                            id="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                        />
                        <InputError
                            messages={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href="/login"
                            className="underline text-sm text-gray-600 hover:text-gray-900">
                            Already registered?
                        </Link>

                        <Button className="ml-4">Register</Button>
                    </div>
                </>
            )}

            {/* Show the link to login page even if API key is not validated */}
            {!apiKeyValidated && (
                <div className="flex items-center justify-end mt-4">
                    <Link
                        href="/login"
                        className="underline text-sm text-gray-600 hover:text-gray-900">
                        Already registered?
                    </Link>
                </div>
            )}
        </form>
    )
}

export default RegisterPage
