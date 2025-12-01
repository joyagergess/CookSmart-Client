import type { Recipe } from "../types/Recipe.ts";
import styles from "../styles/RecipePickerModal.module.css";

interface Props {
  recipes: Recipe[];
  onSelect: (recipeId: number) => void;
  onClose: () => void;
}

export default function RecipePickerModal({ recipes, onSelect, onClose }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Select a Recipe</h2>

        <div className={styles.list}>
          {recipes.map((recipe) => (
            <button
              key={recipe.id}
              className={styles.recipeBtn}
              onClick={() => onSelect(recipe.id)}
            >
              {recipe.title}
            </button>
          ))}
        </div>

        <button className={styles.closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
