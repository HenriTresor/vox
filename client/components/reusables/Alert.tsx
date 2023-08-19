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
            className='fixed top-5 right-5 bg-white shadow-2xl border '
        >
            <Button onClick={() => setAlertOpen(false)}>close</Button>
            <h1>{type}</h1>
            <h1>{message}</h1>
        </div>
    )
}

export default Alert