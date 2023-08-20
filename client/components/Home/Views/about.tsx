import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import Link from 'next/link'

type Props = {}

const reasons = [
    {
        title: "Cool features to easy your work",
        description: "Our system comprises of different cool features which you can use to manage to lead your team to a better future!"
    },
    {
        title: "Cool features to easy your work",
        description: "Our system comprises of different cool features which you can use to manage to lead your team to a better future!"
    },
    {
        title: "Cool features to easy your work",
        description: "Our system comprises of different cool features which you can use to manage to lead your team to a better future!"
    },
    {
        title: "Cool features to easy your work",
        description: "Our system comprises of different cool features which you can use to manage to lead your team to a better future!"
    },
]
const AboutUs = (props: Props) => {
    return (
        <div
            className='sm:h-[100dvh] min-h-screen flex flex-col md:flex-row justify-center md:items-center'
        >
            <div className='w-1/2 h-full bg-none border-r-4  border-black  text-white bg-black hidden rounded-full md:flex text-center items-center justify-center text-[3rem] tracking-wider'>
                <div className='w-full p-4'>
                    <h1>Why Choose Us</h1>
                    <p className='text-[0.4em]  mt-10 '>We are a team of dedicated developers,<br /> working to provide solutions!</p>
                    <Link href={'/signup'}>
                        <Button>Find more →</Button>
                    </Link>
               </div>
            </div>
            <div className='w-full p-4 block  md:hidden text-[2rem] '>
                <h1>Why Choose Us</h1>
                <p className='text-[0.4em] text-neutral-700 mt-10 '>We are a team of dedicated developers,<br /> working to provide spolutions!</p>
            </div>
            <div className='md:w-1/2 w-full p-4 grid sm:grid-cols-2 grid-cols-1 gap-5 h-full place-content-center'>
            {
                    reasons.map(item => {
                        return (
                            <Card key={item.title}>
                                <CardHeader className='flex flex-col gap-5'>
                                    <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{ item.description}</CardDescription>
                               </CardHeader>
                            </Card>
                      )
                })
            }
            </div>
        </div>
    )
}

export default AboutUs