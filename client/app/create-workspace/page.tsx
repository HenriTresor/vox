'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Footer from '@/components/views/LandingPage/Footer'
import NavBar from '@/components/views/LandingPage/NavBar'
import React, { useContext, useRef, useState } from 'react'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { getSession } from 'next-auth/react'

type Props = {}

function Page({ }: Props) {

    const router = useRouter()
    const { notify } = useContext(NotifyContext)
    const [values, setValues] = useState({
        name: '',
        category: '',
    })
    const handleChange = (e: any) => setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    const createWorkspace = async () => {
        try {
            const session = await getSession()
            const res = await api.server.POST('/workspaces', {
                ...values,
                admin: session?.user._id
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
            <div className="w-full h-[100dvh] grid place-content-center text-center">
                <h1 className='font-bold text-[2rem] mb-5'>Create new workspace</h1>
                <p className='font-mono text-neutral-600'>Create a new workspace by filling in the following informations.</p>
                <div className='w-full border p-3 mt-5'>
                    <div className="input-container">
                        <Label htmlFor='name'>Workspace name</Label>
                        <Input
                            onChange={(e) => handleChange(e)}
                            value={values.name}
                            type='text'
                            name='name'
                            id='name'
                            placeholder='enter your organisation name'
                        />
                    </div>
                    <div className="input-container">
                        <Label htmlFor='category'>What field of is your organisation in?</Label>
                        <Input
                            onChange={(e) => handleChange(e)}
                            value={values.category}
                            type='text'
                            name='category'
                            id='category'
                            placeholder='enter your organisation category (default: uncategorized)'
                        />
                    </div>
                    <Button onClick={() => router.push('/choose-workspace')} variant={'outline'} className='mr-5'>Choose workspace</Button>
                    <Button onClick={createWorkspace}>Create workspace</Button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page