import { ToastContainer } from 'react-toastify'
import './globals.css'
import type { Metadata } from 'next'
import NotifyContextProvider from '@/context/NotifyContext'
import AuthContextProvider from '@/context/AuthContext'
import api from '@/lib/api'

export const metadata: Metadata = {
  title: 'Vox - Team management and collaboration system',
  description: 'A team management and collaboration system which ease working in teams',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <NotifyContextProvider>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </NotifyContextProvider>
      </body>
    </html>
  )
}
