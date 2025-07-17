import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/api";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IError } from "@/@types/api/response/error";
import { AxiosError } from "axios";
import { IUser } from "@/@types";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../Loading/LoadingSpinner";
export interface EditAccountFormProps {
  username: string | string[] | undefined;
}

const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  bio: z.string(),
});

type FormData = z.infer<typeof schema>;

type EditUserInput = {
  first_name: string;
  last_name: string;
  bio: string;
};

export default function EditAccountForm({ username }: EditAccountFormProps) {
  // Hooks
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const {
    data: currentUserData,
    error: currentUserError,
    isPending: currentUserPending,
  } = useCurrentUser();
  const queryClient = useQueryClient();
  const { mutate: editAccountMutation, isPending: editAccountPending } =
    useMutation<IUser, AxiosError<IError>, EditUserInput>({
      mutationFn: async (data: FormData) => {
        const res = await api.patch(
          "/api/users/" + currentUserData?.id + "/",
          data
        );
        return res.data;
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["currentUser"] }); // We need optimistic update here?
        toast.success("User Updated.");
        router.push("/app/" + currentUserData?.username + "/");
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.detail ??
            error.message ??
            "Failed to edit account."
        );
      },
    });

  if (currentUserPending) {
    return;
  }

  if (currentUserError) {
    return;
  }

  const onSubmit = async (data: FormData) => {
    editAccountMutation(data);
  };

  // If Attempting to edit not the current user then push to the correct url
  if (username !== currentUserData?.username) {
    router.push("/app/" + currentUserData?.username + "/edit/");
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row mx-auto">
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
      <div className="grid grid-cols-2 mt-10 gap-5">
        <div className="relative">
          <label htmlFor="last_name" className="ml-1 text-sm">
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            defaultValue={currentUserData?.first_name}
            className="block px-2.5 pb-2.5 pt-2.5 w-full max-w-50 text-sm bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
            {...register("first_name")}
          />
          {errors.first_name && (
            <p className="text-red-600 text-sm">{errors.first_name.message}</p>
          )}
        </div>
        <div className="relative">
          <label htmlFor="last_name" className="ml-1 text-sm">
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            defaultValue={currentUserData?.last_name}
            className="block px-2.5 pb-2.5 pt-2.5 w-full max-w-50 text-sm bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
            {...register("last_name")}
          />
          {errors.last_name && (
            <p className="text-red-600 text-sm">{errors.last_name.message}</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <div className="relative  justify-start mb-2">
          <div>
            <label htmlFor="email" className="ml-1 text-sm">
              Email
            </label>
            <input
              id="email"
              type="text"
              disabled={true}
              defaultValue={currentUserData?.email}
              className="block px-2.5 pb-2.5 pt-2.5 w-full max-w-100 text-sm bg-gray-100 text-gray-600 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="bio" className="ml-1 text-sm">
              Bio
            </label>
            <textarea
              id="bio"
              defaultValue={currentUserData?.bio}
              className="block px-2.5 pb-2.5 pt-2.5 w-full max-w-100 text-sm bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
              {...register("bio")}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={editAccountPending}
        className="relative bg-gray-500 text-white rounded-md py-2 w-full mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
      >
        {editAccountPending ? <LoadingSpinner /> : "Save"}
      </button>
    </form>
  );
}
