import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

function Home({}: Props) {
  return (
      <div className=' md:h-[100dvh] min-h-screen flex justify-center items-center'>
          <div className='md:text-left text-center md:pl-4 p-4 md:w-1/2 w-full tracking-wider text-[1.5rem]'>
              <h1 className='font-bold md:text-[2em] text[1.6em]'>Manage your team without ever leaving your office.</h1>
              <p className='mt-5 text-[0.7em] text-neutral-700'>Wether you are a start up company or an already grown-up organisation, this software can help you you manage and organize your team at one place.</p>
              <Button variant='default' className='mt-10'>Get started  →</Button>
          </div>
          <div className='w-1/2 h-full bg-black rounded-tl-full  text-white text-center hidden md:flex items-center justify-center text-[3rem] tracking-wider'>
          
          </div>
    </div>
  )
}

export default Home