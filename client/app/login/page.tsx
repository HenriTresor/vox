'use client'
import Logo from '@/components/reusables/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'

type Props = {}

function Page({ }: Props) {

    const router = useRouter()
    const { notify } = React.useContext(NotifyContext)
    const [inputValues, setInputValues] = React.useState({
        email: '',
        password: '',
    })
    const [loading, setLoading] = React.useState(false)
    const handleChange = (e: any) => setInputValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    const handleSubmit = async () => {
        setLoading(true)
        try {
            const res = await api.server.POST('/auth/login', inputValues)
            const data = await res.json()
            if (!data.status) return notify({ message: data.message, type: 'error' })
            localStorage.setItem('email', data.user.email)
            document.cookie = `access_token=${data.access_token}`
            notify({ message: data.message, type: 'info' })
            router.push('/choose-workspace')
        } catch (error: any) {
            notify({ message: error.message, type: 'error' })
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className='w-full h-screen flex  justify-start items-start'>
                <div className='w-1/2 bg-black h-full hidden md:block'>

                </div>
                <div className='p-4 flex flex-col justify-evenly  md:w-1/2 w-full h-full'>
                    <Logo />
                    <div className='flex flex-col items-start w-full justify-between'>
                        <h1 className='text-[1.5rem] mt-5 mb-5 font-bold'>Sign in</h1>
                        <p className='mb-5 text-neutral-500'>Fill in the following to login</p>
                        <div className="input-container">
                            <Label htmlFor='email'>Email</Label>
                            <Input onChange={(e) => handleChange(e)} type='email' id='email' placeholder='Enter your email' name='email' />
                        </div>

                        <div className="input-container">
                            <Label htmlFor='password'>password</Label>
                            <Input onChange={(e) => handleChange(e)} type='password' id='password' placeholder='create password' name='password' />
                        </div>

                        <Button type='submit' onClick={handleSubmit} disabled={loading}>Login</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Page