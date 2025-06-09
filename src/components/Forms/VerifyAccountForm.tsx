import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "@/lib/api";
import { useNotifyStore } from "@/lib/store";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  code: z
    .string()
    .min(6, "verification code is 6 digits")
    .max(6, "verification code is 6 digits"),
});

type FormData = z.infer<typeof schema>;

export default function VerifyAccountForm({
  username,
}: {
  username: string | string[] | undefined;
}) {

  // Hooks
  const setNotification = useNotifyStore((state) => state.setNotification);
  const router = useRouter();
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post("/api/verify/confirm/", {
        code: data.code,
      });
      if (res.status == 200) {
        queryClient.invalidateQueries({ queryKey: ['currentUser']})
        setNotification("success", "Your Account is Verified!");
        router.push("/" + username + "/");
        return null;
      } else {
        setNotification("error", "Failed to Verify.");
      }
    } catch {
      setNotification("error", "Failed to Verify.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-white p-40 flex flex-col rounded-2xl shadow-xl w-200 m-auto mt-20"
    >
      <label className="m-auto text-3xl">Verification Code</label>
      <input
        className="m-auto text-center text-2xl block px-2.5 pb-2.5 pt-2.5 w-50 mt-10 bg-gray-200 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
        type="text"
        id="code"
        placeholder="123456"
        {...register("code")}
      />
      <p className="text-red-500">{errors.code?.message}</p>
      <button
        type="submit"
        disabled={isSubmitting}
        className="m-auto bg-blue-300 text-gray-900 font-bold rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
      >
        Verify
      </button>
    </form>
  );
}
