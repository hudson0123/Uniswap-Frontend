import React from "react";
import Image from "next/image";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/router";

export default function TopbarProfileDropdown() {
  const current_user = useAuthStore((state) => state.current_user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleShowProfile = () => {
    router.push("/" + current_user?.username + "/");
  };

  const handleEditProfile = () => {
    const editUrl = "/" + current_user?.username + "/edit";
    router.push(editUrl);
  };

  const handleVerifyProfile = () => {
    const editUrl = "/" + current_user?.username + "/verify";
    router.push(editUrl);
  };

  return (
    <div className="z-11 grid grid-cols-1 absolute top-10 right-6 bg-white border-1 border-gray-200 shadow-xl rounded-xl w-50 h-fit invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:top-13 transform duration-200 cursor-pointer">
      <div
        onClick={handleShowProfile}
        className="flex flex-col-3 p-2 hover:bg-gray-100 transform duration-100 "
      >
        <div className="m-auto">
          <Image
            width={100}
            height={100}
            className="w-12 h-12 ml-2 bg-transparent rounded-full transform duration-100"
            src={
              current_user?.profile_picture
                ? current_user?.profile_picture
                : "/profile.jpg"
            }
            alt="user-profile"
          />
        </div>
        <div className="m-auto">
          <p className="text-xs">
            {current_user?.first_name} {current_user?.last_name}
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
      <hr className=""></hr>
      <button onClick={handleVerifyProfile} className="text-sm text-left p-4 bg-[#FDE295] hover:bg-yellow-200 transform duration-100 py-1 cursor-pointer">
        Verify Account
      </button>
      <hr className=""></hr>
      <button onClick={handleEditProfile} className="text-sm text-left p-4 hover:bg-gray-100 transform duration-100 py-1 cursor-pointer">
        Settings
      </button>
      <hr className=""></hr>
      <button className="text-sm text-left p-4 hover:bg-gray-100 transform duration-100 py-1 cursor-pointer">
        Help Center
      </button>
      <hr className=""></hr>
      <button onClick={logout} className="text-sm text-left p-4 hover:bg-gray-100 transform duration-100 py-1 cursor-pointer">
        Log out
      </button>
    </div>
  );
}
