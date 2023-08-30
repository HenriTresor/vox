'use client'
import Modal from '@/components/ui/Dialog';
import React from 'react'

type Props = {
    children: React.ReactNode
}

type dialogProps = {
    content: React.ReactNode,
    title: string;
    description: string;
}

type defaultTypes = {
    setDialogProps: (vl: dialogProps) => void;
    setIsOpen: (val: boolean) => void;
}

const defaultValues = {
    setDialogProps: (vl: dialogProps) => { },
    setIsOpen: (vl: boolean) => { }
}

export const DialogContext = React.createContext<defaultTypes>(defaultValues)

function DialogContextProvider({ children }: Props) {

    const [dialogProps, setDialogProps] = React.useState<dialogProps>({
        content: <></>,
        title: '',
        description: '',
    })

    const [isOpen, setIsOpen] = React.useState(false)


    const value = {
        setDialogProps,
        setIsOpen
    }
    return (
        <DialogContext.Provider value={value}>
            {children}
            <Modal {...dialogProps} isOpen={isOpen} setIsOpen={setIsOpen}>
                {dialogProps.content}
            </Modal>
        </DialogContext.Provider>
    )
}

export default DialogContextProvider