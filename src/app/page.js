import LoginLinks from '@/app/LoginLinks'
import Button from '@/components/Button'
import Image from 'next/image'

export const metadata = {
    title: 'YRGO TIVOLI',
}

const Home = () => {
    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <LoginLinks />

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 flex flex-col content-center justify-center">
                    <h1 className="text-8xl text-center">WELCOME TO YRGO TIVOLI</h1>
                    <Image src="/red-panda-front-page.png" alt='red panda' width={500} height={500} />  
                </div>
            </div>
        </>
    )
}

export default Home
