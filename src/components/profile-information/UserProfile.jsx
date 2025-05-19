'use client'
import { useFetch } from '@/hooks/useFetch'
import { useAuth } from '@/hooks/auth'
import { redirect } from 'next/navigation'

export default function UserProfile() {
    const apiUrl = '/api/user'
    const {
        data: userData,
        error: userError,
        loading: userLoading,
    } = useFetch(apiUrl)

    //This will be added after May 26th:
    // This redirects Rune to the dashboard
    //     const { user } = useAuth({ middleware: 'auth' })
    // if (user.group_id == 8) {
    //     redirect('/groups')
    // }

    return (
        <>
            {userLoading && 'Loading...'}
            {userError && 'Error'}
            {userData && (
                <div>
                    <h2>{userData.name}</h2>
                    <p>{userData.email}</p>
                    <p>Balance: €{userData.balance}</p>
                    <p>Group: {userData.group_id}</p>
                    <p>{userData.github && userData.github}</p>
                    <p>{userData.url && userData.url}</p>
                </div>
            )}
        </>
    )
}
