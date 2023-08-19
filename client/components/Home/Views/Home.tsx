import React from 'react'

type Props = {}

function Home({}: Props) {
  return (
      <div className=' sm:h-[100dvh] min-h-screen flex justify-center items-center'>
          <div className='sm:text-left text-center sm:pl-4 p-4 sm:w-1/2 w-full tracking-wider text-[1.5rem]'>
              <h1 className='font-bold text-[2em]'>Manage your team without ever leaving your office.</h1>
              <p className='mt-5 text-[0.7em] text-neutral-700'>Wether you are a start up company or an already grown-up organisation, this software can help you you manage and organize your team at one place.</p>
          </div>
          <div className='w-1/2 h-full bg-black rounded-tl-full  text-white text-center hidden sm:flex items-center justify-center text-[3rem] tracking-wider'>
          
          </div>
    </div>
  )
}

export default Home