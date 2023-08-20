'use client'
import React from 'react'
import { useParams } from 'next/navigation'

type Props = {}

function Page({ }: Props) {
    const { workspace } = useParams()
    return (
        <div>{workspace}</div>
    )
}

export default Page