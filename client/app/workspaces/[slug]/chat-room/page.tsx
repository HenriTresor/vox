'use client'
import Channel from '@/components/dashboard/views/Channel'
import NewChannel from '@/components/modals/NewChannel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChatContext } from '@/context/ChatProvider'
import { DialogContext } from '@/context/DialogContext'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import { Channel as ChannelTypes } from '@/types/app'
import { ChevronDown, PlusCircle, SendIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from 'react-query'

type Props = {}

function Page({ }: Props) {
    const { slug } = useParams()
    const { notify } = useContext(NotifyContext)
    const { setIsOpen, setDialogProps } = useContext(DialogContext)
    const { currentChat } = useContext(ChatContext)
    const getChannels = async () => {
        try {
            const res = await api.server.POST('/channels/public', { slug })
            return res.json()
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    const { isError, isLoading, data, refetch } = useQuery('channels', () => getChannels())
    useEffect(() => {
        data && !data?.status && notify({ message: data?.message, type: 'error' })
        console.log('data', data)
    }, [data?.status])


    const openModal = (
        children: React.ReactNode,
        title: string,
        description: string
    ) => {
        setIsOpen(true);
        setDialogProps({
            title: title,
            description,
            content: children,
        });
    };
    return (
        <div
            className='p-3 flex h-full'
        >
            <div className='p-2 border-r w-[30%]'>
                {
                    isLoading ? 'loading' : (
                        <>
                            <div className='w-full h-auto'>
                                <div className='flex p-2 justify-between items-center border-b'>
                                    <h1>Public channels</h1>
                                    <Button onClick={() => openModal(<NewChannel slug={`${slug}`} />, 'Create new channel', 'fill in the information to create a new channel.')}><PlusCircle /></Button>
                                </div>

                                <div>
                                    {data?.channels?.map((channel: ChannelTypes) => (
                                        <Channel channel={channel} key={channel._id} />
                                    ))}
                                </div>
                            </div>
                            <div className='w-full h-auto'>

                                <div className='flex p-2 justify-between items-center border-b'>
                                    <h1>Private channels</h1>
                                    <ChevronDown />
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
            {
                currentChat ? (
                    <div className='p-2 w-[70%] flex flex-col items-start justify-start h-full'>
                        <div className='w-full border-b p-1 flex items-center gap-3'>
                            <div className='p-2 rounded-full text-white font-bold grid place-content-center bg-blue-500 w-[40px] uppercase h-[40px]`'>
                                {`${currentChat.name.charAt(0)}`}
                            </div>
                            <h1 className='text-neutral-700 capitalize font-bold'>{currentChat.name}</h1>
                        </div>
                        <div className='w-full p-2 flex-grow overflow-auto flex flex-col justify-start items-start'>
                            {
                                currentChat.messages.map(message => (
                                    <div key={`${message.sendOn}`}>
                                        <div className='w-full flex items-center gap-4'>
                                            <div className='p-2 rounded-full text-white font-bold grid place-content-center bg-blue-500 w-[40px] uppercase h-[40px]`'>
                                                {`${currentChat.creator.firstName.charAt(0)} ${currentChat.creator.lastName.charAt(0)}`}
                                            </div>
                                            <h1 className='capitalize font-bold'>{message.sender.firstName} {message.sender.lastName}</h1>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='w-full p-1 border-t'>
                            <div className='border w-full rounded-md flex items-center p-2 gap-2'>
                                <Input
                                    placeholder='Write your message here'
                                    className='w-full border-none'
                                />
                                <Button size={'icon'}>
                                    <SendIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='grid place-content-center text-black text-[1.3rem] font-bold w-full'>
                        <h2>Select a chat to start!</h2>
                    </div>
                )
            }
        </div>
    )
}

export default Page