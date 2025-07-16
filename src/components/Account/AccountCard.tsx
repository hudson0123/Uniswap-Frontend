import React from "react";
import { IUser } from "@/@types";
import Image from "next/image";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountCardProps {
  accountData: IUser
}

export default function AccountCard({ accountData }: AccountCardProps) {
  // Hooks
  const router = useRouter();
  const {
    data: currentUserData,
    error: currentUserError,
    isPending: currentUserPending,
  } = useCurrentUser();

  const editProfile = () => {
    router.push("/app/" + accountData.username + "/edit");
    return null;
  };

  if (currentUserPending) {
    <div
      className={
        "grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-10 p-4 md:p-20 text-black mb-20 h-fit"
      }
    >
      <div className="relative bg-white p-10 flex flex-col mt-20 md:mt-5 w-full rounded-2xl shadow-xl">
        <Image
          src={"/profile.jpg"}
          width={100}
          height={100}
          alt="profile"
          className="w-30 h-30 flex rounded-full bg-white"
        />
      </div>
    </div>;
  }

  if (currentUserError) {
    return;
  }

  return (
    <div className="relative mx-auto bg-white py-6 px-10 flex flex-col md:mt-5 w-full rounded-sm shadow h-fit">
      {currentUserData?.id == accountData.id && (
        <button className="cursor-pointer" onClick={editProfile}>
          <Image
            src="/edit.svg"
            width={100}
            height={100}
            alt="profile"
            className="absolute top-5 right-5 w-5 h-5 hover:opacity-70 trasition duration-150"
          />
        </button>
      )}
        <Image
          src={
            accountData.profile_picture
              ? accountData.profile_picture
              : "/profile.jpg"
          }
          width={100}
          height={100}
          alt="profile"
          className="w-30 h-30 flex rounded-full bg-white"
        />
        {accountData?.verified && (
          <div className="group">
          <Image
            src="/verified.svg"
            width={100}
            height={100}
            alt="verified"
            className="absolute top-8 left-32 bg-red-500 rounded-full w-8 h-8"
          />
          <p className="opacity-0 absolute top-5 left-42 rounded group-hover:opacity-100 w-fit transition duration-100 font-bold bg-gray-600 text-white px-2 py-1">Verified Student</p>
          </div>
        )
      }
      <p className="text-2xl font-bold mt-5 text-nowrap">
        {accountData?.first_name} {accountData?.last_name}
      </p>
      <p className="italic gray-800 -mt-1">{accountData?.username}</p>
      <p className="italics text-sms text-gray-500 mt-3">

      
      </p>
      <p className="italics text-sm text-gray-500">
        Member since{" "}
        {new Date(accountData?.date_joined).toDateString().substring(4)}
      </p>
    </div>
  );
}
