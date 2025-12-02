import {  useQuery } from "@tanstack/react-query";
import { useHousehold } from "../context/HouseHoldContext";
import api from "../api/axios";

export function useGenerateRecipe(){
    const {householdId}=useHousehold();
    return useQuery({
        
        queryKey:["Ai",householdId],
         enabled: false,
        queryFn:async()=>{
         const res =await api.post("ai/pantry-recipes", { household_id: householdId });
            console.log(res.data.payload);
            return  res.data.payload;
       
        },
      
    })
    
    }
