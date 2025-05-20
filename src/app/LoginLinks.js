'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import NavLink from '@/components/NavLink'
import Navigation from './(app)/Navigation'

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <div className="fixed top-0 right-0 px-6 py-4 bg-white border-b border-gray-100">
            {user ? (
                <NavLink
                    href="/dashboard"
                    className="ml-4 text-sm text-gray-700 underline"
                >
                    Dashboard
                </NavLink>
            ) : (
                <>
                    <NavLink
                        href="/login"
                        className="text-sm text-gray-700 underline"
                    >
                        Login
                    </NavLink>

                    <NavLink
                        href="/register"
                        className="ml-4 text-sm text-gray-700 underline"
                    >
                        Register
                    </NavLink>
                </>
            )}
        </div>
    )
}

export default LoginLinks
