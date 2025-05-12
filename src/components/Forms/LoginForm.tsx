import React, { useState } from 'react'
import { z } from 'zod'

interface LoginFormProps {
    login: (username: string, password: string) => void
}

const LoginFormSchema = z.object({
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
            <div className='relative mt-8'>
                <input
                    id="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    placeholder=" "
                    className='block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'
                />
                <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Username</label>
            </div>
            <div className='relative mt-8'>
                <input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder=" "
                    className='block px-2.5 pb-2.5 pt-4 w-55 text-sm bg-gray-300 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer'
                />
                <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                </div>
            <button className="border bg-black text-white rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70" type="submit">Login</button>
        </form>
    );
}
