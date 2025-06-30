import React from "react";
import useFollow from "@/hooks/useFollow";
import Image from "next/image";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifyStore } from "@/lib/store";
import { IUser } from "@/@types";
import { useRouter } from "next/router";

enum ViewMode {
  None,
  Following,
  Followers,
}

export default function UserFollowers({
  setMode,
}: {
  setMode: React.Dispatch<React.SetStateAction<ViewMode>>;
}) {
  const {
    data: followerData,
    isPending: followerPending,
    error: followerError,
  } = useFollow()[0];
  const setNotification = useNotifyStore((state) => state.setNotification);
  const queryClient = useQueryClient();
  const removeFollowerMutation = useMutation({
    mutationFn: (user: IUser) => {
      return api.patch("/api/requests/" + user.id + "/", {
        status: "rejected",
      });
    },
    onError: (error) => {
      setNotification("error", JSON.stringify(error.message));
    },
    onSuccess: () => {
      setNotification("success", "Sent Request.");
      queryClient.invalidateQueries({ queryKey: ["followers"] });
    },
  });
  const router = useRouter();

  if (followerPending) {
    return;
  }

  if (followerError) {
    return;
  }

  return (
    <div className="absolute top-2/5 left-2/5 bg-white rounded shadow-md p-5 z-10 min-h-1/2 min-w-1/4 text-center pt-10">
      <button
        className="text-xl hover:font-bold absolute top-1 right-2 cursor-pointer"
        onClick={() => setMode(ViewMode.None)}
      >
        x
      </button>
      <h1 className="text-xl pb-5">Followers ({followerData?.length})</h1>
      {followerData?.map((user) => (
        <div key={user.id} className="flex flex-col-2 mb-1">
          <Image
            src={user.profile_picture ? user.profile_picture : "/profile.jpg"}
            width={100}
            height={100}
            alt="profile"
            className="w-10 h-10 flex rounded-full bg-white"
          />
          <button
            onClick={() => {
              setMode(ViewMode.None);
              router.push("/app/" + user.username);
            }}
            className="hover:underline my-auto"
          >
            {user.username}
          </button>
          <button
            onClick={() => {
              removeFollowerMutation.mutate(user);
            }}
            className="ml-auto bg-gray-300 px-5 text-sm rounded-full cursor-pointer hover:opacity-70"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
