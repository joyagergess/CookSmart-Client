import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { useHousehold } from "../context/HouseHoldContext";

export function useExpenseMutations() {
  const qc = useQueryClient();
  const { householdId } = useHousehold();

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["expenses", householdId] });

  const addExpense = useMutation({
    mutationFn: async (data: any) => {
      return api.post(`/expenses/add_update/add`, data);
    },
    onSuccess: invalidate,
  });

  const deleteExpense = useMutation({
    mutationFn: async (id: number) => {
      return api.post("/expenses/delete", { id });
    },
    onSuccess: invalidate,
  });

  return { addExpense, deleteExpense };
}
