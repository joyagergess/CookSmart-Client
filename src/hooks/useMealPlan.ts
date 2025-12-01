import { useQuery } from "@tanstack/react-query";
import { useHousehold} from "../context/HouseHoldContext";
import api from "../api/axios";

export function useMealPlan(weekStart:string){
    const {householdId}=useHousehold();
    
  return useQuery({
    queryKey:["MealPlan",householdId],
    queryFn: async ()=>{
        if (!householdId)return[];
        const res= await api.post(`/meal_plan/get_or_create`,{
            household_id:householdId,
            week_start_date: weekStart
        }
        );
        return res.data.payload;
    },
    enabled:!!householdId
  })

  }

