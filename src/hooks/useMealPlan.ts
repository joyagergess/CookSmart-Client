import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useHousehold } from "../context/HouseHoldContext";
import type { MealPlan } from "../types/mealPlan.types";

export function useMealPlan(weekStart: string) {
  const { householdId } = useHousehold();

  return useQuery<MealPlan>({
    queryKey: ["meal-plan", householdId, weekStart],
    queryFn: async () => {
      const res = await api.post("/meal_plan/get_or_create", {
        household_id: householdId,
        week_start_date: weekStart,
      });

      return res.data.payload;
    },
    enabled: !!householdId,
    staleTime: 1000 * 60,
  });
}
