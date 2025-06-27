import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useAuthStore } from "@/lib/store";

export default function TopbarProfileDropdown() {

  // Hooks
  const router = useRouter();
  const resetAuth = useAuthStore((state) => state.resetAuth)
  const {
    data: currentUserData,
    error: currentUserError,
    isPending: currentUserPending,
  } = useCurrentUser();

  if (currentUserPending) {
    return;
  }

  if (currentUserError) {
    return;
  }

  const handleShowProfile = () => {
    router.push("/" + currentUserData?.username + "/");
    return null;
  };

  const handleEditProfile = () => {
    const editUrl = "/" + currentUserData?.username + "/edit";
    router.push(editUrl);
    return null;
  };

  const handleVerifyProfile = () => {
    const editUrl = "/" + currentUserData?.username + "/verify";
    router.push(editUrl);
    return null;
  };

  const handleLogout = () => {
    resetAuth()
    router.push('/login')
    return null;
  }

  return (
    <div
      tabIndex={0}
      className="transform duration-200 md:group-hover:visible md:group-hover:opacity-100 md:group-hover:top-13 group-focus:visible group-focus:opacity-100 z-11 grid grid-cols-1 absolute top-10 right-6 bg-white border-1 border-gray-200 shadow-xl rounded-xl w-50 h-fit invisible opacity-0 cursor-pointer"
    >
      <div
        onClick={handleShowProfile}
        className="flex flex-col-3 p-2 hover:bg-gray-100 transform duration-100 "
      >
        <div className="m-auto">
          <Image
            width={100}
            height={100}
            className="w-12 h-12 bg-transparent rounded-full "
            src={
              currentUserData?.profile_picture
                ? currentUserData?.profile_picture
                : "/profile.jpg"
            }
            alt="user-profile"
          />
        </div>
        <div className="mr-auto my-auto">
          <p className="text-xs">
            {currentUserData?.first_name} {currentUserData?.last_name}
          </p>
          <p className="text-xs text-gray-400 mt-1">Show profile</p>
        </div>
        <div className="m-auto">
          <Image
            width={100}
            height={100}
            className="w-4 h-4 transform duration-100"
            src="/right-arrow.svg"
            alt="user-profile"
          />
        </div>
      </div>
      {(currentUserData?.verified == false && currentUserData?.email.endsWith("@uga.edu")) && (
        <>
          <hr className=""></hr>
          <button
            onClick={handleVerifyProfile}
            className="text-sm text-left p-4 bg-[#FDE295] hover:bg-yellow-200 transform duration-100 py-1 cursor-pointer"
          >
            Verify Account
          </button>
        </>
      )}
      <hr className=""></hr>
      <button
        onClick={handleEditProfile}
        className="text-sm text-left p-4 hover:bg-gray-100 transform duration-100 py-1 cursor-pointer"
      >
        Settings
      </button>
      <hr className=""></hr>
      <button className="text-sm text-left p-4 hover:bg-gray-100 transform duration-100 py-1 cursor-pointer">
        Report Issue
      </button>
      <hr className=""></hr>
      <button
        onClick={handleLogout}
        className="text-sm text-left p-4 hover:bg-gray-100 transform duration-100 py-1 cursor-pointer"
      >
        Log out
      </button>
    </div>
  );
}
