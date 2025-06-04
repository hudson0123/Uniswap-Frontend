import React from "react";
import { IUser } from "@/@types";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthStore } from "@/lib/store";
import Link from "next/link";

export default function AccountCard({ account_data }: { account_data: IUser }) {
  const router = useRouter();
  const current_user = useAuthStore((state) => state.current_user);

  const editProfile = () => {
    const editUrl = "/" + account_data.username + "/edit";
    router.push(editUrl);
  };

  if (!current_user) {
    return;
  }

  return (
    <div className="relative bg-white p-10 flex flex-col mt-20 md:mt-5 w-full rounded-2xl shadow-xl">
      {current_user.id == account_data.id && (
        <button className="cursor-pointer" onClick={editProfile}>
          <Image
            src="/edit.svg"
            width={100}
            height={100}
            alt="profile"
            className="absolute top-5 right-5 w-8 h-8"
          />
        </button>
      )}
      <Image
        src={
          account_data.profile_picture
            ? account_data.profile_picture
            : "/profile.jpg"
        }
        width={100}
        height={100}
        alt="profile"
        className="w-30 h-30 flex rounded-full bg-white"
      />
      <p className="text-4xl font-bold mt-5">
        {account_data?.first_name} {account_data?.last_name}
      </p>
      <p className="italics">@{account_data?.username}</p>
      <div className="mt-1">
        <Link href="/followers" className="hover:underline cursor-pointer mr-3">1 Followers</Link>
        <Link href="/following" className="hover:underline cursor-pointer">4 Following</Link>
      </div>
      <p className="italics text-sm text-gray-500">
        Member since{" "}
        {new Date(account_data?.date_joined).toDateString().substring(4)}
      </p>
      <p className="italics text-sms text-gray-500">
        {account_data?.verified && <p>Verified UGA Student</p>}
      </p>
      <div className="mt-8">
        {account_data.email && (
          <div className="flex justify-start mb-2">
            <Image
              src="/gmail.svg"
              width={100}
              height={100}
              alt="profile"
              className="w-12 h-12 mr-5"
            />
            <p className="mt-auto mb-auto">{account_data?.email}</p>
          </div>
        )}
        {account_data.snapchat && (
          <div className="flex justify-start mb-2">
            <Image
              src="/snapchat.svg"
              width={100}
              height={100}
              alt="profile"
              className="w-10 h-10 mr-5"
            />
            <p className="mt-auto mb-auto">@{account_data?.snapchat}</p>
          </div>
        )}
        {account_data.instagram && (
          <div className="flex justify-start mb-2">
            <Image
              src="/instagram.svg"
              width={100}
              height={100}
              alt="profile"
              className="w-10 h-10 mr-5"
            />
            <p className="mt-auto mb-auto">@{account_data?.instagram}</p>
          </div>
        )}
        {account_data.groupme && (
          <div className="flex justify-start mb-2">
            <Image
              src="/groupme.jpeg"
              width={100}
              height={100}
              alt="profile"
              className="w-10 h-10 rounded-full mr-5"
            />
            <p className="mt-auto mb-auto">@{account_data?.groupme}</p>
          </div>
        )}
        {account_data.discord && (
          <div className="flex justify-start mb-2">
            <Image
              src="/discord.svg"
              width={100}
              height={100}
              alt="profile"
              className="w-12 h-12 mr-5"
            />
            <p className="mt-auto mb-auto">@{account_data?.discord}</p>
          </div>
        )}
      </div>
    </div>
  );
}
