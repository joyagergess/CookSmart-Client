import { useState } from "react";
import { useExpenseMutations } from "../hooks/useExpenseMutations";
import { useHousehold } from "../context/HouseHoldContext";

import styles from "../styles/AddExpenseModal.module.css";

interface Props {
  weekStart: string;
  onClose: () => void;
}

export default function AddExpenseModal({ onClose }: Props) {
  const { householdId } = useHousehold();
  const { addExpense } = useExpenseMutations();

  const [store, setStore] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [receipt_url, setReceiptUrl] = useState("");

  function submit() {
    addExpense.mutate({
      household_id: householdId,
      store,
      date,
      amount,
      receipt_url,
    });

    onClose();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Add expenses</h2>

        <div className={styles.formGroup}>
          <label>Store name</label>
          <input value={store} onChange={(e) => setStore(e.target.value)} placeholder="Enter store name" />
        </div>

       <div className={styles.formGroup}>
      <label>Date</label>
       <input
         type="date"
         value={date}
         onChange={(e) => setDate(e.target.value)}
          required
          />
         </div>


        <div className={styles.formGroup}>
          <label>Price</label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter price in $" />
        </div>

       <div className={styles.formGroup}>
      <label>Receipt URL</label>
      <input
       type="url"
       value={receipt_url}
       onChange={(e) => setReceiptUrl(e.target.value)}
       placeholder="Paste an image URL (e.g. https://...)"
      />
      </div>

        <button className={styles.addButton} onClick={submit}>
          + Add expenses
        </button>

        <button className={styles.closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
