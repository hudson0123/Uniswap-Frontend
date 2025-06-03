import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNotifyStore } from "@/lib/store";
import api from "@/lib/api";
import { useRouter } from "next/router";

const schema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords must match",
  });

type FormData = z.infer<typeof schema>;


export default function RegisterForm() {
  const setNotification = useNotifyStore((state) => state.setNotification);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post("/api/users/", {
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      });
      router.push('/login')
    } catch {
      setNotification("error", "Unable to Create User.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 px-8 py-10 rounded text-black w-100"
    >
      <div className="relative mt-8">
        <input
          id="username"
          type="text"
          placeholder=" "
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
          {...register("username")}
        />
        <label
          htmlFor="username"
          className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
          Username
        </label>
        {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
      </div>

      <div className="relative mt-8">
        <input
          id="email"
          type="email"
          placeholder=" "
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
          {...register("email")}
        />
        <label
          htmlFor="email"
          className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
          Email
        </label>
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
      </div>

      <div className="relative mt-8">
        <input
          id="first_name"
          type="text"
          placeholder=" "
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
          {...register("first_name")}
        />
        <label
          htmlFor="first_name"
          className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
          First Name
        </label>
        {errors.first_name && <p className="text-red-600 text-sm">{errors.first_name.message}</p>}
      </div>

      <div className="relative mt-8">
        <input
          id="last_name"
          type="text"
          placeholder=" "
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
          {...register("last_name")}
        />
        <label
          htmlFor="last_name"
          className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
          Last Name
        </label>
        {errors.last_name && <p className="text-red-600 text-sm">{errors.last_name.message}</p>}
      </div>

      <div className="relative mt-8">
        <input
          id="password"
          type="password"
          placeholder=" "
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
          {...register("password")}
        />
        <label
          htmlFor="password"
          className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
          Password
        </label>
        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
      </div>

      <div className="relative mt-8">
        <input
          id="confirm_password"
          type="password"
          placeholder=" "
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-gray-300 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
          {...register("confirm_password")}
        />
        <label
          htmlFor="confirm_password"
          className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
          Confirm Password
        </label>
        {errors.confirm_password && <p className="text-red-600 text-sm">{errors.confirm_password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="border bg-black text-white rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
      >
        Register
      </button>
    </form>
  );
}