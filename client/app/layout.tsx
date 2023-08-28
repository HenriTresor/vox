import { ToastContainer } from 'react-toastify'
import './globals.css'
import type { Metadata } from 'next'
import NotifyContextProvider from '@/context/NotifyContext'
import AuthContextProvider from '@/context/AuthContext'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Vox - Team management and collaboration system',
  description: 'A team management and collaboration system which ease working in teams',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession()
  return (
    <html lang="en">
      <body>
        <AuthContextProvider session={session}>
          <NotifyContextProvider>
            {children}
          </NotifyContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
