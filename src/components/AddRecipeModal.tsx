import { useState, useEffect } from "react";
import styles from "../styles/Modal.module.css";
import { useRecipeMutations } from "../hooks/useRecipeMutations";
import { useHousehold } from "../context/HouseHoldContext";
import { getMe } from "../api/me";   

export default function AddRecipeModal({ onClose }: { onClose: () => void }) {
  const { householdId } = useHousehold();
  const { createRecipe, addIngredient } = useRecipeMutations();

  const [userId, setUserId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredientRows, setIngredientRows] = useState([
    { name: "", amount: "", unit: "" },
  ]);

  
  useEffect(() => {
    async function loadUser() {
      const me = await getMe();
      setUserId(me?.id ?? null);
    }
    loadUser();
  }, []);

  const addRow = () => {
    setIngredientRows([...ingredientRows, { name: "", amount: "", unit: "" }]);
  };

  const handleCreate = async () => {
    if (!userId) return; 

    
    const res = await createRecipe.mutateAsync({
      title,
      instructions,
      household_id: householdId,
      created_by: userId,
    });

    const recipeId = res.data.payload.id;

    for (const ing of ingredientRows) {
      if (ing.name.trim()) {
        await addIngredient.mutateAsync({
          recipe_id: recipeId,
          ingredient_name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
        });
      }
    }

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalLarge}>
        <h2>Create New Recipe</h2>

        <label>Recipe Name:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter recipe name"
        />

        <label>Ingredients:</label>
        {ingredientRows.map((row, i) => (
          <div key={i} className={styles.ingredientRow}>
            <input
              placeholder="Ingredient"
              value={row.name}
              onChange={(e) => {
                const updated = [...ingredientRows];
                updated[i].name = e.target.value;
                setIngredientRows(updated);
              }}
            />
            <input
              placeholder="Amount"
              value={row.amount}
              onChange={(e) => {
                const updated = [...ingredientRows];
                updated[i].amount = e.target.value;
                setIngredientRows(updated);
              }}
            />
            <input
              placeholder="Unit"
              value={row.unit}
              onChange={(e) => {
                const updated = [...ingredientRows];
                updated[i].unit = e.target.value;
                setIngredientRows(updated);
              }}
            />
          </div>
        ))}

        <button className={styles.addSmall} onClick={addRow}>
          + add ingredient
        </button>

        <label>Instructions:</label>
        <textarea
          rows={6}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Enter full cooking instructions"
        />

        <button
          className={styles.saveBtn}
          onClick={handleCreate}
          disabled={!userId}
        >
          Save Recipe
        </button>

        <button className={styles.cancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
