'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

function NotFound({ }: Props) {

    const router = useRouter()
    return (
        <div className='w-full h-full grid place-content-center text-neutral-700 text-center text-[1.4rem]'>
            <p>Oops, You may have followed a broken link.</p>
            <Button onClick={() => router.back()}>Go back</Button>
        </div>
    )
}

export default NotFound