'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Footer from '@/components/views/LandingPage/Footer'
import NavBar from '@/components/views/LandingPage/NavBar'
import React, { useContext, useRef, useState } from 'react'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'

type Props = {}

function Page({ }: Props) {

  const { notify } = useContext(NotifyContext)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const verifyAccount = async () => {
    setLoading(true)
    try {

      const res = await api.server.POST('/users/accounts/verify', {
        code: inputRef.current?.value,  
        email: localStorage.getItem('email')
      })

      const data = await res.json()
      if (!data.status) return notify({ message: data.message, type: 'error' })

      notify({ message: data.message, type: 'success' })
      router.push('/')
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
        <h1 className='font-bold text-[2rem] mb-5'>Verify Your account</h1>
        <p className='font-mono text-neutral-600'>Enter the code sent to your email to verify the account.</p>
        <div className="input-container">
          <Input type='number' className='text-center' placeholder='verification code' ref={inputRef} />
        </div>
        <Button onClick={verifyAccount} disabled={loading}>Verify</Button>
      </div>
      <Footer />
    </>
  )
}

export default Page