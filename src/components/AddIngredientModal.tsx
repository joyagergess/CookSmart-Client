import { useState } from "react";
import { useHousehold } from "../context/HouseHoldContext";
import { usePantryMutations } from "../hooks/usePantryMutation";
import styles from "../styles/Modal.module.css";

export default function AddIngredientModal({ onClose }: { onClose: () => void }) {
  const { householdId } = useHousehold();
  const { addItem } = usePantryMutations();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("g");
  const [expiry, setExpiry] = useState("");

  const handleAdd = () => {
    addItem.mutate(
      {
        ingredient_name: name,
        household_id: householdId,
        quantity,
        unit,
        expiry_date: expiry,
      },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Add Ingredient</h2>

        <label>Ingredient Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />

        <label>Unit</label>
        <input value={unit} onChange={(e) => setUnit(e.target.value)} />

        <label>Expiry Date</label>
        <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />

        <div className={styles.actions}>
          <button onClick={handleAdd} className={styles.addBtn}>
            Add
          </button>
          <button onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
