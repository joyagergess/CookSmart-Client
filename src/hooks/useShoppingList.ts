import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useHousehold } from "../context/HouseHoldContext";

export function useShoppingList() {
  const { householdId } = useHousehold();

  return useQuery({
    queryKey: ["shopping-list", householdId],
    queryFn: async () => {
      const res = await api.get(`/shopping_list/${householdId}`);
      return res.data.payload;
    },
    enabled: !!householdId,
  });
}
