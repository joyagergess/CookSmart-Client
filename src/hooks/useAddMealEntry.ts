import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import type { CreateEntryInput, MealPlanEntry } from "../types/mealPlan.types";

export function useAddMealEntry() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateEntryInput): Promise<MealPlanEntry> => {
      const res = await api.post("/meal_plan/add_entry", data);
      return res.data.payload;
    },

    onSuccess: (newEntry) => {
      qc.invalidateQueries({ queryKey: ["meal-plan-entries", newEntry.meal_plan_id] });
    },
  });
}
