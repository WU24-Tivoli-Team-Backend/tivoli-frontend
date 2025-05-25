import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const Navigation = ({ user }) => {
    const { logout } = useAuth()
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <nav className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 border-b border-purple-700 shadow-lg relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/dashboard">
                                <ApplicationLogo className="block h-10 w-auto fill-current text-white" />
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href="/dashboard"
                                active={usePathname() === '/dashboard'}
                                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-200"
                                activeClassName="border-b-2 border-white font-bold text-white">
                                Dashboard
                            </NavLink>
                            <NavLink
                                href="/groups"
                                active={usePathname() === '/groups'}
                                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-200"
                                activeClassName="border-b-2 border-white font-bold text-white">
                                Groups
                            </NavLink>
                            <NavLink
                                href="/votes"
                                active={usePathname() === '/votes'}
                                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-200"
                                activeClassName="border-b-2 border-white font-bold text-white">
                                Votes
                            </NavLink>
                            <NavLink
                                href="/tivoli"
                                active={usePathname() === '/tivoli'}
                                className="text-white/90 hover:text-white hover:scale-105 transition-all duration-200"
                                activeClassName="border-b-2 border-white font-bold text-white">
                                Tivoli
                            </NavLink>
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button className="flex items-center text-sm font-medium text-white hover:text-white/90 focus:outline-none transition duration-150 ease-in-out bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20">
                                    <div>{user?.name}</div>

                                    <div className="ml-1">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            }>
                            <DropdownButton onClick={logout}>
                                Logout
                            </DropdownButton>
                        </Dropdown>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-purple-700/50 focus:outline-none focus:bg-purple-700/50 transition duration-150 ease-in-out">
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {open && (
                <div className="block sm:hidden bg-gradient-to-b from-purple-600 to-blue-700 shadow-lg">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/dashboard"
                            active={pathname === '/dashboard'}
                            className="text-white hover:bg-purple-700/50">
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href="/groups"
                            active={pathname === '/groups'}
                            className="text-white hover:bg-purple-700/50">
                            Groups
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href="/votes"
                            active={pathname === '/votes'}
                            className="text-white hover:bg-purple-700/50">
                            Votes
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href="/tivoli"
                            active={pathname === '/tivoli'}
                            className="text-white hover:bg-purple-700/50">
                            Tivoli
                        </ResponsiveNavLink>
                    </div>

                    {/* Simplified section with just the logout button */}
                    <div className="pt-4 pb-1 border-t border-purple-800">
                        <div className="px-4">
                            <ResponsiveNavButton
                                onClick={logout}
                                className="text-white hover:bg-purple-700/50 w-full">
                                Logout
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation
