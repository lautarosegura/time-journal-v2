import NavBar from '@/components/NavBar'
import { Toaster } from '@/components/ui/toaster'
import LogsContextProvider from '@/context/LogsContext'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Time Journal v2',
    description: 'A simple time tracking app'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <main className='max-w-6xl mx-auto min-h-screen'>
                    <NavBar />
                    <LogsContextProvider>{children}</LogsContextProvider>
                    <Toaster />
                </main>
            </body>
        </html>
    )
}
