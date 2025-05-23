import { useEffect } from 'react'

export default function Modal({ isOpen, closeModal, children }) {
    if (!isOpen) return null

    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            const confirm = window.confirm(
                'are you sure you want to exit the game?',
            )
            if (confirm) {
                closeModal()
            }
        }
    }

    useEffect(() => {
    if (isOpen) {
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        
        return () => {
            document.body.style.overflow = originalOverflow
        }
    }
}, [isOpen])

    return (
    <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 overflow-y-auto"
        onClick={handleBackdropClick}
        style={{
            minHeight: '100dvh',
        }}>
        
        <div className="min-h-full flex items-start justify-center p-4 py-8">
            <div
                className="bg-white rounded-lg w-full relative shadow-xl"
                style={{
                    maxWidth: '28rem',
                    maxHeight: '90dvh',
                }}
                onClick={e => e.stopPropagation()}>
                
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-600 z-10 p-2 hover:bg-gray-100 rounded-full"
                    style={{ touchAction: 'manipulation' }}>
                    ✕
                    className="absolute top-2 right-2 text-gray-600 z-10 p-2 hover:bg-gray-100 rounded-full"
                    style={{ touchAction: 'manipulation' }}
                    ✕
                </button>
                
                <div
                    className="p-6 overflow-y-auto"
                    style={{
                        maxHeight: 'calc(90dvh - 2rem)',
                        WebkitOverflowScrolling: 'touch',
                        touchAction: 'manipulation',
                    }}>
                    {children}
                </div>
            </div>
        </div>
    </div>
)
}
