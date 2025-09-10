import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/lib/api';
const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});
import toast from 'react-hot-toast';
import LoadingSpinner from '../Loading/LoadingSpinner';

type FormData = z.infer<typeof schema>;

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
      const res = await api.post('/api/feedback/', data);
      if (res.status === 201) {
        toast.success('Thank you for sharing your feedback.');
        reset();
      }
    } catch {
      toast.error('Failed to share feedback.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 px-8 py-20 text-black bg-white md:w-1/3 w-full m-auto md:mt-1/3 mt-7 rounded-sm md:shadow-xl"
    >
      <h2 className="text-3xl font-semibold mx-auto">Share Feedback</h2>

      <div className="relative mt-8">
        <label htmlFor="title" className="ml-1 text-sm">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="block px-2.5 pb-2.5 pt-2.5 w-full text-sm bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
          {...register('title')}
        />
        {errors.title && (
          <p className="text-red-600 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="description" className="ml-1 text-sm">
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          className="block px-2.5 pb-2.5 pt-2.5 w-full text-sm bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer resize-none"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative bg-gray-500 text-white rounded-md py-2 w-full mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
      >
        {isSubmitting ? <LoadingSpinner /> : 'Submit'}
      </button>
    </form>
  );
}
