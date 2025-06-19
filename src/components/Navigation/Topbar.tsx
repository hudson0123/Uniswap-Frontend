import Link from "next/link";
import Image from "next/image";
import TopbarProfileDropdown from "./TopbarProfileDropdown";
import useCurrentUser from "@/hooks/useCurrentUser";

function Topbar() {
  // Hooks
  const {
    data: currentUserData,
    error: currentUserError,
    isPending: currentUserPending,
  } = useCurrentUser();

  if (currentUserPending) {
    return (
      <div className="h-[7vh]">
        <nav className="p-4 px-10 w-full bg-white z-10 shadow-sm">
          <div className="flex flex-wrap mx-auto my-auto h-10">
            <Link
              href="/home"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
                UniSwap
              </span>
            </Link>
            <div className="group relative flex justify-end items-center">
              <TopbarProfileDropdown />
            </div>
          </div>
        </nav>
      </div>
    );
  }

  if (currentUserError) {
    return;
  }

  return (
      <nav className="p-4 px-10 w-full bg-white z-10 shadow-sm h-[7vh]">
        <div className="flex flex-wrap w-full mx-auto h-10">
          <div className="my-auto">
            <Link
              href="/home"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
                UniSwap
              </span>
            </Link>
          </div>
          <div className="relative flex ml-auto my-auto justify-end items-center">
            <Link
              href="/chat"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <Image
                width={100}
                height={100}
                className="w-10 h-10 my-auto ml-2 hover:ring-1 ring-white transform duration-100"
                src={"message.svg"}
                alt="user-profile"
              />
            </Link>
            <div className="group">
              <Image
                width={100}
                height={100}
                className="w-12 h-12 ml-2 rounded-full hover:ring-1 ring-white transform duration-100"
                src={
                  currentUserData?.profile_picture
                    ? currentUserData?.profile_picture
                    : "/profile.jpg"
                }
                alt="user-profile"
              />
              <TopbarProfileDropdown />
            </div>
          </div>
        </div>
      </nav>
  );
}

Topbar.displayName = "Topbar";

export default Topbar;
