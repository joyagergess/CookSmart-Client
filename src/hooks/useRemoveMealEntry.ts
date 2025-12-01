import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useRemoveMealEntry() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.post("/meal_plan/remove_entry", { id });
      return res.data.payload;
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["meal-plan-entries"] });
    },
  });
}
