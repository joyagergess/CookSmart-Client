import { useState } from "react";
import Sidebar from "../components/SideBar";
import { useShoppingList } from "../hooks/useShoppingList";
import { useShoppingMutations } from "../hooks/useShoppingMutations";
import AddShoppingItemModal from "../components/AddShoppingItemModal";

import styles from "../styles/ShoppingListPage.module.css";

export default function ShoppingListPage() {
  const { data, isLoading, isError } = useShoppingList();
  const { deleteItem, toggleBought } = useShoppingMutations();

  const [showModal, setShowModal] = useState(false);

  if (isLoading) return <div className={styles.loading}>Loading…</div>;
  if (isError || !data) return <div className={styles.error}>Failed to load</div>;

  const shoppingListId = data.id;

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Shopping List</h1>

          <button className={styles.addBtn} onClick={() => setShowModal(true)}>
            + Add Item
          </button>
        </div>

        <div className={styles.list}>
            <h3>Mark items as bought</h3>
          {(data.items || []).map((item: any) => (
            <div key={item.id} className={styles.card}>
              <div
                className={`${styles.circle} ${item.is_bought ? styles.checked : ""}`}
                onClick={() => toggleBought.mutate(item.id)}
              >
                {item.is_bought ? "✓" : ""}
              </div>

              <span className={styles.itemName}>{item.ingredient.name}</span>

              <span className={styles.qty}>
                {item.quantity_needed} {item.unit}
              </span>

              <button
                className={styles.deleteBtn}
                onClick={() => deleteItem.mutate(item.id)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <AddShoppingItemModal
          shoppingListId={shoppingListId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
