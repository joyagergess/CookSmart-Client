import { useQuery } from "@tanstack/react-query";
import { useHousehold } from "../context/HouseHoldContext";
import api from "../api/axios";

export function useHouseholdMembers() {
  const { householdId } = useHousehold();

  return useQuery({
    queryKey: ["householdMembers", householdId],
    queryFn: async () => {
      const res = await api.get(`/household_members/list/${householdId}`);
      return res.data.payload;
    }
  });
}
