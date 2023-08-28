import Footer from '@/components/views/LandingPage/Footer'
import NavBar from '@/components/views/LandingPage/NavBar'
import React from 'react'

type Props = {}

function Page({ }: Props) {
    return (
        <>
            <NavBar />
            <div className='w-full h-[100dvh] grid place-content-center text-[2rem]'>
                Something went wrong
            </div>
            <Footer />
        </>
    )
}

export default Page