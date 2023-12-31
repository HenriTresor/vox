'use client'
import Logo from '@/components/reusables/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useContext, useEffect } from 'react'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Props = {}

function Page({ }: Props) {

    const router = useRouter()
    const { notify } = React.useContext(NotifyContext)
    const [inputValues, setInputValues] = React.useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: ''
    })

    const [loading, setLoading] = React.useState(false)
    const handleChange = (e: any) => setInputValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {

            const res = await api.server.POST('/users', { ...inputValues })
            const data = await res.json()
            if (!data.status) return notify({ type: 'error', message: data.message })

            localStorage.setItem('email', data.user.email)
            router.push('/verifyEmail')
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
                        <h1 className='text-[1.5rem] mt-5 mb-5 font-bold'>Create account</h1>
                        <p className='mb-5 text-neutral-500'>Fill in the following inputs to create your account!</p>
                        <form action="" onSubmit={(e) => handleSubmit(e)} className='w-full'>
                            <div className="input-container">
                                <Label htmlFor='email'>Email</Label>
                                <Input onChange={(e) => handleChange(e)} type='email' id='email' placeholder='Enter your email' name='email' />
                            </div>
                            <div className='flex items-center w-full'>
                                <div className="input-container w-full">
                                    <Label htmlFor='firstName'>first Name</Label>
                                    <Input onChange={(e) => handleChange(e)} type='firstName' id='firstName' placeholder='Enter your first Name' name='firstName' />
                                </div>
                                <div className="input-container w-full">
                                    <Label htmlFor='lastName'>last Name</Label>
                                    <Input onChange={(e) => handleChange(e)} type='lastName' id='lastName' placeholder='Enter your last Name' name='lastName' />
                                </div>
                            </div>
                            <div className='flex items-center w-full'>
                                <div className="input-container w-full">
                                    <Label htmlFor='password'>password</Label>
                                    <Input onChange={(e) => handleChange(e)} type='password' id='password' placeholder='create password' name='password' />
                                </div>
                                <div className="input-container w-full">
                                    <Label htmlFor='confPassword'>confirm password</Label>
                                    <Input onChange={(e) => handleChange(e)} type='password' id='confPassword' placeholder='confirm password' name='passwordConfirmation' />
                                </div>
                            </div>

                            <Button type='submit' disabled={loading}>Create account</Button>
                        </form>
                        <p className='mt-5 text-[.9rem] flex gap-1'>
                            Already have an account?
                            <Link href='/login' className='text-blue-500'>
                                sign in!
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Page