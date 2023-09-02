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

    return (
        <>
            <Body />
        </>
    )
}

export default Page