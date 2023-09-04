import { WorkspaceTypes } from '@/types/app'
import { User } from '@/types/next-auth'
import { BellDotIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'

type Props = {

}

function Header({ name }: WorkspaceTypes) {
    const { data } = useSession()

    return (
        <div className='p-2 flex justify-between items-center h-auto border-b w-full'>
            <h1 className='font-bold text-neutral-600 text-[1.5rem]'>{name}</h1>
            <div className='flex items-center'>
                <div className='p-2'>
                    <BellDotIcon className='rounded-full cursor-pointer' />
                </div>
                <div className=' items-center flex p-1 cursor-pointer'>
                    <div className='p-3 rounded-full text-white font-bold grid place-content-center bg-blue-500 w-[50px] uppercase h-[50px]`'>
                        {`${data?.user?.firstName?.charAt(0)}${data?.user?.lastName?.charAt(0)}`}
                    </div>
                </div>
               </div>
               
        </div>
    )
}

export default Header