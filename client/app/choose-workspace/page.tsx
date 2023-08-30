/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Footer from '@/components/views/LandingPage/Footer'
import NavBar from '@/components/views/LandingPage/NavBar'
import api from '@/lib/api'
import React, { useState, useEffect, useContext } from 'react'
import { NotifyContext } from '@/context/NotifyContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Workspace from '@/components/Workspace'
import { getSession, useSession } from 'next-auth/react'
import { User } from '@/types/next-auth'
import { WorkspaceTypes } from '@/types/app'

type Props = {}

function Page({ }: Props) {
  const { notify } = useContext(NotifyContext)
  const router = useRouter()
  const [workspaces, setWorkspaces] = useState([])
  const session = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const userSession = await getSession()
        const res = await api.server.GET(`/workspaces/${userSession?.user._id}`)
        const data = await res.json()
        if (!data.status) return notify({ message: data.message, type: 'info' })
        setWorkspaces(data.workspaces)
      } catch (error: any) {
        notify({ message: error.message, type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    session.data?.user?._id && getWorkspaces()
  }, [session.data?.user])
  return (
    <>
      <NavBar />
      <div className="h-[100dvh] w-full place-content-center grid text-center">
        <h1 className='font-bold text-[2rem] mb-5'>Choose workspace</h1>
        <p className='font-mono text-neutral-600'>Choose among the following workspaces to start:</p>
        <div className='w-full mt-5 border p-3'>
          {
            !workspaces?.length ?
              (
                <>

                  <p className='text-[1rem] mb-5'>{loading ? 'retrieving workspaces, please wait ...' : 'No workspaces'} </p>
                  <Button onClick={() => router.push('/create-workspace')}>Create one!</Button>
                </>
              )
              : (
                <>
                  {workspaces.map((workspace: WorkspaceTypes) => (
                    <Workspace {...workspace} key={workspace._id} action={() => router.push(`/workspaces/${workspace.slug}`)} />
                  ))}
                  <Button onClick={() => router.push('/create-workspace')}>Create workspace</Button>
                </>
              )
          }
        </div>
      </div >
      <Footer />
    </>
  )
}

export default Page