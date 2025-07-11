import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "@/lib/api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface VerifyAccountFormProps {
  username: string | string[] | undefined
}

const schema = z.object({
  code: z
    .string()
    .min(6, "verification code is 6 digits")
    .max(6, "verification code is 6 digits"),
});

type FormData = z.infer<typeof schema>;

export default function VerifyAccountForm({username}: VerifyAccountFormProps) {
  // Hooks
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const resendVerificationCode = async () => {
    try {
      const res = await api.post('/api/verify/send/')
      if (res.status == 200) {
        toast.success("Sent Verification Email.")
      }
    } catch {
      toast.error("Failed to Send Verification Email")
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post("/api/verify/confirm/", {
        code: data.code,
      });
      if (res.status == 200) {
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        toast.success("Your Account is Verified!");
        router.push("/app/" + username + "/");
        return null;
      } else {
        toast.error("Failed to Verify.");
      }
    } catch {
      toast.error("Failed to Verify.");
    }
  };

  return (
    <div className="bg-gray-200 p-40 shadow-xl rounded-2xl h-screen flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col bg-white  rounded-2xl mx-auto w-fit p-20 shadow-xl"
      >
        <label className="m-auto font-bold text-3xl">Verification Code</label>
        <input
          className="m-auto font-stretch-semi-expanded text-center text-2xl block px-2.5 pb-2.5 pt-2.5 w-50 mt-10 bg-gray-200 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
          type="text"
          id="code"
          placeholder="123456"
          {...register("code")}
        />
        <p className="text-red-500 mx-auto">{errors.code?.message}</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="m-auto bg-blue-300 text-gray-900 font-bold rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
        >
          Verify
        </button>
      </form>
      <button className="font-bold mt-5 cursor-pointer hover:text-gray-700 text-xl" onClick={resendVerificationCode}>Resend Code</button>
    </div>
  );
}
