import Link from 'next/link'
import { Menu } from '@headlessui/react'

const DropdownLink = ({ children, ...props }) => (
    <Menu.Item>
        {({ active }) => (
            <Link
                {...props}
                className={`w-full text-left block px-4 py-2 text-sm leading-5 text-white focus:outline-none transition duration-150 ease-in-out ${
                    active ? 'bg-purple-600' : ''
                }`}>
                {children}
            </Link>
        )}
    </Menu.Item>
)

export const DropdownButton = ({ children, ...props }) => (
    <Menu.Item>
        {({ active }) => (
            <button
                className={`w-full text-left block px-4 py-2 text-sm leading-5 text-white focus:outline-none transition duration-150 ease-in-out ${
                    active ? 'bg-purple-600' : ''
                }`}
                {...props}>
                {children}
            </button>
        )}
    </Menu.Item>
)

export default DropdownLink
