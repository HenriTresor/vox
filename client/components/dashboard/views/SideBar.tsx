import { WorkspaceTypes } from '@/app/choose-workspace/page'
import { Button } from '@/components/ui/button'
import { Menu, PlusCircle, PlusCircleIcon } from 'lucide-react'
import React from 'react'
import Person from './Person'
import Channel from './Channel'

type Props = {}

function SideBar({ name, members, channels }: WorkspaceTypes) {
    return (
        <div
            className='sm:w-1/5 h-[100dvh] bg-neutral-900 text-white absolute sm:block w-1/2 overflow-scroll'
        >
            <div className='flex border-b p-2 justify-between items-center'>
                <h1 className='uppercase font-bold'>{name}</h1>
                <Button><PlusCircle /></Button>
           </div>
        </div>
    )
}

export default SideBar