'use client'
import React from 'react'

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

    const value = {
        authenticated, setAuthenticated, user, setUser
    }
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider