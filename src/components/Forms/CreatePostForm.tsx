import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNotifyStore } from "@/lib/store";
import api from "@/lib/api";
import { useRouter } from "next/router";

export default function CreatePostForm() {
  const schema = z.object({
    ticket_title: z.string(),
    ticket_price: z.string(),
    description: z
      .string()
      .max(100, "Keep the description under 50 characters."),
    category: z.string(),
    meetup_time: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid datetime format",
    }),
    meetup_location: z.string(),
  });

  const setNotification = useNotifyStore((state) => state.setNotification);

  type FormData = z.infer<typeof schema>;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post("/api/posts/", {
        ticket_title: data.ticket_title,
        ticket_price: data.ticket_price,
        description: data.description,
        category: data.category,
        meetup_time: data.meetup_time,
        meetup_location: data.meetup_location,
      });
      router.push("/home");
      return null;
    } catch {
      setNotification("error", "Failed to Create Post.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto border border-white p-5 rounded"
    >
      <h1 className="text-white font-bold mb-5 text-2xl">Create Post</h1>
      <p className="text-red-400">{errors.ticket_title?.message}</p>
      <input
        type="text"
        placeholder="Ticket Title"
        className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
        {...register("ticket_title")}
      />
        <p className="text-red-400">{errors.ticket_price?.message}</p>
      <input
        type="number"
        placeholder="Price"
        className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
        {...register("ticket_price")}
      />
        <p className="text-red-400">{errors.description?.message}</p>
      <textarea
        placeholder="Description"
        className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
        {...register("description")}
      />
      <p className="text-red-400">{errors.category?.message}</p>
      <input
        type="text"
        placeholder="Category"
        className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
        {...register("category")}
      />
      <p className="text-red-400">{errors.meetup_time?.message}</p>
      <input
        type="datetime-local"
        className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
        {...register("meetup_time")}
      />
      <p className="text-red-400">{errors.meetup_location?.message}</p>
      <input
        type="text"
        placeholder="Location"
        className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
        {...register("meetup_location")}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="text-black bg-gray-300 rounded border-1 mb-3 black py-1 px-2 hover:border-gray-300 transition duration-200"
      >
        Create Post
      </button>
    </form>
  );
}
