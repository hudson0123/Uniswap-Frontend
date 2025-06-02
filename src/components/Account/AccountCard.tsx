import React from "react";
import { IUser } from "@/@types";
import Image from "next/image";
import { useRouter } from "next/router";

export default function AccountCard({ account_data }: { account_data: IUser }) {
  const router = useRouter();

  const editProfile = () => {
    const editUrl = "/" + account_data.username + "/edit";
    router.push(editUrl);
  };

  return (
    <div className="relative bg-white p-10 flex flex-col mt-15 w-full rounded-2xl shadow-xl h-[80vh]">
      <button className="cursor-pointer" onClick={editProfile}>
        <Image
          src="/edit.svg"
          width={100}
          height={100}
          alt="profile"
          className="absolute top-5 right-5 w-8 h-8"
        />
      </button>
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
      <p className="italics mt-3">@{account_data?.username}</p>
      <p className="italics text-sm text-gray-500">
        Member since{" "}
        {new Date(account_data?.date_joined).toDateString().substring(4)}
      </p>
      <p className="italics text-sm text-gray-500">
        {account_data?.verified && <p>Verified UGA Student</p>}
      </p>
      <div className="grid grid-cols-2 mt-5 w-1/2">
        <div className="flex flex-col">
          <p>2</p>
          <p>Followers</p>
        </div>
        <div>
          <p>1</p>
          <p>Following</p>
        </div>
      </div>
      {account_data.discord && (
        <>
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
        </>
      )}
    </div>
  );
}
