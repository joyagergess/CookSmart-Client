import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useAdminMembers() {
  const queryClient = useQueryClient();

  const membersQuery = useQuery({
    queryKey: ["admin-members"],
    queryFn: async () => {
      const res = await api.get("/admin/household_members");
      return res.data.payload;
    },
  });

  const deleteMemberMutation = useMutation({
    mutationFn: async (id: number) => {
      return api.post("/admin/delete_household_member", { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-members"] });
    }
  });

  return {
    membersQuery,
    deleteMember: deleteMemberMutation.mutate,
    deleting: deleteMemberMutation.isPending,
  };
}
