import { WorkspaceTypes } from '@/app/choose-workspace/page'
import { Button } from '@/components/ui/button'
import { Menu, PlusCircle, PlusCircleIcon } from 'lucide-react'
import React, { useContext } from 'react'
import Person from './Person'
import Channel from './Channel'
import { DialogContext } from '@/context/DialogContext'
import { Input } from '@/components/ui/input'
import NewMemberModal from '@/components/modals/newMember'

type Props = {}

function SideBar({ name, members, channels }: WorkspaceTypes) {
    const { setDialogProps, setIsOpen } = useContext(DialogContext)

    const sendInvite = async () => {}
    return (
        <div
            className='sm:w-1/5 h-[100dvh] bg-neutral-900 text-white absolute sm:block w-1/2 overflow-scroll'
        >
            <div className='flex border-b p-2 justify-between items-center'>
                <h1 className='uppercase font-bold'>{name}</h1>
                <Button onClick={() => {
                    setIsOpen(true)
                    setDialogProps({
                        title: "Invite your team members",
                        description: "Input email address of your team member to send invite.",
                        content: <NewMemberModal />,
                        nextAction: () => setIsOpen(false)
                    })
                }}><PlusCircle /></Button>
            </div>
        </div>
    )
}

export default SideBar