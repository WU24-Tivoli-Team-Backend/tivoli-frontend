import { Nunito } from 'next/font/google'
import '@/app/global.css'

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
            <body
                className="antialiased bg-cover bg-center"
                style={{
                    backgroundImage:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/tivoli-bg2.png')",
                }}>
                {children}
            </body>
        </html>
    )
}

export const metadata = {
    title: 'Yrgo Tivoli',
}

export default RootLayout
