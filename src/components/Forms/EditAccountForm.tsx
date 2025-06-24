import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNotifyStore } from "@/lib/store";
import api from "@/lib/api";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function EditAccountForm({
  username: username,
}: {
  username: string | string[] | undefined;
}) {

  // Hooks
  const router = useRouter();
  const setNotification = useNotifyStore((state) => state.setNotification);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const {
    data: currentUserData,
    error: currentUserError,
    isPending: currentUserPending,
  } = useCurrentUser();
  const queryClient = useQueryClient()

  if (currentUserPending) {
    return;
  }

  if (currentUserError) {
    return;
  }

  const onSubmit = async (data: FormData) => {
    try {
      await api.patch("/api/users/" + currentUserData?.id + "/", {
        first_name: data.first_name,
        last_name: data.last_name,
      });
      queryClient.invalidateQueries({ queryKey: ['currentUser']})
      router.push("/" + currentUserData?.username + "/");
      return null;
    } catch {
      setNotification("error", "Error Updating User.");
    }
  };

  // If Attempting to edit not the current user then push to the correct url
  if (username !== currentUserData?.username) {
    router.push("/" + currentUserData?.username + "/edit/");
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-white p-10 flex flex-col md:mt-20 mt-7 md:rounded-2xl md:shadow-xl md:w-2/3 w-full m-auto"
    >
      <div className="flex flex-row">
        <Image
          src={
            currentUserData?.profile_picture
              ? currentUserData?.profile_picture
              : "/profile.jpg"
          }
          width={100}
          height={100}
          alt="profile"
          className="w-20 h-20 rounded-full bg-white"
        />
        <p className="my-auto ml-5 text-2xl">@{currentUserData?.username}</p>
      </div>
      <div className="relative mt-8">
        <label htmlFor="last_name" className="text-sm">
          First Name
        </label>
        <input
          id="first_name"
          type="text"
          defaultValue={currentUserData?.first_name}
          className="block px-2.5 pb-2.5 pt-2.5 w-1/2 text-sm bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
          {...register("first_name")}
        />
        {errors.first_name && (
          <p className="text-red-600 text-sm">{errors.first_name.message}</p>
        )}
      </div>
      <div className="relative mt-2">
        <label htmlFor="last_name" className="text-sm">
          Last Name
        </label>
        <input
          id="last_name"
          type="text"
          defaultValue={currentUserData?.last_name}
          className="block px-2.5 pb-2.5 pt-2.5 w-1/2 text-sm bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
          {...register("last_name")}
        />
        {errors.last_name && (
          <p className="text-red-600 text-sm">{errors.last_name.message}</p>
        )}
      </div>
      <div className="mt-2">
        <div className="flex justify-start mb-2">
          <Image
            src="/gmail.svg"
            width={100}
            height={100}
            alt="profile"
            className="w-12 h-12 mr-2"
          />
          <p className="mt-auto mb-auto">{currentUserData?.email}</p>
        </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
      >
        Save
      </button>
      </div>
    </form>
  );
}
