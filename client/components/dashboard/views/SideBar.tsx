import { WorkspaceTypes } from '@/app/choose-workspace/page'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import React from 'react'
import Person from './Person'
import { User } from '@/context/AuthContext'

type Props = {}

function SideBar({ name, members }: WorkspaceTypes) {
    return (
        <div
            className='w-1/5 h-[100dvh] bg-neutral-900 text-white'
        >
            <div className='w-full h-auto p-2 flex border-b-2 items-center justify-between'>
                <h1>{name.toUpperCase()}</h1>
                <Button size={'icon'}>
                    <Menu />
                </Button>
            </div>
            <div className=' h-auto border-b-2'>
                <div className='w-full p-2 flex items-center justify-between'>
                    <h1>members</h1>
                    <h1>{members.length}</h1>
                </div>
                <div>
                    {
                        members?.map((member: User) => (
                            <Person {...member} key={member._id}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SideBar