import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNotifyStore } from "@/lib/store";
import api from "@/lib/api";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IEvent } from "@/@types/models/event";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  event_id: z.string(),
  ticket_price: z.string(),
  description: z.string().max(100, "Keep the description under 50 characters."),
  meetup_location: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function CreatePostForm() {
  // enum categories {
  //   "Football" = "FB",
  //   "Basketball" = "BB",
  //   "Baseball" = "BSB",
  //   "Soccer" = "SOC",
  //   "Volleyball" = "VB",
  //   "Sorority Event" = "SOR",
  //   "Fraternity Event" = "FRA",
  //   "Concert" = "CON",
  //   "Swimming & Diving" = "SW",
  //   "Track & Field" = "TR",
  //   "Tennis" = "TN",
  //   "Golf" = "GF",
  //   "Gymnastics" = "GYM",
  //   "Other" = "OTH",
  // }

  // Hooks
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery<IEvent[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await api.get("/api/events/");
      return res.data;
    },
  });
  const setNotification = useNotifyStore((state) => state.setNotification);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: FormData) => {
      return await api.post("/api/posts/", {
        event_id: postData.event_id,
        ticket_price: postData.ticket_price,
        description: postData.description,
        meetup_location: postData.meetup_location,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await router.push("/app");
      return null;
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      createPostMutation.mutate(data)
    } catch {
      setNotification("error", "Failed to Create Post.");
    }
  };

  if (isPending || error || !data) {
    return;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto border mt-4 border-white rounded max-w-md"
    >
      {/* Category */}
      <div className="relative mt-4">
        <p className="text-red-400">{errors.event_id?.message}</p>
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
      </div>

      {/* Ticket Price */}
      <div className="relative mt-4">
        <p className="text-red-400">{errors.ticket_price?.message}</p>
        <input
          type="number"
          className="peer block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0"
          placeholder=" "
          {...register("ticket_price")}
        />
        <label className="absolute text-sm text-gray-700 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
          Ticket Price
        </label>
      </div>

      {/* Description */}
      <div className="relative mt-4">
        <p className="text-red-400">{errors.description?.message}</p>
        <textarea
          className="peer block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0"
          placeholder=" "
          {...register("description")}
        />
        <label className="absolute text-md text-gray-700 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
          Description
        </label>
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
        <p className="text-red-400">{errors.meetup_location?.message}</p>
        <input
          type="text"
          className="peer block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0"
          placeholder=" "
          {...register("meetup_location")}
        />
        <label className="absolute text-sm text-gray-700 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
          Meetup Location
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 text-white bg-cyan-950 cursor-pointer hover:bg-cyan-700 rounded border border-gray-400 py-2 px-4 hover:border-gray-500 transition duration-200"
      >
        Create Post
      </button>
    </form>
  );
}
