'use client'
import Channel from '@/components/dashboard/views/Channel'
import NewChannel from '@/components/modals/NewChannel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChatContext } from '@/context/ChatProvider'
import { DialogContext } from '@/context/DialogContext'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import { Channel as ChannelTypes, Message } from '@/types/app'
import { ChevronDown, PlusCircle, SendIcon } from 'lucide-react'
import { getSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useState, useEffect, useContext, useRef, ChangeEvent } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'

type Props = {}

function Page({ }: Props) {
    const inputRef = useRef<ChangeEvent<HTMLInputElement> | any>(null)
    const { slug } = useParams()
    const { notify } = useContext(NotifyContext)
    const { setIsOpen, setDialogProps } = useContext(DialogContext)
    const { currentChat, setMessages, messages, setCurrentChat } = useContext(ChatContext)
    const [message, setMessage] = useState('')
    const getChannels = async () => {
        try {
            const res = await api.server.POST('/channels/public', { slug })
            const data = await res.json()
            return data
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    const { isError, isLoading, data, refetch } = useQuery('channels', () => getChannels())
    useEffect(() => {
        data && !data?.status && notify({ message: data?.message, type: 'error' })
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

    const addMessage = async () => {
        try {
            if (currentChat) {
                const sessionData = await getSession()
                const res = await api.server.POST(`/messages/add`, {
                    message: { text: inputRef.current?.value },
                    channelId: currentChat?._id,
                    sender: sessionData?.user._id,
                    receivers: currentChat?.members
                })
                const data = await res.json();
                if (!data.status) return notify({ message: data.message, type: 'error' })
                setMessages((prev: Message[]) => {
                    return [...prev, { sender: sessionData?.user, message: { text: message, image: '' }, createdAt: Date.now() }]
                })
                setMessage('')
                inputRef.current.focus()
            }
        } catch (error: any) {
            console.log(error)
            notify({ message: error.message, type: 'error' })
        }
    }

    useEffect(() => {
        function sendOnEnter(e: KeyboardEvent) {
            try {
                if (e.key === 'Enter') {
                    addMessage()
                }
            } catch (error: any) {
                console.log('error sending message', error.message)
            }
        }

        window.addEventListener('keydown', e => sendOnEnter(e))
        return () => window.removeEventListener('keydown', e => sendOnEnter(e))
    }, [])
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
                currentChat !== null ? (
                    <div className='p-2 w-[70%] flex flex-col items-start justify-start h-full'>
                        <div className='w-full border-b p-1 flex items-center gap-3'>
                            <div className='p-2 rounded-full text-white font-bold grid place-content-center bg-blue-500 w-[40px] uppercase h-[40px]`'>
                                {`${currentChat.name.charAt(0)}`}
                            </div>
                            <h1 className='text-neutral-700 capitalize font-bold'>{currentChat.name}</h1>
                        </div>
                        <div className='w-full flex-grow overflow-auto flex flex-col justify-start items-start'>
                            {
                                messages && messages?.map((message: Message) => {
                                    console.log(message)
                                    return (
                                        <div key={`${message.createdAt}`} className='w-full flex gap-4 flex-col items-start border-b-2 p-2'>
                                            <div className='flex w-full gap-2'>
                                                <div className='p-2 rounded-full text-white font-bold flex items-center justify-center w-[50px] h-[50px] bg-blue-500 uppercase'>
                                                    {`${message.sender.firstName.charAt(0)}${message.sender.lastName.charAt(0)}`}
                                                </div>
                                                <h1 className='capitalize font-bold flex-col '>{message.sender.firstName} {message.sender.lastName} <span className='font-mono block font-thin text-[13px] mt-2'>{moment(Date.now()).to(message.createdAt)}</span></h1>
                                            </div>
                                            <div className='w-full ml-9'>
                                                <p className='ml-5'>{message.message.text}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='w-full p-1 border-t'>
                            <div className='border w-full rounded-md flex items-center p-2 gap-2'>
                                <Input
                                    name='message'
                                    ref={inputRef}
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    placeholder='Write your message here'
                                    className='w-full border-none'
                                />
                                <Button size={'icon'}
                                    onClick={addMessage}
                                >
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