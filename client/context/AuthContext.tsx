'use client'
import React, { useEffect, useContext } from 'react'
import { NotifyContext } from './NotifyContext'
import api from '@/lib/api'
import { SessionProvider, } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'

type Props = {
    children: React.ReactNode,
    session: Session | null
}



function AuthContextProvider({ children, session }: Props) {

    return (
        <SessionProvider session={session}>{children}</SessionProvider>
    )
}

export default AuthContextProvider