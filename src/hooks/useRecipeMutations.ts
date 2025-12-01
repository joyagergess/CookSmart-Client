import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { useHousehold } from "../context/HouseHoldContext";

export function useRecipeMutations() {
  const queryClient = useQueryClient();
  const { householdId } = useHousehold();

  const createRecipe = useMutation({
    mutationFn: async (data: any) => {
      return api.post("/recipes/add_update", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes", householdId] });
    },
  });

  const addIngredient = useMutation({
    mutationFn: async (data: any) => {
      return api.post("/recipes/add_ingredient", data);
    },
  });

  const deleteRecipe = useMutation({
    mutationFn: async (id: number) => {
      return api.post("/recipes/delete", { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes", householdId] });
    },
  });

  return { createRecipe, addIngredient, deleteRecipe };
}
