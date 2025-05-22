'use client'

import { useAuth } from '@/hooks/auth'
import ProfileCard from '../group-information/ProfileCard'
import EditUserInfoForm from '@/components/forms/EditUserInfoForm'
import { useState } from 'react'

export default function UserProfile() {
    const { user } = useAuth({ middleware: 'auth' })
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev)
    }

    //This will be added after May 26th:
    // This redirects Rune to the dashboard
    //     const { user } = useAuth({ middleware: 'auth' })
    // if (user.group_id == 8) {
    //     redirect('/groups')
    // }

    return (
        <section>
            {user && (
                <div className="bg-white shadow-md rounded-lg px-8 p-4 flex flex-col gap-2">
                    <h1 className="text-2xl font-bold mb-4">
                        Profile information
                    </h1>
                    <ProfileCard user={user} />
                    <div className="flex flex-col">
                        <p>Balance: €{user.balance}</p>
                        <p>Group: {user.group_id}</p>
                        <p>Stamps:</p>
                        <ul>
                            {user.stamps &&
                                user.stamps.map((stamp, index) => (
                                    <li key={index}>
                                        {stamp.premium_attribute
                                            ? `${stamp.premium_attribute} ${stamp.animal}`
                                            : stamp.animal}
                                    </li>
                                ))}
                        </ul>
                        {/* Dropdown Trigger */}
                        <button
                            onClick={toggleDropdown}
                            className="text-blue-600 hover:underline mt-4">
                            Add and edit info
                        </button>

                        {/* Dropdown Content */}
                        {isDropdownOpen && (
                            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                                <EditUserInfoForm user={user} />
                            </div>
                        )}
                    </div>

                    {/* Remove this when the rest of the page is done: */}

                    {/* <h2>{user.name}</h2>
                    {user.image_url && (
                        <Image
                            src={user.image_url}
                            width={200}
                            height={200}
                            alt={`image of ${user.name}`}
                        />
                    )}
                    {!user.image_url && (
                        <Image
                            src="/Red_panda.png"
                            width={200}
                            height={200}
                            alt={`image of ${user.name}`}
                        />
                    )}
                    <p>{user.email}</p>

                    <p>Github: {user.github && user.github}</p>
                    <p>URL: {user.url && user.url}</p> */}
                </div>
            )}
        </section>
    )
}
