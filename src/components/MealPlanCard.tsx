import { useMealPlanMutations } from "../hooks/useMealPlanMutations";
import styles from "../styles/MealPlanPage.module.css";

interface MealPlanCardProps {
  entry: {
    id: number;
    recipe: { title: string };
  };
  mealPlanId: number;
}

export default function MealPlanCard({ entry }: MealPlanCardProps) {
  const { removeEntry } = useMealPlanMutations();

  return (
    <div className={styles.entryCard}>
      <span>{entry.recipe.title}</span>

      <button
        className={styles.deleteBtn}
        onClick={() => removeEntry.mutate({ id: entry.id })}
      >
        🗑️
      </button>
    </div>
  );
}
