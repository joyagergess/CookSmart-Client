import { useQuery } from "@tanstack/react-query";
import { useHousehold } from "../context/HouseHoldContext";
import api from "../api/axios";

export function useWeeklySummary() {
  const { householdId } = useHousehold();

  return useQuery({
    queryKey: ["AiWeeklySummary", householdId],
    enabled: false,
    queryFn: async () => {
      const res = await api.post("/ai/weekly-summary", {
        household_id: householdId,
      });

      return res.data.payload;
    },
  });
}
