'use client'

import { WorkspaceTypes } from '@/app/choose-workspace/page'
import { AuthContext } from '@/context/AuthContext'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

type Props = {}

function Page({ }: Props) {
  const { slug, inviteCode } = useParams()
  const [workspace, setWorkspace] = useState<WorkspaceTypes>()
  const { notify } = useContext(NotifyContext)
  const { user } = useContext(AuthContext)
  useEffect(() => {
    const getWorkspace = async () => {
      try {
        const res = await api.server.GET(`/workspaces/single/${slug}`)

        const data = await res.json()
        notify({message:data.message, type:'info'})
      } catch (error: any) {
        notify({ message: error.message, type: 'error' })
      }
    }
    getWorkspace()
  }, [])

  return (
    <div>{slug} {inviteCode}</div>
  )
}

export default Page