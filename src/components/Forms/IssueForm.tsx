import React from 'react'
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api from '@/lib/api'
import { useNotifyStore } from '@/lib/store'
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
})

type FormData = z.infer<typeof schema>


export default function IssueForm() {

  const setNotification = useNotifyStore((state) => state.setNotification)

  const onSubmit = async (data: FormData) => {
  try {
    const res = await api.post("/api/issues/", {
      title: data.title,
      description: data.description,
    });
    if (res.status === 201) {
      setNotification("success", "Issue created successfully.");
    }

  } catch {
    setNotification("error", "Failed to create issue.");
  }
}

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  }
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 px-8 mb-5 py-5 rounded text-black md:w-2/5"
    >
      <h2 className="text-xl font-bold mb-4">Create Issue</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          {...register("title")}
          className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          {...register("description")}
          className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Submit
      </button>
    </form>

    
  )
}
