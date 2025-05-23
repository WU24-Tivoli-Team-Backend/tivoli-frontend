import GroupList from '@/components/group-information/GroupList'
import Header from '@/app/(app)/Header'
import '@/components/tivoli/tivoli-background.css'

export default function Groups() {
    return (
        <>
            <Header
                title="Groups"
                description="These are the students at YRGO's web development course that have created the page and the amusements"
            />

            <div className="tivoli-container relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/bg-image-park.png')",
                    }}></div>

                <div className="tivoli-gradient-overlay absolute inset-0 bg-gradient-to-b from-black/50 to-black/50"></div>

                <div className="relative z-10 p-4">
                    <GroupList />
                </div>
            </div>
        </>
    )
}
