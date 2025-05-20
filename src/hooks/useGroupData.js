'use client'

import { useFetch } from '@/hooks/useFetch'

export function useGroupData() {
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

    return {
        groupData,
        userData,
        amusementData,
        groupLoading,
        userLoading,
        amusementLoading,
        groupError,
        userError,
        amusementError,
    }
}
