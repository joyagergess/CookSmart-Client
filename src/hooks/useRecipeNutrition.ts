import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useRecipeNutrition(recipeId: number | null) {

  return useQuery({
    queryKey: ["AiNutrition", recipeId],
    enabled: false,
    queryFn: async () => {
      const res = await api.post("/ai/nutrition/recipe", {
        recipe_id: recipeId
      });

      return res.data.payload; 
    },
  });
}
