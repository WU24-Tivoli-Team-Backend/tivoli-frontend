import React from 'react'
import Image from 'next/image'

export default function ProfileCard({ user }) {
    return (
        <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg space-x-4 w-full max-w-md my-4">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                <Image
                    src={user.image_url || '/Red_panda.png'}
                    alt={`Profile image of ${user.name}`}
                    width={64}
                    height={64}
                    className="object-cover"
                />
            </div>

            <div>
                <p className="text-lg font-medium text-black">{user.name}</p>

                <div className="mt-1 flex items-center text-sm text-gray-600 space-x-2">
                    {user.github && (
                        <a
                            href={user.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline">
                            GITHUB
                        </a>
                    )}

                    {user.github && user.url && <span>|</span>}

                    {user.url && (
                        <a
                            href={user.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline">
                            WEBSITE
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
