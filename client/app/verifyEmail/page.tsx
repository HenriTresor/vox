import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Footer from '@/components/views/LandingPage/Footer'
import NavBar from '@/components/views/LandingPage/NavBar'
import React from 'react'

type Props = {}

function page({}: Props) {
  return (
    <>
      <NavBar />
      <div className="w-full h-[100dvh] grid place-content-center text-center">
        <h1 className='font-bold text-[2rem] mb-5'>Verify Your account</h1>
        <p className='font-mono text-neutral-600'>Enter the code sent to your email to verify the account.</p>
        <div className="input-container">
          <Input type='number' className='text-center' placeholder='verification code' />
        </div>
        <Button>Verify</Button>
      </div>
      <Footer />
    </>
  )
}

export default page