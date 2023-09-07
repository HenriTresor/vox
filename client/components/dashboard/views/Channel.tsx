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

    const { setCurrentChat, setMessages, messages } = React.useContext(ChatContext)

    const getMessages = useCallback(async () => {
        const res = await api.server.POST('/messages', { users: channel.members })
        const data = await res.json()
        console.log('messages', data)

        return data
    }, [channel.members])
    const { isLoading, data, status } = useQuery('messages', getMessages)
    useEffect(() => {
        status === 'success' && setMessages(data?.messages)
    }, [status])

    const handleChannelChange = () => {
        setCurrentChat(channel)
    }

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