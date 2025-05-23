import Voting from '@/components/voting/Voting'
import Header from '@/app/(app)/Header'

export default function Vote() {
    return (
        <>
            <Header
                title="Vote"
                description="This is where you can vote for your favorite amusements"
            />
            <div>
                <Voting />
            </div>
        </>
    )
}
