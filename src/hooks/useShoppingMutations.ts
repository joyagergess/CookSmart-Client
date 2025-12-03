import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { useHousehold } from "../context/HouseHoldContext";

export function useShoppingMutations() {
  const qc = useQueryClient();
  const { householdId } = useHousehold();

  const invalidateAll = () => {
    qc.invalidateQueries({ queryKey: ["shopping-list", householdId] });
    qc.invalidateQueries({ queryKey: ["pantry", householdId] });
  };

  const addItem = useMutation({
    mutationFn: async (item: any) => {
      return api.post("/shopping_list_items/add", item);
    },
    onSuccess: invalidateAll,
  });

  const deleteItem = useMutation({
    mutationFn: async (id: number) => {
      return api.post("/shopping_list_items/delete", { id });
    },
    onSuccess: invalidateAll,
  });

  const toggleBought = useMutation({
    mutationFn: async (id: number) => {
      return api.post("/shopping_list_items/toggle", { id });
    },
    onSuccess: invalidateAll,
  });

  return { addItem, deleteItem, toggleBought };
}

export function useAddShoppingItem() {
  return useShoppingMutations().addItem;
}
