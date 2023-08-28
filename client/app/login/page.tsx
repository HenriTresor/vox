'use client'
import Logo from '@/components/reusables/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useContext, useEffect, FormEvent } from 'react'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

type Props = {
    params: {
        callbackUrl: string;
    },
    searchParams: { [key: string]: string | string[] | undefined };
}

function Page({ params, searchParams }: Props) {

    const router = useRouter()
    const { notify } = React.useContext(NotifyContext)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(searchParams?.error)
    useEffect(() => {
        if (error) {
            return notify({ message: String(error), type: 'error' })
        }
    }, [error])
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let form = new FormData(e.currentTarget)
        let email = form.get('email') as string;
        let password = form.get('password') as string
        setLoading(true)
        try {

            signIn('credentials', {
                email,
                password,
                redirect: true,
                callbackUrl: '/choose-workspace',
            })
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
                        <form className='w-full' onSubmit={(e) => handleSubmit(e)}>
                            <div className="input-container">
                                <Label htmlFor='email'>Email</Label>
                                <Input type='email' id='email' placeholder='Enter your email' name='email' />
                            </div>

                            <div className="input-container">
                                <Label htmlFor='password'>password</Label>
                                <Input type='password' id='password' placeholder='create password' name='password' />
                                <p className='mt-5 text-[.9rem] flex gap-1'>Forgot password?

                                    <Link href='/reset-password' className='text-blue-500'>
                                        reset
                                    </Link>
                                </p>
                            </div>

                            <Button type='submit' disabled={loading}>Login</Button>
                        </form>
                        <p className='mt-5 text-[.9rem] flex gap-1'>
                            Don&apos;t have an account yet?
                            <Link href='/signup' className='text-blue-500'>
                                sign up!
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Page