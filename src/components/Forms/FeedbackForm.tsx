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
      className="relative bg-white p-10  flex flex-col md:mt-20 mt-7 rounded-sm md:shadow-xl w-full md:w-1/2 m-auto"
    >
      <h2 className="text-2xl font-semibold mb-6 mx-auto">Share Feedback</h2>

      <div className="relative mb-5">
        <label htmlFor="title" className="text-sm block mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className={`block px-2.5 pb-2.5 pt-2.5 w-full text-sm bg-white rounded-lg border appearance-none focus:outline-none focus:ring-0 peer ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="relative mb-5">
        <label htmlFor="description" className="text-sm block mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          {...register("description")}
          className={`block px-2.5 pb-2.5 pt-2.5 w-full text-sm bg-white rounded-lg border appearance-none focus:outline-none focus:ring-0 peer resize-none ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative bg-black text-white rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
      >
        {isSubmitting ? <LoadingSpinner /> : "Submit"}
      </button>
    </form>
  );
}
