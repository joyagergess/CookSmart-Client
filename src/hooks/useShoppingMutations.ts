import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { useHousehold } from "../context/HouseHoldContext";

export function useShoppingMutations() {
  const qc = useQueryClient();
  const { householdId } = useHousehold();

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["shopping-list", householdId] });

  const addItem = useMutation({
    mutationFn: async (item: any) => {
      return api.post("/shopping_list_items/add", item);
    },
    onSuccess: invalidate,
  });

  const deleteItem = useMutation({
    mutationFn: async (id: number) => {
      return api.post("/shopping_list_items/delete", { id });
    },
    onSuccess: invalidate,
  });

  const toggleBought = useMutation({
    mutationFn: async (id: number) => {
      return api.post("/shopping_list_items/toggle", { id });
    },
    onSuccess: invalidate,
  });

  return { addItem, deleteItem, toggleBought };
}

export function useAddShoppingItem() {
  return useShoppingMutations().addItem;
}
