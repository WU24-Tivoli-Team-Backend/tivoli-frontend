import Header from '@/app/(app)/Header'
import AmusementForm from '@/components/amusement/AmusementForm'
import AmusementList from '@/components/amusement/AmusementList'
import EditUserInfoForm from '@/components/forms/EditUserInfoForm'
import UserProfile from '@/components/profile-information/UserProfile'
export const metadata = {
    title: 'Laravel - Dashboard',
}


const Dashboard = () => {
    return (
        <>
            <Header title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You are logged in!
                        </div>
                        <UserProfile />
                        <EditUserInfoForm />
                        <AmusementList />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
