'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Footer from '@/components/views/LandingPage/Footer'
import NavBar from '@/components/views/LandingPage/NavBar'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'

type Props = {}

function Page({ }: Props) {

    const { notify } = useContext(NotifyContext)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState<number>(0)
    const [codeIsSent, setCodeIsSent] = useState(false)
    const [codeIsCorrect, setCodeIsCorrect] = useState(false)

    const requestCode = async () => {
        try {
            const res = await api.server.POST('/users/accounts/send-code', {
                email, type: 'password reset'
            })
            const data = await res.json()
            notify({ message: data.message, type: 'info' })
            if (data.status) setCodeIsSent(true)
        } catch (error: any) {
            notify({ message: error.message, type: 'error' })
        }
    }

    const verifyPasswordResetCode = async () => {
        setLoading(true)
        try {

            const res = await api.server.POST('/users/accounts/verify/password-reset-code', {
                code,
                email
            })

            const data = await res.json()
            if (!data.status) return notify({ message: data.message, type: 'error' })

            notify({ message: data.message, type: 'success' })
            setCodeIsCorrect(true)
        } catch (error: any) {
            notify({ message: error.message, type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const resetPassword = async () => {
        setLoading(true)
        try {

            const res = await api.server.POST('/users/accounts/reset-password', {
                password,
                email
            })

            const data = await res.json()
            if (!data.status) return notify({ message: data.message, type: 'error' })

            notify({ message: data.message + '. Login to continue', type: 'success' })
            router.push('/login')
        } catch (error: any) {
            notify({ message: error.message, type: 'error' })
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <NavBar />
            <div className="w-full h-[100dvh] grid place-content-center text-center">
                <h1 className='font-bold text-[2rem] mb-5'>Reset password</h1>
                <p className='font-mono text-neutral-600'>Follow the following easy to reset your password.</p>
                <div className="input-container">
                    <Input type='email' className=''
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button onClick={requestCode} disabled={loading}>Request code</Button>
                </div>
                {
                    codeIsSent && (
                        <div className="input-container">
                            <Input
                                type='number'
                                className='text-center'
                                placeholder='verification code'
                                value={code}
                                onChange={(e) => setCode(Number(e.target.value))}
                            />
                            <Button onClick={verifyPasswordResetCode} disabled={loading}>verify code</Button>
                        </div>
                    )
                }
                {
                    codeIsCorrect && (
                        <div className="input-container">
                            <Input
                                type='password'
                                className=''
                                placeholder='new password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button disabled={loading} onClick={resetPassword}>Reset password</Button>
                        </div>
                    )
                }
            </div>
            <Footer />
        </>
    )
}

export default Page