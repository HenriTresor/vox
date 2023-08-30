import React, { useContext, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { DialogContext } from '@/context/DialogContext'
import { NotifyContext } from '@/context/NotifyContext'

type Props = {}

function NewChannel({ }: Props) {

    const { setIsOpen } = useContext(DialogContext)
    const { notify } = useContext(NotifyContext)
    const [values, setValues] = useState({
        name: '',
        form: ''
    })
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

            <Button>Save</Button>
            <Button variant={'outline'} onClick={() => setIsOpen(false)}>Cancel</Button>
        </div>
    )
}

export default NewChannel