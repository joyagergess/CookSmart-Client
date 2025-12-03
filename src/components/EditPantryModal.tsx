import { useState } from "react";
import styles from "../styles/EditPantryModal.module.css";
import { usePantryMutations } from "../hooks/usePantryMutation";
import { useHousehold } from "../context/HouseHoldContext";

export default function EditPantryModal({ item, onClose }: any) {
  const { householdId } = useHousehold();
  const { addItem } = usePantryMutations();

  const [name, setName] = useState(item.ingredient.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [unit, setUnit] = useState(item.unit);
  const [expiry, setExpiry] = useState(item.expiry_date?.substring(0, 10));

  const save = () => {
    addItem.mutate({
      id: item.id,
      ingredient_name: name,
      quantity,
      unit,
      expiry_date: expiry,
      household_id: householdId,
    });

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Edit Item</h2>

        <label className={styles.label}>Ingredient Name</label>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className={styles.label}>Quantity</label>
        <input
          type="number"
          className={styles.input}
          value={quantity}
          onChange={(e) => setQuantity(parseFloat(e.target.value))}
        />

        <label className={styles.label}>Unit</label>
        <input
          className={styles.input}
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />

        <label className={styles.label}>Expiry Date</label>
        <input
          type="date"
          className={styles.input}
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.save} onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
