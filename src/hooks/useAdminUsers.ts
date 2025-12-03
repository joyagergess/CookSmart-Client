import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useAdminUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await api.get("/admin/users");
      return res.data.payload;
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      return api.post("/admin/delete_users", { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });

  return {
    usersQuery,
    deleteUser: deleteUserMutation.mutate,
    deleting: deleteUserMutation.isPending,
  };
}
