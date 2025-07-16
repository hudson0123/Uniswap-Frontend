import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/api";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IEvent } from "@/@types/models/event";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IError } from "@/@types/api/response/error";
import { IPost } from "@/@types";
import LoadingSpinner from "../Loading/LoadingSpinner";

const schema = z.object({
  event_id: z.string().min(1, "Event Required."),
  ticket_price: z.string().min(1, "Price Required."),
  description: z.string().max(100, "Keep the description under 50 characters."),
  meetup_location: z.string().min(1, "Meetup Location Required."),
});

type FormData = z.infer<typeof schema>;

export default function CreatePostForm() {

  // Hooks
  const queryClient = useQueryClient();
  const { data, isPending: isEventsPending, error } = useQuery<IEvent[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await api.get("/api/events/");
      return res.data;
    },
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {mutate: createPostMutation, isPending: isEditsPending} = useMutation<IPost, AxiosError<IError>, FormData>({
    mutationFn: async (data) => {
      const res = await api.post("/api/posts/", data);
      return res.data;
    },
    onSuccess: async () => {
      router.push("/app");
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(
        "Post Created. Please Allow a few moments for it to appear."
      );
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.detail ??
          error.message ??
          "Failed to create post."
      );
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      createPostMutation(data);
    } catch {
      toast.error("Failed to Create Post.");
    }
  };

  if (isEventsPending || error || !data) {
    return;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto border mt-4 border-white rounded max-w-md"
    >
      {/* Category */}
      <div className="relative mt-4">
        <select
          className="peer block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0"
          {...register("event_id")}
          defaultValue=""
        >
          {data.map((event) => (
            <option key={event.id} value={event.id}>
              {event.event_name}
            </option>
          ))}
        </select>
        <label className="absolute text-sm text-gray-700 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
          Event
        </label>
        <p className="text-red-500 text-sm h-2">{errors.event_id?.message}</p>
      </div>

      {/* Ticket Price */}
      <div className="relative mt-4">
        <input
          type="number"
          className="peer block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0"
          placeholder=" "
          {...register("ticket_price")}
        />
        <label className="absolute text-sm text-gray-700 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
          Ticket Price
        </label>
        <p className="text-red-500 text-sm h-2">
          {errors.ticket_price?.message}
        </p>
      </div>

      {/* Description */}
      <div className="relative mt-4">
        <textarea
          className="peer block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0"
          placeholder=" "
          {...register("description")}
        />
        <label className="absolute text-md text-gray-700 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
          Description
        </label>
        <p className="text-red-500 text-sm h-2">
          {errors.description?.message}
        </p>
      </div>

      {/* Category
      <div className="relative mt-4">
        <p className="text-red-400">{errors.category?.message}</p>
        <select
          className="peer block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0"
          {...register("category")}
          defaultValue=""
        >
          <option disabled value="">
            Select a Category
          </option>
          {Object.entries(categories).map(([label, value]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <label className="absolute text-sm text-gray-700 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
          Category
        </label>
      </div> */}

      {/* Meetup Location */}
      <div className="relative mt-4">
        <input
          type="text"
          className="peer block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0"
          placeholder=" "
          {...register("meetup_location")}
        />
        <label className="absolute text-sm text-gray-700 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
          Meetup Location
        </label>
        <p className="text-red-500 text-sm h-2">
          {errors.meetup_location?.message}
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="relative mt-8 text-white bg-cyan-950 cursor-pointer h-10 w-30 hover:bg-cyan-700 rounded border border-gray-400 py-2 px-4 hover:border-gray-500 transition duration-200"
      >
        {isEditsPending ? <LoadingSpinner /> : "Create Post"}
      </button>
    </form>
  );
}
