import './globals.css'
import type { Metadata } from 'next'
import NotifyContextProvider from '@/context/NotifyContext'
import AuthContextProvider from '@/context/AuthContext'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import DialogContextProvider from '@/context/DialogContext'

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
        <NotifyContextProvider>
          <AuthContextProvider session={session}>
            <DialogContextProvider>
              {children}
            </DialogContextProvider>
          </AuthContextProvider>
        </NotifyContextProvider>
      </body>
    </html>
  )
}
