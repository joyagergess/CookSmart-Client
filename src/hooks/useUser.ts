import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useUser(userId: number) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await api.get(`/user/users/${userId}`);
      return res.data.payload;
    },
    enabled: !!userId,
  });
}
