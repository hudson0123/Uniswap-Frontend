import { useQueries, UseQueryResult } from "@tanstack/react-query";
import api from "@/lib/api";
import { IUser } from "@/@types";

export default function useFollow() {
  return useQueries<UseQueryResult<IUser[]>[]>({
    queries: [
      {
        queryKey: ["followers", 1],
        queryFn: async () => (await api.get("/api/followers/")).data,
      },
      {
        queryKey: ["following", 2],
        queryFn: async () => (await (api.get("/api/following/"))).data,
      },
    ],
  });
}
