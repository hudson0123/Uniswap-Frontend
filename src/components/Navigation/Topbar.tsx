import Link from "next/link";
import Image from "next/image";
import TopbarProfileDropdown from "./TopbarProfileDropdown";
import useCurrentUser from "@/hooks/useCurrentUser";

function Topbar() {
  const { data: currentUserData, error: currentUserError } = useCurrentUser();

  if (currentUserError) return null;

  const profileImage = currentUserData?.profile_picture || "/profile.jpg";

  return (
    <nav className="w-full bg-white shadow-sm z-10 py-4 h-[9vh]">
      <div className="max-w-screen-3xl mx-auto flex items-center justify-between px-4 sm:px-10 h-full">
        {/* Logo */}
        <Link href="/home" className="text-2xl font-semibold text-black">
          <Image
            src="/uniswap.png"
            alt="Chat"
            width={150}
            height={150}
            className="mt-2 bg-transparent transition duration-150 hover:scale-105"
          />
        </Link>

        {/* Right-side icons */}
        <div className="flex items-center gap-4">
          {/* Chat Icon */}
          <Link href="/chat" className="cursor-pointer">
            <h2 className="font-sans mt-2 hover:text-gray-500 text-lg mr-5">
              Messages
            </h2>
          </Link>

          {/* Profile */}
          <div className="relative group">
            <Link href={`/${currentUserData?.username}/`}>
              <Image
                src={profileImage}
                alt="User profile"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full hover:ring-2 cursor-pointer transition duration-150"
              />
            </Link>
            <TopbarProfileDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}

Topbar.displayName = "Topbar";

export default Topbar;
