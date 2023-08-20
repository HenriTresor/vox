/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Footer from '@/components/views/LandingPage/Footer'
import NavBar from '@/components/views/LandingPage/NavBar'
import api from '@/lib/api'
import React, { useState, useEffect, useContext } from 'react'
import { NotifyContext } from '@/context/NotifyContext'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Workspace from '@/components/Workspace'

type Props = {}

export type WorkspaceTypes = {
  admin: string;
  members: [];
  name: string;
  category: string,
  inviteLink: string,
  createdAt: Date,
  updatedAt: Date,
  avatar: string,
  _id: string,
  channels?: [],
  slug: string
}

function Page({ }: Props) {
  const { authenticated, user } = useContext(AuthContext)
  const { notify } = useContext(NotifyContext)
  const router = useRouter()
  const [workspaces, setWorkspaces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    !localStorage.getItem('email') && router.push('/login')
  }, [])
  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const res = await api.server.GET(`/workspaces/${user?._id}`)
        const data = await res.json()
        if (!data.status) return notify({ message: data.message, type: 'info' })
        setWorkspaces(data.workspaces)
      } catch (error: any) {
        notify({ message: error.message, type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    if (user) {
      getWorkspaces()
    }
  }, [authenticated])
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
                    <Workspace {...workspace} key={workspace._id} action={ ()=>router.push(`/workspaces/${workspace.slug}`)} />
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