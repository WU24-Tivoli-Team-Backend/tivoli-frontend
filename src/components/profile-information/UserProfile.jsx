'use client'
import { useFetch } from '@/hooks/useFetch'

export default function UserProfile() {
    const apiUrl = '/api/user'
    const {
        data: userData,
        error: userError,
        loading: userLoading,
    } = useFetch(apiUrl)

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
