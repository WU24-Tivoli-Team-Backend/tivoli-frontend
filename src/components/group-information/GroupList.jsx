'use client'

import React from 'react'
import { useGroupData } from '@/hooks/useGroupData'
import GroupCard from './GroupCard'

export default function GroupsList() {
    const {
        groupData,
        userData,
        amusementData,
        groupLoading,
        userLoading,
        amusementLoading,
        groupError,
        userError,
        amusementError,
    } = useGroupData()

    if (groupLoading || userLoading || amusementLoading) {
        return <p>Loading…</p>
    }
    if (groupError || userError || amusementError) {
        return <p>An error occured while fetching data</p>
    }

    return (
        <div className="space-y-4 max-w-4xl mx-auto sm:px-6 lg:px-8 flex flex-col items-center">
            {groupData.data.map(group => {
                const members = userData.data.filter(
                    user => user.group_id === group.uuid,
                )

                const amusements = amusementData.data.filter(
                    amusement => amusement.group_id === group.uuid,
                )

                return (
                    <GroupCard
                        key={group.uuid}
                        group={group}
                        members={members}
                        amusements={amusements}
                    />
                )
            })}
        </div>
    )
}
