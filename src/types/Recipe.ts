export interface Recipe {
  id: number;
  household_id: number;
  title: string;
  instructions: string;
  created_by: number;
  created_at?: string;
}

export interface RecipeIngredient {
  id: number;
  recipe_id: number;
  ingredient_id: number;
  amount: number;
  unit: string;

  ingredient: {
    name: string;
  };
}
