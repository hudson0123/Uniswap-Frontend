import VerifyAccountForm from "@/components/Forms/VerifyAccountForm";
import React from "react";
import { useRouter } from "next/router";
import NotificationBanner from "@/components/NotificationBanner";

export default function Verify() {
  const router = useRouter();
  const username = router.query.username;

  return (
    <>
      <NotificationBanner />
      <VerifyAccountForm username={username} />
    </>
  );
}
