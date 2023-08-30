'use client'
import Alert from '@/components/reusables/Alert'
import React from 'react'

type Props = {
    children: React.ReactNode
}

type defaultValues = {
    notify: ({ type, message }: AlertTypes) => void
}

type AlertTypes = {
    type: 'error' | 'success' | 'info',
    message: string
}


export const NotifyContext = React.createContext<defaultValues>({ notify: () => { } })


function NotifyContextProvider({ children }: Props) {

    const [isAlertOpen, setAlertOpen] = React.useState(false)
    const [alert, setAlert] = React.useState({
        type: '',
        message: ''
    })

    const notify = ({ type, message }: AlertTypes): void => {
        setAlertOpen(true)
        setAlert({
            type: type,
            message: message
        })
    }

    const value = {
        notify
    }
    return (
        <NotifyContext.Provider value={value}>
            {children}
            {
                isAlertOpen && (
                    <Alert
                        isAlertOpen={isAlertOpen}
                        setAlertOpen={setAlertOpen}
                        type={alert.type}
                        message={alert.message}
                    />
                )
            }

        </NotifyContext.Provider>
    )
}

export default NotifyContextProvider