'use client'

import React from 'react'
import { useGroupData } from '@/hooks/useGroupData'
import GroupCard from './GroupCard'

export default function GroupsList() {
    const {
        groupData,
        userData,
        amusementData, // Will use later
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

    console.log('Group Data:', groupData)
    console.log('Amusement Data:', amusementData)

    return (
        <div className="space-y-4">
            {groupData.data.map(group => {
                // Filter users for this group
                const members = userData.data.filter(
                    user => user.group_id === group.uuid,
                )

                // Filter amusements for this group
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
