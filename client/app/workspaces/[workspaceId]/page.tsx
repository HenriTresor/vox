'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import { WorkspaceTypes } from '@/app/choose-workspace/page'
import Loading from '@/components/reusables/loading'
import SideBar from '@/components/dashboard/views/SideBar'
import Body from '@/components/dashboard/views/Body'

type Props = {}

function Page({ }: Props) {
    const { workspaceId } = useParams()
    const { notify } = useContext(NotifyContext)
    const [workspace, setWorkspace] = useState<WorkspaceTypes | any>({
    })
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        !localStorage.getItem('email') && router.push('/login')
    }, [])
    useEffect(() => {
        const getWorkspace = async () => {
            try {
                const res = await api.server.GET(`/workspaces/single/${workspaceId}`)
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
        <div className='w-full min-h-screen border flex justify-start items-start p-0 relative left-0 top-0'>
            <SideBar
              {...workspace}
            />
            <Body />
        </div>
    )
}

export default Page