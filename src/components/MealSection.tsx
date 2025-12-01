import type { MealPlanEntry } from "../types/mealPlan.types";
import styles from "../styles/MealSection.module.css";

interface Props {
  title: string;
  entries: MealPlanEntry[];
  onAdd: () => void;
  onDelete: (id: number) => void;
}

export function MealSection({ title, entries, onAdd, onDelete }: Props) {
  return (
    <div className={styles.section}>
      <h3 className={styles.header}>{title}</h3>

      <div className={styles.list}>
        {entries.map((entry) => (
          <div className={styles.card} key={entry.id}>
            <span>{entry.recipe ? entry.recipe.title : "No recipe"}</span>
            <button className={styles.deleteBtn} onClick={() => onDelete(entry.id)}>
              🗑
            </button>
          </div>
        ))}
      </div>

      <button className={styles.addBtn} onClick={onAdd}>
        + Add {title}
      </button>
    </div>
  );
}
