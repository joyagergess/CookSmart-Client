import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type { ExpiryItem } from "../types/ExpiryItem";

export function useExpiryDashboard(householdId?: number) {
  return useQuery<ExpiryItem[]>({
    queryKey: ["expiry-dashboard", householdId],
    enabled: !!householdId,
    queryFn: async () => {
      const res = await api.get(`/expiry-dashboard/${householdId}`);
      return res.data.payload as ExpiryItem[];
    }
  });
}
