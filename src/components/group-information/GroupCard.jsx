import Image from 'next/image'

export default function GroupCard({ groupData, userData, amusementData }) {
    return (
        <div className="w-full bg-white m-4 shadow-md rounded-lg overflow-hidden">
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
                <div>
                    <details className="accordion group p-4">
                        <summary className="accordion-header flex justify-between items-center gap-2 cursor-pointer">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Group {}
                            </h2>
                            <span className="inline-block w-4 h-4 text-gray-500 transition-transform group-open:rotate-90">
                                ▶
                            </span>
                        </summary>
                        <div className="accordion-content p-4"></div>
                    </details>
                </div>
            </div>
        </div>
    )
}
