import { User } from '@/context/AuthContext'
import React from 'react'

type Props = {}

function Person({ firstName, lastName, }: User) {
    return (
        <>
            <div className='p-2 flex items-center gap-2 hover:bg-neutral-700 cursor-pointer'>
                <div className='w-[40px] h-[40px] rounded-full bg-neutral-600 grid place-content-center p-4 font-bold'>
                    {`${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`}
                </div>
                <div>
                    <h1 className='capitalize font-semibold text-[1.2rem]'>{firstName} {lastName}</h1>
                </div>
            </div>
        </>
    )
}

export default Person