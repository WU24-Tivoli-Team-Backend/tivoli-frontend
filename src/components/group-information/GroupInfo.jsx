'use client'
import { useFetch } from '@/hooks/useFetch'

export default function GroupData() {
    const apiUrl = '/api/groups'
    const {
        data: groupData,
        error: userError,
        loading: userLoading,
    } = useFetch(apiUrl)

    return (
        <>
            {userLoading && 'Laddar..'}
            {userError && <p>Error: {userError.message}</p>}
            {groupData?.data &&
                groupData.data.map((data, index) => (
                    <li key={index} style={{ listStyleType: 'none' }}>
                        <div>
                            <p>Group: {data.uuid}</p>
                            <p>Members:</p>
                        </div>
                    </li>
                ))}
        </>
    )
}
