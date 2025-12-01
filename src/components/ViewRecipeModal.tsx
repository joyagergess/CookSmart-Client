import styles from "../styles/Modal.module.css";
import { useRecipeIngredients } from "../hooks/useRecipeIngredients";
import type { Recipe } from "../types/Recipe";

export default function ViewRecipeModal({
  recipe,
  onClose,
}: {
  recipe: Recipe;
  onClose: () => void;
}) {
  const { data: ingredients } = useRecipeIngredients(recipe.id);

  return (
    <div className={styles.overlay}>
      <div className={styles.modalLarge}>
        <h2>{recipe.title}</h2>

        <h3>Ingredients</h3>
        <ul>
          {ingredients?.map((i) => (
            <li key={i.id}>
              {i.ingredient.name} {i.amount} {i.unit}
            </li>
          ))}
        </ul>

        <h3>Instructions</h3>
        <p>{recipe.instructions}</p>

        <button className={styles.cancelBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
