import GroupList from '@/components/group-information/GroupList'
import Header from '@/app/(app)/Header'

export default function Groups() {
    return (
        <>
            <Header
                title="Groups"
                description="These are the students at YRGO's web development course that have created the page and the amusements"
            />
            <div className="bg-white min-h-screen p-4">
                <GroupList />
            </div>
        </>
    )
}
