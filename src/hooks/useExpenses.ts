import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useHousehold } from "../context/HouseHoldContext";

export function useExpenses(weekStart: string) {
  const { householdId } = useHousehold();

  return useQuery({
    queryKey: ["expenses", householdId, weekStart],
    queryFn: async () => {
      const res = await api.get(`/expenses/week/${householdId}/${weekStart}`);
      return res.data.payload;
    },
    enabled: !!householdId,
  });
}
