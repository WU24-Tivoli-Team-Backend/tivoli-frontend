const Button = ({
    type = 'submit',
    className = '',
    variant = 'primary',
    ...props
}) => {
    // Define gradient variants similar to the homepage buttons
    const variants = {
        primary:
            'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
        success:
            'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
    }

    const baseClasses =
        'inline-flex items-center justify-center w-full px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none disabled:opacity-25'

    // Use the variant styling or default to primary if specified variant doesn't exist
    const variantClasses = variants[variant] || variants.primary

    return (
        <button
            type={type}
            className={`${baseClasses} ${variantClasses} ${className}`}
            {...props}
        />
    )
}

export default Button
