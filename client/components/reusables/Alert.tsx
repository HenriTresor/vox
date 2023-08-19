import React from 'react'
import { Button } from '../ui/button'


type Props = {
    isAlertOpen: boolean,
    setAlertOpen: any,
    type?: 'error' | 'success' | 'info' | any,
    message: string
}

function Alert({ isAlertOpen, setAlertOpen, type, message }: Props) {
    return (
        <div
            className='fixed top-5 right-5 bg-white shadow-2xl border w-[20dvw] flex flex-col gap-2 p-2 rounded-md'
        >
            <div className='flex w-full justify-between items-center'>
                <div className='flex items-center gap-3'>
                    {
                        type === 'error' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className='w-6 h-6'>
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                            </svg>
                        ) : type === 'success' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-6 h-6">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>

                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" className="w-6 h-6">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                            </svg>

                        )
                    }
                    <h1>{type}</h1>
                </div>
                <Button variant={'ghost'} onClick={() => setAlertOpen(false)}>X</Button>
            </div>
            <p className='ml-5 text-neutral-500'>{message}</p>
        </div>
    )
}

export default Alert