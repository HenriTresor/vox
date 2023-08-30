'use client'
import React from 'react'
import { Input } from '../ui/input'
import { DialogContext } from '@/context/DialogContext';
import { useParams } from 'next/navigation';
import { NotifyContext } from '@/context/NotifyContext';
import api from '@/lib/api';

type Props = {}
function NewMemberModal({ }: Props) {
    const { slug } = useParams()
    const [email, setEmail] = React.useState('')
    const { setIsOpen } = React.useContext(DialogContext)
    const { notify } = React.useContext(NotifyContext)
    const [loading, setLoading] = React.useState(false)
    const sendInvite = async () => {
        setLoading(true)
        try {

            const res = await api.server.POST('/workspaces/invite/send-invite', { email, slug })
            const data = await res.json()
            if (!data.status) return notify({ type: 'error', message: data.message })

            notify({ type: 'success', message: data.message })
            setIsOpen(false)
        } catch (error: any) {
            notify({ type: 'error', message: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Input placeholder='email address' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="mt-4">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    disabled={loading}
                    onClick={() => sendInvite()}
                >
                    Continue
                </button>
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-none px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                >
                    Cancel
                </button>
            </div>
        </>
    )
}

export default NewMemberModal