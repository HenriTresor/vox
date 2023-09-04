import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import React from 'react'

type Props = { name: string }

function Channel({ name }: Props) {
    return (
        <div className='flex p-2 justify-between items-center cursor-pointer mb-2 hover:bg-neutral-100 font-bold'>
            <h1># {name}</h1>
        </div>
    )
}

export default Channel