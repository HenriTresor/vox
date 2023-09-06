import { Button } from '@/components/ui/button'
import { ChatContext } from '@/context/ChatProvider'
import { Channel } from '@/types/app'
import { PlusCircleIcon } from 'lucide-react'
import React from 'react'

type Props = { channel: Channel }

function Channel({ channel }: Props) {
    const { setCurrentChat, setMessages } = React.useContext(ChatContext)
    return (
        <div
            onClick={() => {
                setCurrentChat(channel)
                setMessages(channel.messages)
            }}
            className='flex p-2 justify-between items-center cursor-pointer mb-2 hover:bg-neutral-100 font-bold'>
            <h1># {channel.name}</h1>
        </div>
    )
}

export default Channel