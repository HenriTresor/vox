'use client'

import { WorkspaceTypes } from '@/app/choose-workspace/page'
import Workspace from '@/components/Workspace'
import Loading from '@/components/reusables/loading'
import { Button } from '@/components/ui/button'
import Footer from '@/components/views/LandingPage/Footer'
import NavBar from '@/components/views/LandingPage/NavBar'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

type Props = {}

function Page({ }: Props) {
  const { slug, inviteCode } = useParams()
  const [workspace, setWorkspace] = useState<WorkspaceTypes | any>(null)
  const { notify } = useContext(NotifyContext)
  const [isInviteCodeCorrect, setIsInviteCodeCorrect] = useState(false)
  const session = useSession()
  const router = useRouter()
  useEffect(() => {
    !localStorage.getItem('email') && router.push('/login')
  }, [])
  useEffect(() => {
    const getWorkspace = async () => {
      try {
        const res = await api.server.GET(`/workspaces/single/${slug}`)

        const data = await res.json()
        if (!data.status) return notify({ message: data.message, type: 'error' })

        setWorkspace(data.workspace)
      } catch (error: any) {
        notify({ message: error.message, type: 'error' })
      }
    }
    getWorkspace()
  }, [])

  useEffect(() => {
    const checkInviteCode = async () => {
      try {
        const res = await api.server.POST(`/workspaces/invite/check-code`, {
          inviteCode,
          slug
        })

        const data = await res.json()
        if (!data.status) return notify({ message: data.message, type: 'error' })

        setIsInviteCodeCorrect(true)
      } catch (error: any) {
        notify({ message: error.message, type: 'error' })
      }
    }
    checkInviteCode()
  }, [])

  const acceptInvite = async () => {
    try {
      const res = await api.server.POST(`/workspaces/invite/accept`, {
        slug,
        recipientId: session.data?.user?._id
      })

      const data = await res.json()
      if (!data.status) return notify({ message: data.message, type: 'error' })
      notify({ message: data.message, type: 'success' })
      router.push('/choose-workspace')
    } catch (error: any) {
      notify({ message: error.message, type: 'error' })
    }
  }
  return (
    <>
      <NavBar />
      <div className='h-[100dvh] w-full grid place-content-center text-center'>
        {
          (workspace && isInviteCodeCorrect) ? (
            <>
              <h1 className='font-bold text-[2rem] mb-5'>You were invited to join the following workspace:</h1>
              <Workspace {...workspace} action={() => {
                acceptInvite()
              }} />
              <Button onClick={acceptInvite}>Accept</Button>
            </>
          ) : (
            <Loading />
          )
        }
      </div>
      <Footer />
    </>
  )
}

export default Page