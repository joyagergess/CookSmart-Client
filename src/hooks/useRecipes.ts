import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type { Recipe } from "../types/Recipe";
import { useHousehold } from "../context/HouseHoldContext";

export function useRecipes() {
  const { householdId } = useHousehold();

  return useQuery<Recipe[]>({
    queryKey: ["recipes", householdId],
    queryFn: async () => {
      const res = await api.get(`/recipes/list/${householdId}`);
      return res.data.payload;
    },
    enabled: !!householdId,
  });
}
