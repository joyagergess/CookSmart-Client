import { useState } from "react";
import { useAddShoppingItem } from "../hooks/useShoppingMutations";
import styles from "../styles/AddShoppingItemModal.module.css";

interface Props {
  onClose: () => void;
  shoppingListId: number;
}

export default function AddShoppingItemModal({ onClose, shoppingListId }: Props) {
  const addItem = useAddShoppingItem();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  function submit() {
    if (!name.trim()) return alert("Ingredient name required");

    addItem.mutate({
      ingredient_name: name,
      shopping_list_id: shoppingListId,
      quantity_needed: quantity,
      unit: unit,
    });

    onClose();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Add item to Shopping List</h2>

        <div className={styles.formGroup}>
          <label>Ingredient name :</label>
          <input
            type="text"
            placeholder="Enter ingredient name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Quantity :</label>
          <input
            type="text"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Unit :</label>
          <input
            type="text"
            placeholder="kg, g, L, pieces…"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>

        <button className={styles.addButton} onClick={submit}>
          + Add Item
        </button>

        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
