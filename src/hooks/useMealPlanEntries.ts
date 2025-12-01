import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useMealPlanEntries(mealPlanId?: number) {
  return useQuery({
    queryKey: ["mealPlanEntries", mealPlanId],
    enabled: !!mealPlanId,
    queryFn: async () => {
      const res = await api.get(`/meal_plan/entries/${mealPlanId}`);
      return res.data.payload;
    }
  });
}
