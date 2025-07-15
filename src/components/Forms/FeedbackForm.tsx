import React from 'react'
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api from '@/lib/api'
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
})
import toast from 'react-hot-toast'

type FormData = z.infer<typeof schema>


export default function FeedbackForm() {

  const onSubmit = async (data: FormData) => {
  try {
    const res = await api.post("/api/feedback/", {
      title: data.title,
      description: data.description,
    });
    if (res.status === 201) {
      toast.success("Thank you for sharing your feedback.");
      reset();
    }

  } catch {
    toast.error("Failed to share feedback.");
  }
}

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  }
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 mx-auto mt-20 px-8 mb-5 py-5 rounded text-black md:w-2/5"
    >
      <h2 className="text-xl font-bold mx-auto mb-4">Share Feedback</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          {...register("title")}
          className={`w-full bg-white p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.title && <p className="text-red-500 text-sm h-2">{errors.title.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          {...register("description")}
          className={`w-full bg-white p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.description && <p className="text-red-500 text-sm h-2">{errors.description.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200 disabled:opacity-50"
      >
        Submit
      </button>
    </form>

    
  )
}
