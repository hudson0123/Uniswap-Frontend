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
          className="block px-2.5 pb-2.5 pt-4 w-55 text-sm bg-gray-300 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
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
          className="block px-2.5 pb-2.5 pt-4 w-55 text-sm bg-gray-300 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
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
          <div role="status" className="absolute top-3 left-11.5">
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}
