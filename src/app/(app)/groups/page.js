import GroupList from '@/components/group-information/GroupList'
import Header from '@/app/(app)/Header'

export default function Groups() {
    return (
        <>
            <Header
                title="Groups"
                description="These are the students at YRGO's web development course that have created the page and the amusements"
            />
            <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
                <GroupList />
            </div>
        </>
    )
}
