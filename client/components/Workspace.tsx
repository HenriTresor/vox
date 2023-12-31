'use client'
import { WorkspaceTypes } from '@/app/choose-workspace/page'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

type Props = {}

function Workspace({ name, avatar, members, _id, slug, action }: WorkspaceTypes | any) {
    const router = useRouter()
    return (

        <div className='w-full border-2 p-3 flex justify-center items-center mb-5'>
            <div
                className='w-full text-left flex justify-start items-start'
            >
                <div className='p-4 bg-neutral-600 w-[50px] h-[50px] text-white grid place-content-center font-bold text-[2em] rounded-full '>{name.charAt(0).toUpperCase()}</div>
                <div className='flex flex-col justify-between h-full ml-5'>
                    <h1 className='font-bold text-[1.4rem]'>{name}</h1>
                    <p className='font-mono text-neutral-600'>members: {members.length}</p>
                </div>
            </div>
            <Button size={'icon'}
                onClick={action}
            >→</Button>
        </div>
    )
}

export default Workspace