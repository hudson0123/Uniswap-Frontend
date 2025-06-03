import React from "react";
import RegisterFrom from "@/components/Forms/RegisterForm";
import { useAuthStore } from "@/lib/store";
import NotificationBanner from "@/components/NotificationBanner";
import Link from "next/link";
import LandingTopbar from "@/components/Navigation/LandingTopbar";
export default function Login() {
  const login = useAuthStore((state) => state.login);

  return (
    <div className="">
      <LandingTopbar />
      <NotificationBanner />
      <div className="flex flex-col h-screen justify-center items-center bg-[#f5f5f5]">
        <h2 className="text-black text-2xl font-bold">Welcome to UniSwap!</h2>
        <RegisterFrom />
        <p className="text-sm text-black">
          Already have an account? Login{" "}
          <Link className="italic " href="/login">
            here
          </Link>
          .
        </p>{" "}
      </div>
    </div>
  );
}
