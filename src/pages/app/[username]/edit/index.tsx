import React from "react";
import { useRouter } from "next/router";
import EditAccountForm from "@/components/Forms/EditAccountForm";
import Topbar from "@/components/Navigation/Topbar";
import AccountSettingsSection from "@/components/Account/AccountSettingsSection";

export default function Edit() {
  const router = useRouter();
  const username = router.query.username;

  return (
    <div className="">
      <Topbar />
      <div className="relative bg-white p-10 flex flex-col md:mt-1/2 mt-7 rounded-sm md:shadow-xl md:w-1/3 w-full m-auto">
        <EditAccountForm username={username} />
        <hr className="my-5"></hr>
        <AccountSettingsSection />
      </div>
    </div>
  );
}
