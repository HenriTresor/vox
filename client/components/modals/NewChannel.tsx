import React, { useContext, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { DialogContext } from '@/context/DialogContext'
import { NotifyContext } from '@/context/NotifyContext'
import api from '@/lib/api'
import { getSession } from 'next-auth/react'

type Props = {
    slug: string;
}

function NewChannel({ slug }: Props) {

    const { setIsOpen } = useContext(DialogContext)
    const { notify } = useContext(NotifyContext)
    const [values, setValues] = useState({
        name: '',
        form: 'public'
    })

    const createChannel = async () => {
        try {
            const session = await getSession()
            const res = await api.server.POST('/channels', { ...values, creator: session?.user._id, slug })
            const data = await res.json()
            if (!data.status) throw new Error(data.message)

            notify({ type: 'success', message: ' new channel added' })
            setIsOpen(false)
        } catch (error: any) {
            notify({ type: 'error', message: error.message })
        }
    }
    return (
        <div className='w-full p-3 mt-3'>
            <Input
                value={values.name}
                onChange={(e) => setValues(prev => ({ ...prev, name: e.target.value }))}
                placeholder='channel name'
                required
            />
            <select
                value={values.form}
                className='p-2 w-full mt-3 mb-3' name="form"
                onChange={(e) => setValues(prev => ({ ...prev, form: e.target.value }))}
                id="form" placeholder='channel type'>
                <option value="public">public</option>
                <option value="private">private</option>
            </select>

            <Button onClick={createChannel}>Save</Button>
            <Button variant={'outline'} onClick={() => setIsOpen(false)}>Cancel</Button>
        </div>
    )
}

export default NewChannel