// components/Modal.js

export default function Modal({ isOpen, closeModal, children }) {
    if (!isOpen) return null

    const handleBackdropClick = e => {
        // Only close if the click was directly on the backdrop, not its children
        if (e.target === e.currentTarget) {
            const confirm = window.confirm(
                'are you sure you want to exit the game?',
            )
            if (confirm) {
                closeModal()
            }
        }
    }

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleBackdropClick}>
            <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-600">
                    X
                </button>
                {children}
            </div>
        </div>
    )
}
