'use client'
import { Channel } from '@/types/app'
import React from 'react'

type Props = {
    children: React.ReactNode
}

type DefaultTypes = {
    currentChat: Channel | null;
    setCurrentChat: (vl: any) => void;
}

const defaultValues = {
    currentChat: null,
    setCurrentChat: () => {}
}


export const ChatContext = React.createContext<DefaultTypes>(defaultValues)
function ChatProvider({ children }: Props) {
    const [currentChat, setCurrentChat] = React.useState<Channel | null>(null)

    const value: DefaultTypes = {
        currentChat,
        setCurrentChat
    }
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider