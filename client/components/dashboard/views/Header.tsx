import { WorkspaceTypes } from '@/types/app'
import React from 'react'

type Props = {
    
}

function Header({ name }: WorkspaceTypes) {
    return (
        <div className='p-3 flex justify-between items-center border-b w-full'>
            <h1>{name}</h1>
        </div>
    )
}

export default Header