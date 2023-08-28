import Modal from '@/components/ui/Dialog';
import React from 'react'

type Props = {
    children: React.ReactNode
}

type defaultTypes = {
    dialogProps: {
        content: React.ReactNode,
        title: string;
        description: string;
        nextAction: (vl: any) => void;
    },
    setIsOpen: (val: boolean) => void;
}

const defaultValues = {
    dialogProps: {
        content: <></>,
        title: '',
        description: '',
        nextAction: () => { },
    },
    setIsOpen: (vl: boolean) => { }
}

export const DialogContext = React.createContext<defaultTypes>(defaultValues)

function DialogContextProvider({ children }: Props) {

    const [dialogProps, setDialogProps] = React.useState({
        content: <></>,
        title: '',
        description: '',
        nextAction: () => { },
    })

    const [isOpen, setIsOpen] = React.useState(false)


    const value = {
        dialogProps,
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