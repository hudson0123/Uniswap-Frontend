import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/lib/store";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { GetAccessRequest, GetAccessResponse } from "@/@types";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { IError } from "@/@types/api/response/error";
import { AxiosError } from "axios";
import LoadingSpinner from "../Loading/LoadingSpinner";

// Define outside component function as does not depend on state.
const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  // Hooks
  const setAccess = useAuthStore((state) => state.setAccess);
  const setRefresh = useAuthStore((state) => state.setRefresh);
  const router = useRouter();
  const { mutate: login, isPending } = useMutation<
    GetAccessResponse,
    AxiosError<IError>,
    GetAccessRequest
  >({
    mutationFn: async (login: GetAccessRequest) => {
      const res = await api.post("/api/token/", login);
      return res.data;
    },
    onSuccess: (data) => {
      setAccess(data.access);
      setRefresh(data.refresh);
      router.push("/app");
      return null;
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.detail ?? error.message ?? "Login Failed."
      );
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      login(data);
    } catch {
      toast.error("Failed to Login.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 px-8 py-10 rounded text-black "
    >
      <div className="relative mt-8">
        <input
          className="block px-2.5 pb-2.5 pt-4 w-55 text-sm bg-white rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
          id="username"
          {...register("username")}
        />
        <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Username
        </label>
        {<p className="text-red-400 text-xs max-w-70 h-2">{errors.username?.message}</p>}
      </div>
      <div className="relative mt-8">
        <input
          type="password"
          className="block px-2.5 pb-2.5 pt-4 w-55 text-sm bg-white rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
          id="password"
          {...register("password")}
        />
        <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Password
        </label>
        {<p className="text-red-400 text-xs max-w-70 h-2">{errors.password?.message}</p>}
      </div>
      <button
        className="relative border bg-black text-white rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
        type="submit"
      >
        {isPending ? (
          <LoadingSpinner />
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}
