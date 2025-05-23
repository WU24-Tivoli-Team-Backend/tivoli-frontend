import ProfileCard from './ProfileCard'
import AmusementCard from '../amusement/AmusementCard'
import Image from 'next/image'

export default function GroupCard({ group, members, amusements = [] }) {
    return (
<div className="bg-white m-4 shadow-md rounded-lg overflow-hidden w-full max-w-2xl">
            {/* Bild */}
            <div className="">
                <div className="relative h-40 bg-pink-400 p-4">
                    <Image
                        src={amusements && amusements[0] && amusements[0].image_url ? amusements[0].image_url : '/Red_panda.png'}
                        alt="Group image"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                {/* Accordion */}
                <div className="">
                    <details className="accordion group p-4 w-full">
                        <summary className="w-full accordion-header flex justify-between items-center gap-2 cursor-pointer p-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {group.name ?? `Group ${group.uuid}`}
                            </h2>
                            <span className="inline-block w-4 h-4 text-gray-500 transition-transform group-open:rotate-90">
                                ▶
                            </span>
                        </summary>

                        {/* Members section */}
                        <div className="accordion-content p-4">
                            {members.length > 0 ? (
                                members.map(user => (
                                    <ProfileCard key={user.id} user={user} />
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No members registered for this group.
                                </p>
                            )}
                        </div>

                        {/* Amusements section */}
                        <div className="mt-4 p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Amusements
                            </h3>

                            {amusements && amusements.length > 0 ? (
                                <div className="flex flex-col space-y-4 w-full">
                                    {amusements.map(amusement => (
                                        <AmusementCard
                                            key={amusement.id}
                                            amusement={amusement}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No amusements for this group.
                                </p>
                            )}
                        </div>
                    </details>
                </div>
            </div>
        </div>
    )
}
