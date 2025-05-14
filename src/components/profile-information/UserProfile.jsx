'use client'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useFetch } from '@/hooks/useFetch'
import Image from 'next/image'

export default function UserProfile() {
    const apiUrl = '/api/user'
    const {
        data: userData,
        error: userError,
        loading: userLoading,
    } = useFetch(apiUrl)

    return (
        <>
            {userLoading && 'Laddar..'}
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
