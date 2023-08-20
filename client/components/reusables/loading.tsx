import React from 'react'

type Props = {}

function Loading({ }: Props) {
    return (
        <div className='grid grid-cols-2 place-content-between place-items-center w-[60px] animate-spin'>
            <div className='w-[20px] h-[20px] rounded-full bg-orange-600 mt-4'></div>
            <div className='w-[20px] h-[20px] rounded-full bg-orange-600 mt-4'></div>
            <div className='w-[20px] h-[20px] rounded-full bg-orange-600 mt-4'></div>
            <div className='w-[20px] h-[20px] rounded-full bg-orange-600 mt-4'></div>
        </div>
    )
}

export default Loading