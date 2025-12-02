import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useUpdateHousehold() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      return api.post(`/household/add_update/${data.id}`, {
        name: data.name,
        invite_code: data.invite_code
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["household"] });
      queryClient.invalidateQueries({ queryKey: ["householdMembers"] });
    }
  });
}
