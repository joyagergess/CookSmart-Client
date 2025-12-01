import type { Recipe } from "./Recipe";

export interface MealPlan {
  id: number;
  household_id: number;
  week_start_date: string;
}

export interface MealPlanEntry {
  id: number;
  meal_plan_id: number;
  day_of_week: number; 
  meal_type: "breakfast" | "lunch" | "dinner";
  recipe_id: number | null;
  recipe: Recipe | null;
}

export interface CreateEntryInput {
  meal_plan_id: number;
  day_of_week: number;
  meal_type: string;
  recipe_id: number;
}
