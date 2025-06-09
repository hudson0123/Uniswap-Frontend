import React from "react";
import { useRouter } from "next/router";
import EditAccountForm from "@/components/Forms/EditAccountForm";
import NotificationBanner from "@/components/NotificationBanner";
import Topbar from "@/components/Navigation/Topbar";

export default function Edit() {
  const router = useRouter();
  const username = router.query.username;

  return (
    <>
      <Topbar />
      <NotificationBanner />
      <EditAccountForm username={username} />
    </>
  );
}
