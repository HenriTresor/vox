import { WorkspaceTypes } from '@/app/choose-workspace/page'
import { Button } from '@/components/ui/button'
import { Menu, PlusCircleIcon } from 'lucide-react'
import React from 'react'
import Person from './Person'
import Channel from './Channel'

type Props = {}

function SideBar({ name, members, channels }: WorkspaceTypes) {
    return (
        <div
            className='sm:w-1/5 h-[100dvh] bg-neutral-900 text-white absolute sm:block w-1/2'
        >
            <div className='w-full h-auto p-2 flex border-b-2 items-center justify-between'>
                <h1>{name?.toUpperCase()}</h1>
                <Button size={'icon'}>
                    <Menu />
                </Button>
            </div>
            <div className=' h-auto border-b-2'>
                <div className='w-full p-2 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Button size={'icon'}>
                            <PlusCircleIcon />
                        </Button>
                        <h1>members</h1>
                    </div>
                    <h1>{members?.length}</h1>
                </div>
                <div className='p-3 border-b-2'>
                    {
                        members?.map((member: any) => (
                            <Person user={member} role={member.role} key={member._id} />
                        ))
                    }
                    <Button variant={'secondary'} size={'sm'}> more →</Button>
                </div>
            </div>
            <div className=' h-auto border-b-2'>
                <div className='w-full p-2 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Button size={'icon'}>
                            <PlusCircleIcon />
                        </Button>
                        <h1>channels</h1>
                    </div>
                    <h1>{channels?.length}</h1>
                </div>
                <div className='p-3 border-b-2'>
                    {
                        channels?.map((channel: any) => (
                            <Channel {...channel} key={channel._id} />
                        ))
                    }
                    <Button variant={'secondary'} size={'sm'}> more →</Button>
                </div>
            </div>
        </div>
    )
}

export default SideBar