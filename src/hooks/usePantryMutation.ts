import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { useHousehold } from "../context/HouseHoldContext";

export function usePantryMutations() {
  const { householdId } = useHousehold();
  const queryClient = useQueryClient();


  const increase = useMutation({
    mutationFn: async (id: number) => {
      return api.post("/pantry/increase", { id, amount: 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pantry", householdId],
      });
    },
  });


  const decrease = useMutation({
    mutationFn: async (id: number) => {
      return api.post("/pantry/decrease", { id, amount: 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pantry", householdId],
      });
    },
  });

 
  const updateQuantity = useMutation({
    mutationFn: async ({
      id,
      newQuantity,
      oldQuantity,
    }: {
      id: number;
      newQuantity: number;
      oldQuantity: number;
    }) => {
      const diff = newQuantity - oldQuantity;

      if (diff > 0) {
        return api.post("/pantry/increase", { id, amount: diff });
      } else if (diff < 0) {
        return api.post("/pantry/decrease", {
          id,
          amount: Math.abs(diff),
        });
      }

      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pantry", householdId],
      });
    },
  });
  
const addItem = useMutation({
  mutationFn: async (data: any) => {
    const id = data.id ? data.id : "add";  
    return api.post(`/pantry/add_update/${id}`, data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["pantry", householdId] });
  },
});


const deleteItem = useMutation({
  mutationFn: async (id: number) => {
    return api.post("/pantry/delete", { id });
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["pantry", householdId],
    });
  },
});

  return { increase, decrease, updateQuantity, addItem ,deleteItem};
}
