import { useState, useCallback } from 'react'
import { z } from 'zod'

const useForm = () => {

    const [form, setForm] = useState({
        email: {value: '', error: ''},
        first_name: {value: '', error: ''},
        last_name: {value: '', error: ''},
        password: {value: '', error: ''},
        confirm_password: {value: '', error: ''},
    })

    return { form }
}


export default useForm