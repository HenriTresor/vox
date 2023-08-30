'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import Loading from '@/components/reusables/loading'
import SideBar from '@/components/dashboard/views/SideBar'
import Body from '@/components/dashboard/views/Body'
import { WorkspaceTypes } from '@/types/app'

type Props = {}

function Page({ }: Props) {
    const { slug } = useParams()
    const { notify } = useContext(NotifyContext)
    const [workspace, setWorkspace] = useState<WorkspaceTypes | any>({
    })
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        const getWorkspace = async () => {
            try {
                const res = await api.server.GET(`/workspaces/single/${slug}`)
                const data = await res.json()
                if (!data.status) return notify({ message: data.message, type: 'error' })
                setWorkspace(data.workspace)
            } catch (error: any) {
                notify({ message: error.message, type: 'error' })
            } finally {
                setLoading(false)
            }
        }
        getWorkspace()
    }, [])
    if (loading) return (
        <div className='w-full min-h-screen grid place-content-center'>
            <Loading />
        </div>
    )
    return (
        <div className='w-full h-[100dvh] border flex justify-start items-start p-0'>
            <SideBar
                {...workspace}
            />
            <Body />
        </div>
    )
}

export default Page