'use client'
import { Button } from '@/components/ui/button'
import { Menu, PlusCircle, PlusCircleIcon } from 'lucide-react'
import React, { useContext } from 'react'
import Person from './Person'
import Channel from './Channel'
import { DialogContext } from '@/context/DialogContext'
import { Input } from '@/components/ui/input'
import NewMemberModal from '@/components/modals/newMember'
import api from '@/lib/api'
import { useParams } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { NotifyContext } from '@/context/NotifyContext'
import NewChannel from '@/components/modals/NewChannel'
import { WorkspaceTypes } from '@/types/app'


type Props = {}

function SideBar({ name, members, channels }: WorkspaceTypes) {
    const { slug } = useParams()
    const { setDialogProps, setIsOpen } = useContext(DialogContext)
    let [email, setEmail] = React.useState('')
    const { toast } = useToast()
    const { notify } = React.useContext(NotifyContext)


    const openModal = (children: React.ReactNode, title: string, description: string) => {
        setIsOpen(true)
        setDialogProps({
            title: title,
            description,
            content: children,
        })
    }
    return (
        <div
            className='sm:w-1/5 h-[100dvh] bg-neutral-900 text-white absolute sm:block w-1/2 overflow-scroll'
        >
            <div className='flex border-b p-2 justify-between items-center'>
                <h1 className='uppercase font-bold'>{name}</h1>
                <Button onClick={() => openModal(<NewMemberModal />,
                    'Invite your team members',
                    'Input email address of your team member to send invite.')}><PlusCircle /></Button>
            </div>

            <div >
                <div className='w-full flex justify-between p-2 items-center'>
                    <h1>Channels</h1>
                <Button onClick={() => openModal(<NewChannel />, 'Create new channel', 'fill in the information to create a new channel.')}><PlusCircle /></Button>
                </div>
            </div>
        </div>
    )
}

export default SideBar