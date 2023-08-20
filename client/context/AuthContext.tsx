'use client'
import React, { useEffect, useContext } from 'react'
import { NotifyContext } from './NotifyContext'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'

type Props = {
    children: React.ReactNode
}

export type User = {
    email: string,
    firstName: string,
    lastName: string,
    _id: string,
    createdAt: Date,
    updatedAt: Date,
    verifiedAccount: boolean
}
type ContextTypes = {
    authenticated: boolean,
    user: User | null,
    setAuthenticated: (val: boolean) => void,
    setUser: any,
    logout: () => void
}

const defaultValues = {
    authenticated: false,
    user: null,
    setAuthenticated: () => { },
    setUser: () => { },
    logout: () => { }
}

export const AuthContext = React.createContext<ContextTypes>(defaultValues)
function AuthContextProvider({ children }: Props) {

    const [authenticated, setAuthenticated] = React.useState<boolean>(false)
    const [user, setUser] = React.useState<User | null>(null)
    const { notify } = useContext(NotifyContext)
    const router = useRouter()


    const logout = () => {
        setUser(null)
        setAuthenticated(false)
        localStorage.removeItem('email')
        document.cookie = ''
        router.push('/login')
    }
    const getUser = React.useCallback(async () => {
        try {
            const res = await api.server.GET('/users/me')
            const data = await res.json()
            if (!data.status) return notify({ message: data.message, type: 'error' })
            setAuthenticated(true)
            setUser(data.user)
        } catch (error: any) {
            notify({ message: error.message, type: 'error' })
        }
    }, [])
    useEffect(() => {
        localStorage.getItem('email') && getUser()
    }, [])
    const value = {
        authenticated, setAuthenticated, user, setUser, logout
    }
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider