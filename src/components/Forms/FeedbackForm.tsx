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
import LoadingSpinner from '../Loading/LoadingSpinner'

type FormData = z.infer<typeof schema>


export default function FeedbackForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post("/api/feedback/", data);
      if (res.status === 201) {
        toast.success("Thank you for sharing your feedback.");
        reset();
      }
    } catch {
      toast.error("Failed to share feedback.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 px-8 py-20 text-black md:w-1/3 w-full m-auto md:mt-20 mt-7"
    >
      <h2 className="text-2xl font-semibold mb-6 mx-auto">Share Feedback</h2>

      <div className="relative mt-8">
        <input
          id="title"
          placeholder=" "
          {...register("title")}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border appearance-none focus:outline-none focus:ring-0 peer ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        <label
          htmlFor="title"
          className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
        >
          Title
        </label>
        {errors.title && (
          <p className="text-red-400 text-xs max-w-70 h-2">{errors.title.message}</p>
        )}
      </div>

      <div className="relative mt-8">
        <textarea
          id="description"
          rows={5}
          placeholder=" "
          {...register("description")}
          className={`block px-2.5 pb-2.5 pt-6 w-full text-sm bg-gray-300 rounded-lg border appearance-none focus:outline-none focus:ring-0 peer resize-none ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        <label
          htmlFor="description"
          className="absolute text-lg duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
        >
          Description
        </label>
        {errors.description && (
          <p className="text-red-400 text-xs max-w-70 h-2">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative border bg-black text-white rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
      >
        {isSubmitting ? <LoadingSpinner /> : "Submit"}
      </button>
    </form>
  );
}