import { useState } from "react";
import Sidebar from "../components/SideBar";
import { WeekSelector } from "../components/WeekSelector";
import { DaySelector } from "../components/DaySelector";
import { MealSection } from "../components/MealSection";
import RecipePickerModal from "../components/RecipePickerModal";

import { useMealPlan } from "../hooks/useMealPlan";
import { useMealPlanEntries } from "../hooks/useMealPlanEntries";
import { useRecipes } from "../hooks/useRecipes";
import { useAddMealEntry } from "../hooks/useAddMealEntry";
import { useRemoveMealEntry } from "../hooks/useRemoveMealEntry";

import styles from "../styles/MealPlanPage.module.css";

export default function MealPlanPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    return monday;
  });

  const [recipeModalOpen, setRecipeModalOpen] = useState(false);
  const [pendingMealType, setPendingMealType] = useState<string | null>(null);

  const weekStartStr = weekStart.toISOString().slice(0, 10);

  const planQuery = useMealPlan(weekStartStr);
  const recipesQuery = useRecipes();
  const planId = planQuery.data?.id;

  const entriesQuery = useMealPlanEntries(planId);

  const addEntry = useAddMealEntry();
  const removeEntry = useRemoveMealEntry();

 

  const entries = entriesQuery.data || [];
  const recipes = recipesQuery.data || [];
  const filtered = entries.filter((e) => e.day_of_week === selectedDay);

  function openAddPopup(mealType: string) {
    setPendingMealType(mealType);
    setRecipeModalOpen(true);
  }

  function handleSelectRecipe(recipeId: number) {
    if (!planId || !pendingMealType) return;

    addEntry.mutate({
      meal_plan_id: planId,
      day_of_week: selectedDay,
      meal_type: pendingMealType,
      recipe_id: recipeId,
    });

    setRecipeModalOpen(false);
    setPendingMealType(null);
  }

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>
        <h1 className={styles.title}>Meal Plan</h1>

        <WeekSelector weekStart={weekStart} onChange={setWeekStart} />

        <DaySelector selected={selectedDay} onChange={setSelectedDay} />

        {["breakfast", "lunch", "dinner"].map((meal) => (
          <MealSection
            key={meal}
            title={meal.toUpperCase()}
            entries={filtered.filter((e) => e.meal_type === meal)}
            onAdd={() => openAddPopup(meal)}
            onDelete={(id) => removeEntry.mutate(id)}
          />
        ))}
      </div>

      {recipeModalOpen && (
        <RecipePickerModal
          recipes={recipes}
          onSelect={handleSelectRecipe}
          onClose={() => setRecipeModalOpen(false)}
        />
      )}
    </div>
  );
}
