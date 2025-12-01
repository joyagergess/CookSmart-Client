import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useHousehold } from "../context/HouseHoldContext";

export function usePantry() {
  const { householdId } = useHousehold();

  return useQuery({
    queryKey: ["pantry", householdId],
    queryFn: async () => {
      if (!householdId) return []; 
      const res = await api.get(`/pantry/list/${householdId}`);
      return res.data.payload;
    },
    enabled: !!householdId, 
    staleTime: 1000 * 60, 
  });
}
