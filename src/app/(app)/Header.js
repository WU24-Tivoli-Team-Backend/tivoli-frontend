const Header = ({ title, description }) => {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    {title}
                </h1>
                <p className="text-gray-600 text-xs">{description}</p>
            </div>
        </header>
    )
}

export default Header
