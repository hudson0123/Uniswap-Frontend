import React from "react";
import Router, { useRouter } from "next/router";
import EditAccountCard from "@/components/Account/EditAccountCard";

export default function Edit() {

  const router = useRouter();
  const username = router.query.username;

  return <EditAccountCard username={username} />;
}
