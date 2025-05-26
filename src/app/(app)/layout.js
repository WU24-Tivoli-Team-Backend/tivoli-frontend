'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />

            <main>{children}</main>
            <footer className="bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 shadow-lg backdrop-blur-sm">
                <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="text-white/90 text-center space-y-4">
                        <p className="text-sm">
                            &copy; {new Date().getFullYear()}{' '}
                            <a
                                href="https://github.com/WU24-Tivoli-Team-Backend"
                                className="text-white underline hover:text-white/70 transition">
                                Team Backend
                            </a>
                        </p>
                        <p className="text-xs text-white/70">
                            We are the team that created this Tivoli page and
                            the API that our classmates connect to.
                        </p>
                        <div className="flex justify-around flex-wrap gap-y-2 text-sm">
                            <a
                                href="https://github.com/Andreawingardh"
                                className="hover:underline">
                                Andrea Wingårdh
                            </a>
                            <a
                                href="https://github.com/Johan-Hagman"
                                className="hover:underline">
                                Johan Hagman
                            </a>
                            <a
                                href="https://github.com/JosAhl"
                                className="hover:underline">
                                Josefine Ahlstrand
                            </a>
                            <a
                                href="https://github.com/PU-MEriksson"
                                className="hover:underline">
                                Malin Eriksson
                            </a>
                            <a
                                href="https://github.com/Viktor-TPD"
                                className="hover:underline">
                                Viktor Tohver Stridh
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default AppLayout
