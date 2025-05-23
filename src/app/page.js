'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
// import GuestLoginButton from '@/components/GuestLoginButton'

const Home = () => {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Full-screen background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/red-panda-wide.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
            </div>

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/30 via-transparent to-purple-500/20 animate-pulse"></div>

            {/* Main content container */}
            <div className="relative z-20 min-h-screen flex flex-col">
                {/* Top Banner - YRGO TIVOLI */}
                <div className="w-full flex justify-center lg:justify-start lg:pl-[33.33%] pt-8 lg:pt-12">
                    <div className="relative">
                        {/* Enhanced blur background for banner */}
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-2xl rounded-3xl transform -rotate-1 shadow-xl"></div>

                        <div className="relative px-8 lg:px-12 py-4 lg:py-6">
                            <p className="text-sm sm:text-base lg:text-lg mt-2 lg:mt-4 text-white/90 font-medium animate-fade-in-up text-center lg:text-left drop-shadow-lg">
                                WU24 presents:
                            </p>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-none text-center lg:text-left">
                                <span className="animate-color-shift-1 mr-4 lg:mr-8 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_2px_2px_0_rgb(0_0_0),_-2px_-2px_0_rgb(0_0_0),_2px_-2px_0_rgb(0_0_0),_-2px_2px_0_rgb(0_0_0)]">
                                    YRGO
                                </span>
                                <span className="animate-color-shift-2 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] [text-shadow:_2px_2px_0_rgb(0_0_0),_-2px_-2px_0_rgb(0_0_0),_2px_-2px_0_rgb(0_0_0),_-2px_2px_0_rgb(0_0_0)]">
                                    TIVOLI
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <div className="flex-1 flex items-center justify-center lg:justify-start lg:pl-[66.66%] lg:pr-[8.33%] p-6 lg:p-8">
                    <div className="w-full max-w-lg relative">
                        {/* Glassmorphism card */}
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-10 lg:p-12 shadow-2xl">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Get Started
                                </h2>
                                <p className="text-white/80">
                                    See what we've been up to
                                </p>
                            </div>

                            {user ? (
                                /* User is logged in */
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <p className="text-white mb-4">
                                            Welcome back,{' '}
                                            <span className="font-semibold">
                                                {user.name}
                                            </span>
                                            !
                                        </p>
                                    </div>
                                    <Link href="/dashboard" className="block">
                                        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                            Go to Dashboard
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                /* User is not logged in */
                                <div className="space-y-4">
                                    <Link href="/login" className="block">
                                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                            Login
                                        </button>
                                    </Link>

                                    <Link href="/register" className="block">
                                        <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                            Register
                                        </button>
                                    </Link>

                                    {/* <GuestLoginButton className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl" /> */}

                                    <div className="text-center mt-6">
                                        <p className="text-white/70 text-sm">
                                            First time here? Create an account
                                            to start exploring!
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Floating decorative elements */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full opacity-20 animate-float"></div>
                        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full opacity-20 animate-float-delayed"></div>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes color-shift-1 {
                    0%,
                    100% {
                        color: #ff6b6b;
                        text-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
                    }
                    25% {
                        color: #4ecdc4;
                        text-shadow: 0 0 20px rgba(78, 205, 196, 0.5);
                    }
                    50% {
                        color: #45b7d1;
                        text-shadow: 0 0 20px rgba(69, 183, 209, 0.5);
                    }
                    75% {
                        color: #f9ca24;
                        text-shadow: 0 0 20px rgba(249, 202, 36, 0.5);
                    }
                }

                @keyframes color-shift-2 {
                    0%,
                    100% {
                        color: #6c5ce7;
                        text-shadow: 0 0 20px rgba(108, 92, 231, 0.5);
                    }
                    25% {
                        color: #fd79a8;
                        text-shadow: 0 0 20px rgba(253, 121, 168, 0.5);
                    }
                    50% {
                        color: #00b894;
                        text-shadow: 0 0 20px rgba(0, 184, 148, 0.5);
                    }
                    75% {
                        color: #e17055;
                        text-shadow: 0 0 20px rgba(225, 112, 85, 0.5);
                    }
                }

                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                    }
                }

                @keyframes float-delayed {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-15px) rotate(-180deg);
                    }
                }

                .animate-color-shift-1 {
                    animation: color-shift-1 4s ease-in-out infinite;
                }

                .animate-color-shift-2 {
                    animation: color-shift-2 4s ease-in-out infinite 1s;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out 0.5s both;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 8s ease-in-out infinite 2s;
                }
            `}</style>
        </div>
    )
}

export default Home
