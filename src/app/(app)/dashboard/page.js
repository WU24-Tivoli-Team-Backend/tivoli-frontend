import Header from '@/app/(app)/Header'
import UserProfile from '@/components/profile-information/UserProfile'
import UserAmusementContainer from '@/components/amusement/UserAmusementContainer'
import '@/components/tivoli/tivoli-background.css'

export const metadata = {
    title: 'Laravel - Dashboard',
}

const Dashboard = () => {
    return (
        <>
            <Header
                title="Dashboard"
                description="This is where you manage your information and attractions"
            />
            <div className="tivoli-container">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/bg-image-park.png')",
                    }}></div>

                {/* Gradient Overlay */}
                <div className="tivoli-gradient-overlay"></div>

                {/* Content */}
                <div className="tivoli-content-container">
                    <div className="py-12">
                        <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col gap-8">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    You are logged in!
                                </div>
                                <UserProfile />
                                <UserAmusementContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
