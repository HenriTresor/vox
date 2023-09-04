'use client'
import React, { useRef, useEffect, MutableRefObject } from 'react'
import { Socket, io } from 'socket.io-client'

const url = process.env.NEXT_PUBLIC_SOCKET_URL

type Props = {
    children: React.ReactNode
}

type defaultTypes = {
    socket: MutableRefObject<Socket<any>>
}



export const SocketContext = React.createContext<defaultTypes | any>(null)

function SocketProvider({ children }: Props) {
    const socket = useRef<Socket | null>(null)
    useEffect(() => {
        socket.current = io(`${url}`)
    }, [])

    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    )
}

export default SocketProvider