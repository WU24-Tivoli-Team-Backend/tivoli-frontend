import LoginLinks from '@/app/LoginLinks'
import Image from 'next/image'
//import GuestLoginButton from '@/components/GuestLoginButton'

export const metadata = {
    title: 'YRGO TIVOLI',
}

const Home = () => {
    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
                <LoginLinks />

                <div className="flex flex-col items-center gap-8 pt-16 sm:pt-48 p-6">
                    <h1 className="text-8xl text-center">YRGO TIVOLI</h1>
                    <Image
                        src="/images/red-panda-wide.png"
                        alt="red panda"
                        width={500}
                        height={500}
                        priority // Preload the image for better performance
                        style={{ width: 'auto', height: 'auto' }} // Ensure aspect ratio is maintained
                    />
                    {/* This will be added after May 26th:{' '} 
                    <GuestLoginButton className="size-fit" /> */}
                </div>
            </div>
        </>
    )
}

export default Home
