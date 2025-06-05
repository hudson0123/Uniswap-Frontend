import React from "react";
import { IUser } from "@/@types";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthStore } from "@/lib/store";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNotifyStore } from "@/lib/store";
import api from "@/lib/api";

const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string().min(10).max(10),
  snapchat: z.string(),
  instagram: z.string(),
  groupme: z.string(),
  discord: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function EditAccountForm({
  username: username,
}: {
  username: string | string[] | undefined;
}) {
  const router = useRouter();
  const current_user = useAuthStore((state) => state.current_user);
  const refreshCurrentUser = useAuthStore((state) => state.refreshCurrentUser);
  const setNotification = useNotifyStore((state) => state.setNotification);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.patch("/api/users/" + current_user?.id + "/", {
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        snapchat: data.snapchat,
        instagram: data.instagram,
        groupme: data.groupme,
        discord: data.discord,
      });
      refreshCurrentUser();
      router.push("/" + current_user?.username + "/");
    } catch {
      setNotification("error", "Unable to Update User");
    }
  };

  if (username !== current_user?.username) {
    router.push("/" + current_user?.username + "/edit/");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-white p-10 flex flex-col mt-20 md:mt-5 rounded-2xl shadow-xl w-2/3 m-auto"
    >
      <div className="flex flex-row">
        <Image
          src={
            current_user?.profile_picture
              ? current_user?.profile_picture
              : "/profile.jpg"
          }
          width={100}
          height={100}
          alt="profile"
          className="w-20 h-20 rounded-full bg-white"
        />
        <p className="my-auto ml-5 text-2xl">@{current_user?.username}</p>
      </div>
      <div className="relative mt-8">
        <label htmlFor="last_name" className="text-sm">
          First Name
        </label>
        <input
          id="first_name"
          type="text"
          defaultValue={current_user?.first_name}
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
          defaultValue={current_user?.last_name}
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
          <p className="mt-auto mb-auto">{current_user?.email}</p>
        </div>
        <div className="flex justify-start mb-2">
          <Image
            src="/phone.svg"
            width={100}
            height={100}
            alt="profile"
            className="w-12 h-12 mr-2"
          />
          <input
            id="phone_number"
            type="phone_number"
            defaultValue={current_user?.phone_number}
            className="block px-2.5 pb-2 pt-2 w-1/2 text-sm bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
            {...register("phone_number")}
          />
        </div>
        <p className="text-red-500 text-xs">{errors.phone_number?.message}</p>
        <div className="flex justify-start mb-2">
          <Image
            src="/snapchat.svg"
            width={100}
            height={100}
            alt="profile"
            className="w-10 h-10 mr-5"
          />
          <p className="my-auto mr-2">@</p>
          <input
            id="snapchat"
            type="snapchat"
            defaultValue={current_user?.snapchat}
            className="block px-2.5 pb-2.5 pt-2.5 w-1/2 text-sm bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
            {...register("snapchat")}
          />
        </div>
        <p className="text-red-500 text-xs">{errors.snapchat?.message}</p>
        <div className="flex justify-start mb-2">
          <Image
            src="/instagram.svg"
            width={100}
            height={100}
            alt="profile"
            className="w-10 h-10 mr-5"
          />
          <p className="my-auto mr-2">@</p>
          <input
            id="instagram"
            type="instagram"
            defaultValue={current_user?.instagram}
            className="block px-2.5 pb-2.5 pt-2.5 w-1/2 text-sm bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
            {...register("instagram")}
          />{" "}
        </div>
        <p className="text-red-500 text-xs">{errors.instagram?.message}</p>
        <div className="flex justify-start mb-2">
          <Image
            src="/groupme.jpeg"
            width={100}
            height={100}
            alt="profile"
            className="w-10 h-10 rounded-1/2 mr-5"
          />
          <p className="my-auto mr-2">@</p>
          <input
            id="groupme"
            type="groupme"
            defaultValue={current_user?.groupme}
            className="block px-2.5 pb-2.5 pt-2.5 w-1/2 text-sm bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
            {...register("groupme")}
          />{" "}
        </div>
        <p className="text-red-500 text-xs">{errors.groupme?.message}</p>
        <div className="flex justify-start mb-2">
          <Image
            src="/discord.svg"
            width={100}
            height={100}
            alt="profile"
            className="w-10 h-10 mr-5"
          />
          <p className="my-auto mr-2">@</p>
          <input
            id="discord"
            type="discord"
            defaultValue={current_user?.discord}
            className="block px-2.5 pb-2.5 pt-2.5 w-1/2 text-sm bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
            {...register("discord")}
          />{" "}
        </div>
        <p className="text-red-500 text-xs">{errors.discord?.message}</p>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
      >
        Save
      </button>
    </form>
  );
}
