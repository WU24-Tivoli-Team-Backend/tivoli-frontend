import { Nunito } from 'next/font/google'
import '@/app/global.css'

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover"></meta>
<meta name="apple-mobile-web-app-capable" content="yes"></meta>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
            <body className="antialiased">{children}</body>
        </html>
    )
}

export const metadata = {
    title: 'Yrgo Tivoli',
}

export default RootLayout
