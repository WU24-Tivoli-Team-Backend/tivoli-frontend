'use client'
import { useAuth } from "@/hooks/auth"


export default function UserProfile() {

    const { user } = useAuth({ middleware: 'auth' })
    // const apiUrl = '/api/user'
    // const {
    //     data: userData,
    //     error: userError,
    //     loading: userLoading,
    // } = useFetch(apiUrl)

    return (
        <>
            {/* {userLoading && 'Loading...'}
            {userError && 'Error'} */}
            {user && (
                <div>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>Balance: €{user.balance}</p>
                    <p>Group: {user.group_id}</p>
                    <p>Github: {user.github && user.github}</p>
                    <p>URL: {user.url && user.url}</p>
                    <p>Stamps: {user.stamps && user.stamps.map((stamp) => {
                        <p>{ stamp }</p>
                    })}</p>
                </div>
            )}
        </>
    )
}
