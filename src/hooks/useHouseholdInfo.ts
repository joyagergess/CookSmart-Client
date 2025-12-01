import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useHousehold } from "../context/HouseHoldContext";

export function useHouseholdInfo() {
  const { householdId } = useHousehold();

  return useQuery({
    queryKey: ["household-info", householdId],
    queryFn: async () => {
      const res = await api.get(`/household/${householdId}`);
      return res.data.payload;
    },
    enabled: !!householdId,
  });
}
