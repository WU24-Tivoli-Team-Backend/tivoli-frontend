import Voting from '@/components/voting/Voting'
import Header from '@/app/(app)/Header'
import '@/components/tivoli/tivoli-background.css'

export default function Vote() {
    return (
        <>
            <Header
                title="Votes"
                description="This is where you can vote for your favorite amusements"
            />
            <div className="tivoli-container relative min-h-screen">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/bg-image-park.png')",
                    }}></div>

                <div className="tivoli-gradient-overlay absolute inset-0 bg-gradient-to-b from-black/50 to-black/50"></div>

                <div className="relative z-10 p-4">
                    <Voting />
                </div>
            </div>
        </>
    )
}
