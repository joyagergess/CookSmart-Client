import { useQuery } from "@tanstack/react-query";
import { useHousehold } from "../context/HouseHoldContext";
import api from "../api/axios";

export function useGenerateSubstitutions(recipeId: number | null) {
  const { householdId } = useHousehold();

  return useQuery({
    queryKey: ["AiSubstitution", recipeId, householdId],
    enabled: false,
    queryFn: async () => {
      const res = await api.post("ai/substitutions", {
        recipe_id: recipeId,
        household_id: householdId
      });

      return res.data.payload;
    },
  });
}
