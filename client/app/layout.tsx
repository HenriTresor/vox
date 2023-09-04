import './globals.css'
import type { Metadata } from 'next'
import NotifyContextProvider from '@/context/NotifyContext'
import AuthContextProvider from '@/context/AuthContext'
import { getServerSession } from 'next-auth'
import DialogContextProvider from '@/context/DialogContext'
import SocketProvider from '@/context/SocketProvider'
import ReactQueryProvider from '@/context/QueryClientProvider'
import ChatProvider from '@/context/ChatProvider'

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
          <ReactQueryProvider>
            <AuthContextProvider session={session}>
              <SocketProvider>
                <ChatProvider>
                  <DialogContextProvider>
                    {children}
                  </DialogContextProvider>
                </ChatProvider>
              </SocketProvider>
            </AuthContextProvider>
          </ReactQueryProvider>
        </NotifyContextProvider>
      </body>
    </html>
  )
}
