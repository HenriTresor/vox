'use client'
import React, { useEffect, useContext } from 'react'
import { NotifyContext } from './NotifyContext'
import api from '@/lib/api'

type Props = {
    children: React.ReactNode
}

type User = {
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
    user: User | null
}

const defaultValues = {
    authenticated: false,
    user: null
}

export const AuthContext = React.createContext<ContextTypes>(defaultValues)
function AuthContextProvider({ children }: Props) {

    const [authenticated, setAuthenticated] = React.useState<boolean>(false)
    const [user, setUser] = React.useState<User | null>(null)
    const { notify } = useContext(NotifyContext)
    const getUser = async () => {
        try {
            const res = await api.server.GET('/user/me')
            const data = await res.json()
            notify({ message: data.message, type: 'info' })
        } catch (error: any) {
            notify({ message: error.message, type: 'error' })
        }
    }
    useEffect(() => { getUser() }, [])
    const value = {
        authenticated, setAuthenticated, user, setUser
    }
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider