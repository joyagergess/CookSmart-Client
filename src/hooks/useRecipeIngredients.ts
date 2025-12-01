import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type { RecipeIngredient } from "../types/Recipe";

export function useRecipeIngredients(recipeId: number | null) {
  return useQuery<RecipeIngredient[]>({
    queryKey: ["recipe-ingredients", recipeId],
    queryFn: async () => {
      if (!recipeId) return [];
      const res = await api.get(`/recipes/ingredients/${recipeId}`);
      return res.data.payload;
    },
    enabled: !!recipeId,
  });
}
