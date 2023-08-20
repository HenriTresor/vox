'use client'

import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

function Page({ }: Props) {
  const { workspaceName, inviteCode } = useParams()

  return (
    <div>{workspaceName} {inviteCode}</div>
  )
}

export default Page