import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SendIcon } from 'lucide-react'
import React from 'react'

type Props = {}

function Page({ }: Props) {
    return (
        <div
            className='p-3 flex h-full'
        >
            <div className='p-2 border-r w-[30%]'>
                chat-contacts
            </div>
            <div className='p-2 w-[70%] flex flex-col items-start justify-start h-full'>
                <div className='w-full p-2 border-b'>
                    Chatting-body header
                </div>
                <div className='w-full p-2 flex-grow'>
                    chatting body area
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
        </div>
    )
}

export default Page