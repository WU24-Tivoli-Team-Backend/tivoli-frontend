import Link from 'next/link'

const NavLink = ({
    active = false,
    children,
    className = '',
    activeClassName = '',
    ...props
}) => (
    <Link
        {...props}
        className={`inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-300 ease-in-out border-b-2 ${
            active
                ? `text-white border-white font-bold ${activeClassName}`
                : `border-transparent text-white/90 hover:text-white hover:scale-105 ${className}`
        }`}>
        {children}
    </Link>
)

export default NavLink
