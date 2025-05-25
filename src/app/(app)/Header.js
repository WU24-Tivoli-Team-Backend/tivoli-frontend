const Header = ({ title, description }) => {
    return (
        <header className="bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 shadow-lg backdrop-blur-sm">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-10 w-16 h-16 bg-white/5 rounded-full -mb-8 animate-float"></div>

                <div className="relative">
                    <h1 className="font-bold text-2xl md:text-3xl text-white leading-tight">
                        {title}
                    </h1>
                    <p className="text-white/80 mt-2 max-w-3xl">
                        {description}
                    </p>
                </div>
            </div>
        </header>
    )
}

export default Header
