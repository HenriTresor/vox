
'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import Loading from '@/components/reusables/loading'
import SideBar from '@/components/dashboard/views/SideBar'
import Body from '@/components/dashboard/views/Body'
import { WorkspaceTypes } from '@/types/app'
import Header from '@/components/dashboard/views/Header'
import { getServerSession } from 'next-auth'
import { User } from '@/types/next-auth'

type Props = {
    children: React.ReactNode
}

function WorkspaceLayout({ children }: Props) {

    const { slug } = useParams()
    const { notify } = useContext(NotifyContext)
    const [workspace, setWorkspace] = useState<WorkspaceTypes>({})
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null | undefined>(null)
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
    return (
        <div className='w-full h-[93dvh]'>
            <Header {...workspace} />
            <div className='w-full border flex h-full '>
                <SideBar
                    {...workspace}
                />
                {children}
            </div>
        </div>
    )
}

export default WorkspaceLayout