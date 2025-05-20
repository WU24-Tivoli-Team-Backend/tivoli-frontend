import ProfileCard from './ProfileCard'

export default function GroupCard({ group, members }) {
    return (
        <div className="bg-white m-4 shadow-md rounded-lg overflow-hidden">
            {/* Bild */}
            <div className="">
                {/* <Image
                    src=""
                    alt="Gruppbild"
                    layout="fill"
                    objectFit="cover"
                /> */}
                <div className="h-20 bg-pink-400 p-4">
                    Placeholder for image
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

                        {/* Amusements */}
                        <div className="mt-4">
                            <h4 className="font-medium text-gray-700 mb-2">
                                Amusements will be shown here
                            </h4>
                        </div>
                    </details>
                </div>
            </div>
        </div>
    )
}
