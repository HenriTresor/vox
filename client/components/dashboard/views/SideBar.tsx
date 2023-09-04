'use client'
import { Button } from '@/components/ui/button'
import { Menu, MessageCircle, PlusCircle, PlusCircleIcon, WorkflowIcon } from 'lucide-react'
import React, { useContext } from 'react'
import Person from './Person'
import Channel from './Channel'
import { DialogContext } from '@/context/DialogContext'
import { Input } from '@/components/ui/input'
import NewMemberModal from '@/components/modals/newMember'
import api from '@/lib/api'
import { useParams, usePathname } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { NotifyContext } from '@/context/NotifyContext'
import NewChannel from '@/components/modals/NewChannel'
import { WorkspaceTypes } from '@/types/app'
import Link from 'next/link'

const sideItems = [
    { name: 'Tasks', href: 'tasks', icon: <WorkflowIcon /> },
    { name: 'Chat Room', href: `chat-room`, icon: <MessageCircle /> }
]

type Props = {

}



function SideBar({ name, members, channels }: WorkspaceTypes) {
    const { slug } = useParams()
    const { setDialogProps, setIsOpen } = useContext(DialogContext)
    let [email, setEmail] = React.useState('')
    const { toast } = useToast()
    const { notify } = React.useContext(NotifyContext)

    const pathname = `/workspaces/${slug}`

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
            className=' text-black  overflow-scroll w-1/5 h-full border-r p-2'
        >
            <div className='flex border-b-2 p-2 justify-between items-center '>
                <Button onClick={() => openModal(<NewMemberModal />,
                    'Invite your team members',
                    'Input email address of your team member to send invite.')}
                    className='w-full flex justify-evenly font-bold items-center'
                ><PlusCircle /> Add people</Button>
            </div>

            <div className='w-full h-full mt-5'>
              
                {
                    sideItems?.map(item => (
                        <Link href={`${pathname}/${item.href}`} key={item.href}
                            className='flex w-full items-center gap-3 font-bold p-2 hover:bg-blue-100 mb-2 rounded-md text-neutral-700'
                        > {item.icon} {item.name}</Link>
                    ))
                }

            </div>
        </div>
    )
}

export default SideBar