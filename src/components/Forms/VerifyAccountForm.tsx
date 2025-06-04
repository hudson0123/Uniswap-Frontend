import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "@/lib/api";
import { useNotifyStore } from "@/lib/store";
import { useRouter } from "next/router";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setNotification = useNotifyStore((state) => state.setNotification);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post("/api/verify/confirm/", {
        code: data.code,
      });
      if (res.status == 200) {
        router.push("/" + username + "/");
        setNotification("success", "Your Account is Verified!");
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
      className="relative bg-white p-10 flex flex-col mt-20 md:mt-5 rounded-2xl shadow-xl w-fit m-auto"
    >
      <label className="text">Verification Code</label>
      <input
        className="block mt-2 px-2.5 pb-2.5 pt-2.5 w-full text-sm bg-gray-200 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
        type="text"
        id="code"
        {...register("code")}
      />
      <p className="text-red-500">{errors.code?.message}</p>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
      >
        Verify
      </button>
    </form>
  );
}
