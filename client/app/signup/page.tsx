'use client'
import Logo from '@/components/reusables/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'

type Props = {}

function Page({ }: Props) {

    const [inputValues, setInputValues] = React.useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: ''
    })
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
                        <div className="input-container">
                            <Label htmlFor='email'>Email</Label>
                            <Input type='email' id='email' placeholder='Enter your email' name='email' />
                        </div>
                        <div className='flex items-center w-full'>
                            <div className="input-container">
                                <Label htmlFor='firstName'>first Name</Label>
                                <Input type='firstName' id='firstName' placeholder='Enter your first Name' name='firstName' />
                            </div>
                            <div className="input-container">
                                <Label htmlFor='lastName'>last Name</Label>
                                <Input type='lastName' id='lastName' placeholder='Enter your last Name' name='lastName' />
                            </div>
                        </div>
                        <div className='flex items-center w-full'>
                            <div className="input-container">
                                <Label htmlFor='password'>password</Label>
                                <Input type='password' id='password' placeholder='create password' name='password' />
                            </div>
                            <div className="input-container">
                                <Label htmlFor='confPassword'>confirm password</Label>
                                <Input type='password' id='confPassword' placeholder='confirm password' name='passwordConfirmation' />
                            </div>
                        </div>

                        <Button type='submit' >Create account</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Page