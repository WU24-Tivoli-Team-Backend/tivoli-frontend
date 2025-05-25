import Link from 'next/link'

const ResponsiveNavLink = ({
    active = false,
    children,
    className = '',
    ...props
}) => (
    <Link
        {...props}
        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium leading-5 focus:outline-none transition duration-300 ease-in-out ${
            active
                ? 'border-white text-white bg-purple-600/50 focus:bg-purple-700/50'
                : 'border-transparent text-white hover:text-white hover:bg-purple-600/30 hover:border-white/50 focus:text-white focus:bg-purple-600/30 focus:border-white/50'
        } ${className}`}>
        {children}
    </Link>
)

export const ResponsiveNavButton = ({ className = '', ...props }) => (
    <button
        className={`block w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium leading-5 focus:outline-none transition duration-300 ease-in-out border-transparent text-white hover:text-white hover:bg-purple-600/30 hover:border-white/50 focus:text-white focus:bg-purple-600/30 focus:border-white/50 ${className}`}
        {...props}
    />
)

export default ResponsiveNavLink
