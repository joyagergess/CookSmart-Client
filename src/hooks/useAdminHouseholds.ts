import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useAdminHouseholds() {
  const queryClient = useQueryClient();

  const householdsQuery = useQuery({
    queryKey: ["admin-households"],
    queryFn: async () => {
      const res = await api.get("/admin/households");
      return res.data.payload;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return api.post("/admin/delete_household", { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-households"] });
    },
  });

  return {
    householdsQuery,
    deleteHousehold: deleteMutation.mutate,
    deleting: deleteMutation.isPending,
  };
}
