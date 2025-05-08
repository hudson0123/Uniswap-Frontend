import React, { useState } from 'react'
import { z } from 'zod'

interface LoginFormProps {
    login: (username: string, password: string) => void
}

const LoginFormSchema  = z.object({
    username: z.string(),
    password: z.string(),
})

type LoginForm = z.infer<typeof LoginFormSchema>

export default function LoginForm({ login }: LoginFormProps) {

    const INITIAL_STATE = {
        username: '',
        password: '',
    }

    const [form, setForm] = useState(INITIAL_STATE);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value
        })
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = LoginFormSchema.safeParse(form)

        if (result.success) {
            await login(form.username, form.password);
        } else {
            console.error("Invalid Form Data.")
        }

        setForm(INITIAL_STATE)
    };

    return (
        <form onSubmit={handleSubmit} className='grid grid-cols-1 px-8 py-10 rounded text-black '>
            <label className='mt-4 mb-2' htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                className='bg-gray-200 text-black rounded px-2 py-1'
            />
            <label className='mt-4 mb-2' htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className='bg-gray-200 text-black rounded px-2 py-1'
            />
            <button className="border bg-black text-white rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-200" type="submit">Submit</button>
        </form>
    );
}
