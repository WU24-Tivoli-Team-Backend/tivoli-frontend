'use client'
import { useFetch } from '@/hooks/useFetch'
import { useState } from 'react'
import GameIframe from '../GameIframe'

export default function GroupData() {
    const [openAmusement, setOpenAmusement] = useState(null)

    const groupsApiUrl = '/api/groups'
    const usersApiUrl = '/api/users'
    const amusementsApiUrl = '/api/amusements'

    const {
        data: groupData,
        error: groupError,
        loading: groupLoading,
    } = useFetch(groupsApiUrl)

    const {
        data: userData,
        error: userError,
        loading: userLoading,
    } = useFetch(usersApiUrl)

    const {
        data: amusementData,
        error: amusementError,
        loading: amusementLoading,
    } = useFetch(amusementsApiUrl)

    if (groupLoading || userLoading || amusementLoading)
        return <p>Loading...</p>
    if (groupError) return <p>Error loading groups: {groupError.message}</p>
    if (userError) return <p>Error loading users: {userError.message}</p>
    if (amusementError)
        return <p>Error loading amusement: {amusementError.message}</p>

    return (
        <>
            {groupData?.data &&
                groupData.data.map((group, index) => (
                    <li key={index} style={{ listStyleType: 'none' }}>
                        <div>
                            <p>Group: {group.uuid}</p>

                            <p>Members:</p>
                            <ul>
                                {userData?.data
                                    .filter(
                                        user => user.group_id === group.uuid,
                                    )
                                    .map((user, userIndex) => (
                                        <li
                                            key={userIndex}
                                            style={{ listStyleType: 'none' }}>
                                            {user.name}
                                        </li>
                                    ))}
                                <br />
                            </ul>

                            <p>Amusements:</p>
                            <ul>
                                {amusementData?.data
                                    .filter(
                                        amusement =>
                                            amusement.group_id === group.uuid,
                                    )
                                    .map(amusement => (
                                        <li
                                            key={amusement.id}
                                            style={{ listStyleType: 'none' }}>
                                            <button
                                                onClick={() =>
                                                    setOpenAmusement(
                                                        openAmusement ===
                                                            amusement.id
                                                            ? null
                                                            : amusement.id,
                                                    )
                                                }>
                                                {amusement.name}
                                            </button>
                                            <p>Type: {amusement.type}</p>
                                            <p>URL: {amusement.url}</p>
                                            <p>
                                                Description:{' '}
                                                {amusement.description}
                                            </p>
                                            <p>Image: {amusement.image}</p>
                                            {openAmusement === amusement.id && (
                                                <GameIframe
                                                    url={amusement.url}
                                                />
                                            )}
                                            <br />
                                        </li>
                                    ))}
                            </ul>
                            <br />
                        </div>
                    </li>
                ))}
        </>
    )
}
