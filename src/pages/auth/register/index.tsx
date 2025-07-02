import React from "react";
import RegisterFrom from "@/components/Forms/RegisterForm";
import Link from "next/link";
import LandingTopbar from "@/components/Navigation/LandingTopbar";
export default function Login() {

  return (
    <div className="">
      <LandingTopbar />
      <div className="flex flex-col h-[90vh] justify-center items-center bg-[#f5f5f5] pt-20 md:pt-10">
        <h2 className="text-black text-2xl font-bold">Welcome to UniSwap!</h2>
        <RegisterFrom />
        <p className="text-sm text-black">
          Already have an account? Login{" "}
          <Link className="italic " href="/auth/login">
            here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
