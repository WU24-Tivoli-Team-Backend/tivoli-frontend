'use client'
import { useFetch } from '@/hooks/useFetch'

export default function AmusementsInfo() {
    const apiUrl = '/api/amusements'
    const {
        data: amusementData,
        error: userError,
        loading: userLoading,
    } = useFetch(apiUrl)

    return (
        <>
            {userLoading && 'Loading...'}
            {userError && <p>Error: {userError.message}</p>}
            {amusementData?.data &&
                amusementData.data.map((amusementData, index) => (
                    <li key={index} style={{ listStyleType: 'none' }}>
                        <div>
                            <p>Amusement: {amusementData.name}</p>
                            <p>Type: {amusementData.type}</p>
                            <p>belongs to group: {amusementData.group_id}</p>
                            <p>{amusementData.url}</p>
                            <p>Description: {amusementData.description}</p>
                            <p>{amusementData.image}</p>
                            <br />
                        </div>
                    </li>
                ))}
        </>
    )
}
