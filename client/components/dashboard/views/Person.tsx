import { TrophyIcon } from 'lucide-react'
import React from 'react'

type Props = {
    user: any;
    role: string
}

function Person({ user: { firstName, lastName }, role }: Props) {
    return (
        <div className='p-2 flex items-center gap-2 hover:bg-neutral-700 cursor-pointer mb-4 w-full overflow-hidden'>
            <div className='w-[40px] h-[40px] rounded-full bg-neutral-600 grid place-content-center p-4 font-bold'>
                {`${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`}
            </div>
            <div className='w-full flex justify-between items-center'>
                <h1 className='capitalize font-semibold text-[1.2rem]'>{firstName} {lastName}</h1>
                {role === 'admin' && <p className='w-[5px]'><TrophyIcon /></p>}
            </div>
        </div>
    )
}

export default Person