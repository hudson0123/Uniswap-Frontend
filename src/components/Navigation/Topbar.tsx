import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/lib/store";

function Topbar() {

    const currentUser = useAuthStore((state) => state.current_user)

    if (!currentUser) {
        return <p>Loading..</p>
    }

    return (
        <nav className="fixed p-4 px-10 w-full bg-gray-500 z-10">
            <div className="flex flex-wrap justify-between mx-auto">
                <Link href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UniSwap</span>
                </Link>
                <div className='flex justify-end items-center'>
                    <Link href={"/" + currentUser.username} className="invisible md:visible text-white hover:underline">@{currentUser.username}</Link>
                    <Link href={"/" + currentUser.username}><Image width={100} height={100} className="w-12 h-12 ml-2 rounded-full hover:ring-1 ring-white transform duration-100" src={currentUser.profile_picture ? currentUser.profile_picture : "/profile.jpg"} alt="user-profile" /></Link>
                </div>
            </div>
        </nav>
    )
}

Topbar.displayName = 'Topbar';

export default Topbar;