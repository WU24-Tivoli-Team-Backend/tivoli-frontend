import React from 'react'

export default function ProfileCard({ user }) {
    return (
        <div className="flex items-center bg-gray-100 p-4 rounded-lg space-x-4">
            {/* Profileimage-placeholder */}
            <div className="w-16 h-16 bg-white rounded-full flex-shrink-0" />

            {/* Textcontainer */}
            <div>
                {/* Namme */}
                <p className="text-lg font-medium text-black">{user.name}</p>

                {/* Links */}
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

                    {/* Show ”|” only if both GitHub and website links are provided */}
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
