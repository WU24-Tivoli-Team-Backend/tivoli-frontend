'use client'

import Button from './Button'
import { redirect, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import { useState, useEffect } from 'react'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

export default function GuestLoginButton() {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/tivoli',
    })

    const [email, setEmail] = useState('rune@yrgobanken.vip')
    const [password, setPassword] = useState('password')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        setEmail('rune@yrgobanken.vip')
        setPassword('password')
        setShouldRemember(false)

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })

        redirect('/tivoli')
    }

    return (
        <>
            <AuthSessionStatus className="mb-4" status={status} />
            <form onSubmit={submitForm}>
                <Button>Visit as guest</Button>
            </form>
        </>
    )
}
