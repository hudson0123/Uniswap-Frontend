import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

function Topbar() {

    const getCurrentUser = async () => {
        const res = await api.get('/api/current-user/')
        return res.data
    }

    const {data: currentUser, error, isPending} = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser
    })

    if ( isPending ) {
        return <p>Pending...</p>
    } else if ( error ) {
        return <p>Error...</p>
    }

    return (
        <nav className="fixed flex flex-wrap items-center justify-between mx-auto p-4 px-10 w-full bg-gray-600">
                <Link href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UniSwap</span>
                </Link>
                <div className='flex justify-end items-center'>
                    <Link href={"/" + currentUser.username} className="invisible md:visible text-white hover:underline">@{currentUser.username}</Link>
                    <Link href={"/" + currentUser.username}><Image width={100} height={100} className="w-12 h-12 ml-2 rounded-full border-1 border-gray-300 hover:ring-1 ring-white transform duration-100" src={currentUser.profile_picture ? currentUser.profile_picture : "http://www.w3.org/2000/svg"} alt="user-profile" /></Link>
                </div>
        </nav>
    )
}

Topbar.displayName = 'Topbar';

export default Topbar;