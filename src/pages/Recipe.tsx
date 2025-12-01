import { useState } from "react";
import Sidebar from "../components/SideBar";
import { useRecipes } from "../hooks/useRecipes";
import AddRecipeModal from "../components/AddRecipeModal";
import ViewRecipeModal from "../components/ViewRecipeModal";
import type { Recipe } from "../types/Recipe";
import styles from "../styles/RecipesPage.module.css";
import { useRecipeMutations } from "../hooks/useRecipeMutations";

export default function RecipesPage() {
  const { data: recipes } = useRecipes();

  const [showAdd, setShowAdd] = useState(false);
  const [viewRecipe, setViewRecipe] = useState<Recipe | null>(null);

  const { deleteRecipe } = useRecipeMutations();

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this recipe?")) return;
    await deleteRecipe.mutateAsync(id);
  }

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>
        <div className={styles.header}>
          <h1>Recipes</h1>
          <button className={styles.addBtn} onClick={() => setShowAdd(true)}>
            + Add
          </button>
        </div>

        <div className={styles.list}>
          {recipes?.map((r) => (
            <div key={r.id} className={styles.card}>
              
              
              <div className={styles.cardInfo}>
                <h3>{r.title}</h3>
                <p className={styles.createdText}>
                  Created: {new Date(r.created_at || "").toDateString()}
                </p>
              </div>

           
              <div className={styles.cardActions}>
                <button
                  className={styles.viewBtn}
                  onClick={() => setViewRecipe(r)}
                >
                  View
                </button>

                <button
                  className={styles.deleteIconBtn}
                  onClick={() => handleDelete(r.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAdd && <AddRecipeModal onClose={() => setShowAdd(false)} />}
      {viewRecipe && (
        <ViewRecipeModal
          recipe={viewRecipe}
          onClose={() => setViewRecipe(null)}
        />
      )}
    </div>
  );
}
