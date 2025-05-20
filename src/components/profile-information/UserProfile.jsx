'use client'

import { useAuth } from "@/hooks/auth"
import Image from "next/image"

export default function UserProfile() {

    const { user } = useAuth({ middleware: 'auth' })

    //This will be added after May 26th:
    // This redirects Rune to the dashboard
    //     const { user } = useAuth({ middleware: 'auth' })
    // if (user.group_id == 8) {
    //     redirect('/groups')
    // }

    return (
        <>
            {user && (
                <div>
                    <h2>{user.name}</h2>
                    {user.image_url && <Image src={user.image_url} width={200} height={200} alt={`image of ${user.name}`} />}
                    {!user.image_url && <Image src="/Red_panda.png" width={200} height={200} alt={`image of ${user.name}`} />}
                    <p>{user.email}</p>
                    <p>Balance: €{user.balance}</p>
                    <p>Group: {user.group_id}</p>
                    <p>Github: {user.github && user.github}</p>
                    <p>URL: {user.url && user.url}</p>
                    <p>Stamps:</p>
                    <ul>
                        {user.stamps &&
                            user.stamps.map(stamp => (
                                <li key={stamp.id}>
                                    {stamp.premium_attribute
                                        ? `${stamp.premium_attribute} ${stamp.animal}`
                                        : stamp.animal}
                                </li>
                            ))}
                    </ul>

                </div>
            )}
        </>
    )
}
