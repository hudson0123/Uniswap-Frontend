import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/@types";
import api from "@/lib/api";

export default function useCurrentUser() {

    const {
    data,
    error,
    isPending,
  } = useQuery<IUser>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await api.get("/api/current-user/");
      return res.data;
    },
  });

  return { data, error, isPending }


}
