import React, { SetStateAction } from "react";
import { IUser } from "@/@types";
import Image from "next/image";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFollow from "@/hooks/useFollow";

enum ViewMode {
  None,
  Following,
  Followers,
}

export default function AccountCard({
  accountData,
  setMode,
}: {
  accountData: IUser;
  setMode: React.Dispatch<SetStateAction<ViewMode>>;
}) {
  // Hooks
  const router = useRouter();
  const {
    data: currentUserData,
    error: currentUserError,
    isPending: currentUserPending,
  } = useCurrentUser();
  const {
    data: followerData,
    isPending: followerPending,
    error: followerError,
  } = useFollow()[0];
  const {
    data: followingData,
    isPending: followingPending,
    error: followingError,
  } = useFollow()[1];

  const editProfile = () => {
    const editUrl = "/" + accountData.username + "/edit";
    router.push(editUrl);
    return null;
  };

  const verifyProfile = () => {
    const editUrl = "/" + accountData.username + "/verify";
    router.push(editUrl);
    return null;
  };

  enum ViewMode {
    None,
    Following,
    Followers,
  }

  if (currentUserPending || followerPending || followingPending) {
    return;
  }

  if (currentUserError || followerError || followingError) {
    return;
  }

  return (
    <div className="relative bg-white p-10 flex flex-col md:mt-5 w-full rounded-2xl shadow-xl h-[83vh]">
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
      <p className="text-2xl font-bold mt-5 text-nowrap">
        {accountData?.first_name} {accountData?.last_name}
      </p>
      <p className="italic gray-800 -mt-1">{accountData?.username}</p>
      <div className="mt-1">
        <button
          onClick={() => setMode(ViewMode.Followers)}
          className="hover:underline cursor-pointer mr-3"
        >
          <span className="font-bold">
            {followerData ? followerData.length : "0"}
          </span>{" "}
          Followers
        </button>
        <button
          onClick={() => setMode(ViewMode.Following)}
          className="hover:underline cursor-pointer"
        >
          <span className="font-bold">
            {followingData ? followingData.length : "0"}
          </span>{" "}
          Following
        </button>
      </div>
      <p className="italics text-sms text-gray-500">
        {accountData?.verified ? (
          "Verified UGA Student"
        ) : (
          <p className="text-sm">
            Unverified - Verify{" "}
            <button
              className="italic hover:underline cursor-pointer"
              onClick={verifyProfile}
            >
              here
            </button>
          </p>
        )}
      </p>
      <p className="italics text-sm text-gray-500">
        Member since{" "}
        {new Date(accountData?.date_joined).toDateString().substring(4)}
      </p>
      <div className="mt-8">
        {accountData.phone_number && (
          <div className="flex justify-start mb-2">
            <Image
              src="/phone.svg"
              width={100}
              height={100}
              alt="profile"
              className="w-12 h-12 mr-5"
            />
            <p className="mt-auto mb-auto">
              {accountData?.phone_number.slice(0, 3) +
                "-" +
                accountData?.phone_number.slice(3, 6) +
                "-" +
                accountData?.phone_number.slice(6, 10)}
            </p>
          </div>
        )}
        {accountData.email && (
          <div className="flex justify-start mb-2">
            <Image
              src="/gmail.svg"
              width={100}
              height={100}
              alt="profile"
              className="w-12 h-12 mr-5"
            />
            <p className="mt-auto mb-auto text-sm">{accountData?.email}</p>
          </div>
        )}
        {accountData.snapchat && (
          <div className="flex justify-start mb-2">
            <Image
              src="/snapchat.svg"
              width={100}
              height={100}
              alt="profile"
              className="w-10 h-10 mr-5"
            />
            <p className="mt-auto mb-auto text-sm">@{accountData?.snapchat}</p>
          </div>
        )}
        {accountData.instagram && (
          <div className="flex justify-start mb-2">
            <Image
              src="/instagram.svg"
              width={100}
              height={100}
              alt="profile"
              className="w-10 h-10 mr-5"
            />
            <p className="mt-auto mb-auto text-sm">@{accountData?.instagram}</p>
          </div>
        )}
        {accountData.groupme && (
          <div className="flex justify-start mb-2">
            <Image
              src="/groupme.jpeg"
              width={100}
              height={100}
              alt="profile"
              className="w-10 h-10 rounded-full mr-5"
            />
            <p className="mt-auto mb-auto text-sm">@{accountData?.groupme}</p>
          </div>
        )}
        {accountData.discord && (
          <div className="flex justify-start mb-2">
            <Image
              src="/discord.svg"
              width={100}
              height={100}
              alt="profile"
              className="w-12 h-12 mr-5"
            />
            <p className="mt-auto mb-auto text-sm">@{accountData?.discord}</p>
          </div>
        )}
      </div>
    </div>
  );
}
