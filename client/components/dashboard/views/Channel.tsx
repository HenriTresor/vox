'use client'
import { Button } from '@/components/ui/button'
import { ChatContext } from '@/context/ChatProvider'
import { Channel, Message } from '@/types/app'
import { PlusCircleIcon } from 'lucide-react'
import React, { useCallback, useEffect } from 'react'
import _ from 'lodash'
import { useQuery } from 'react-query'
import api from '@/lib/api'

type Props = { channel: Channel }

function ChannelComponent({ channel }: Props) {

    const { setCurrentChat, setMessages, messages, currentChat } = React.useContext(ChatContext)

    const getMessages = useCallback(async () => {
        const res = await api.server.POST('/messages', { users: channel.members, currentChannel: currentChat?._id })
        const data = await res.json()
        if (!data.status) throw new Error(data.message)
        setMessages(data?.messages)
    }, [currentChat?._id])

    // const { isLoading, data, status, refetch } = useQuery('messages', getMessages)
    // useEffect(() => {
    //     refetch()
    // }, [currentChat?._id])

    useEffect(() => {
        getMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChat?._id])
    const handleChannelChange = () => {
        setCurrentChat(channel)
    }

    useEffect(() => {
        console.log('current chat', currentChat)
    }, [currentChat])
    return (
        <div
            onClick={() => {
                handleChannelChange()
            }}
            className='flex p-2 justify-between items-center cursor-pointer mb-2 hover:bg-neutral-100 font-bold'>
            <h1># {channel?.name}</h1>
        </div>
    )
}

export default ChannelComponent