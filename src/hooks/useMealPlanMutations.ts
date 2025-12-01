import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useMealPlanMutations() {
  const queryClient = useQueryClient();

  const addEntry = useMutation({
    mutationFn: (data: any) => api.post("/meal_plan/add_entry", data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["mealPlanEntries", variables.meal_plan_id] });
    }
  });

  const removeEntry = useMutation({
    mutationFn: (id: number) => api.post("/meal_plan/remove_entry", { id }),
    onSuccess: (_, variables: any) => {
      queryClient.invalidateQueries({ queryKey: ["mealPlanEntries", variables.meal_plan_id] });
    }
  });

  return { addEntry, removeEntry };
}
