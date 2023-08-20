'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import { WorkspaceTypes } from '@/app/choose-workspace/page'

type Props = {}

function Page({ }: Props) {
    const { workspaceId } = useParams()
    const { notify } = useContext(NotifyContext)
    const [workspace, setWorkspace] = useState<WorkspaceTypes | null>(null)
    useEffect(() => {
        const getWorkspace = async () => {
            try {
                const res = await api.server.GET(`/workspaces/single/${workspaceId}`)
                const data = await res.json()
                if (!data.status) return notify({ message: data.message, type: 'error' })
                setWorkspace(data.workspace)
            } catch (error: any) {
                notify({ message: error.message, type: 'error' })
            }
        }
        getWorkspace()
    }, [])
    return (
        <div>
            {JSON.stringify(workspace)}
        </div>
    )
}

export default Page