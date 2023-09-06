'use client'
import { Channel, Message } from '@/types/app'
import React from 'react'

type Props = {
    children: React.ReactNode
}

type DefaultTypes = {
    currentChat: Channel | null;
    setCurrentChat: (vl: any) => void;
    messages: Message[] | any;
    setMessages: (vl: any) => void;
}

const defaultValues = {
    currentChat: null,
    setCurrentChat: () => { },
    messages: [],
    setMessages: (vl: Message) => { },
}


export const ChatContext = React.createContext<DefaultTypes>(defaultValues)
function ChatProvider({ children }: Props) {
    const [currentChat, setCurrentChat] = React.useState<Channel | null>(null)
    const [messages,setMessages] = React.useState<Message[]| null>(null)

    const value: DefaultTypes = {
        currentChat,
        setCurrentChat,
        messages,
        setMessages
    }
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider