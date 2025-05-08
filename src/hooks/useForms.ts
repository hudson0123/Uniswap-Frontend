import { useState, useCallback } from 'react'
import { z } from 'zod'

export default function useForm(initial_value = '') {

    const [value, setValue] = useState(initial_value)

    const handleChange = useCallback((e) => {
        setValue(e.target.value)
    }, [])

    const reset = useCallback(() => {
        setValue(initial_value)
    }, [initial_value])

    return {
        value,
        onChange: handleChange,
        reset
    }
}