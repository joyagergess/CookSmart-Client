import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type { MealPlanEntry } from "../types/mealPlan.types";

export function useMealPlanEntries(mealPlanId?: number) {
  return useQuery<MealPlanEntry[]>({
    queryKey: ["meal-plan-entries", mealPlanId],
    queryFn: async () => {
      const res = await api.get(`/meal_plan/entries/${mealPlanId}`);
      return res.data.payload;
    },
    enabled: !!mealPlanId,
    staleTime: 1000 * 60,
  });
}
