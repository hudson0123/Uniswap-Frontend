import Link from "next/link";
import Image from "next/image";
import TopbarProfileDropdown from "./TopbarProfileDropdown";
import useCurrentUser from "@/hooks/useCurrentUser";

function Topbar() {
  const {
    data: currentUserData,
    error: currentUserError,
  } = useCurrentUser();

  if (currentUserError) return null;

  const profileImage = currentUserData?.profile_picture || "/profile.jpg";

  return (
    <nav className="w-full bg-white shadow-sm z-10 px-10 py-4 h-[9vh]">
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/home" className="text-2xl font-semibold text-black">
          UniSwap
        </Link>

        {/* Right-side icons */}
        <div className="flex items-center gap-4">
          {/* Chat Icon */}
            <Link href="/chat">
              <Image
                src="/message.svg"
                alt="Chat"
                width={40}
                height={40}
                className="w-10 h-10 transition duration-150"
              />
            </Link>

          {/* Profile */}
          <div className="relative group">
            <Image
              src={profileImage}
              alt="User profile"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full hover:ring-2 cursor-pointer transition duration-150"
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