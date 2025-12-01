import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useHousehold } from "../context/HouseHoldContext";

export function useMealPlan(weekStart: string) {
  const { householdId } = useHousehold();

  return useQuery({
    queryKey: ["mealPlan", householdId, weekStart],
    enabled: !!householdId && !!weekStart,
    queryFn: async () => {
      const res = await api.post("/meal_plan/get_or_create", {
        household_id: householdId,
        week_start_date: weekStart
      });
      return res.data.payload;
    }
  });
}
