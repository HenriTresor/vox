import './globals.css'
import type { Metadata } from 'next'
import NotifyContextProvider from '@/context/NotifyContext'
import AuthContextProvider from '@/context/AuthContext'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import DialogContextProvider from '@/context/DialogContext'
import SocketProvider from '@/context/SocketProvider'
import { QueryClient, QueryClientProvider} from 'react-query'

export const metadata: Metadata = {
  title: 'Vox - Team management and collaboration system',
  description: 'A team management and collaboration system which ease working in teams',
}


const client = new QueryClient()
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
          <QueryClientProvider client={client}>
            <AuthContextProvider session={session}>
              <SocketProvider>
                <DialogContextProvider>
                  {children}
                </DialogContextProvider>
              </SocketProvider>
            </AuthContextProvider>
        </QueryClientProvider>
        </NotifyContextProvider>
      </body>
    </html>
  )
}
