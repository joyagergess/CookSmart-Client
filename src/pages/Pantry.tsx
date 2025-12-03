
import { useState } from "react";
import Sidebar from "../components/SideBar";
import { useHousehold } from "../context/HouseHoldContext";
import { usePantry } from "../hooks/usePantry";
import { usePantryMutations } from "../hooks/usePantryMutation";
import ExpiryTag from "../components/ExpiryTag";
import styles from "../styles/Pantry.module.css";
import AddIngredientModal from "../components/AddIngredientModal";
import EditPantryModal from "../components/EditPantryModal";


export default function Pantry() {
  const [showEditModal, setShowEditModal] = useState(false);
const [editingItem, setEditingItem] = useState<any>(null);


  const { householdId, loading: householdLoading } = useHousehold();
  const { data, isLoading, isError } = usePantry();
  const { deleteItem,increase, decrease, updateQuantity } = usePantryMutations();

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState(0);

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditValue(item.quantity);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveQuantity = (item: any) => {
    updateQuantity.mutate({
      id: item.id,
      newQuantity: editValue,
      oldQuantity: item.quantity,
    });

    setEditingId(null);
  };

  if (householdLoading)
    return <div className={styles.loading}>Loading user info...</div>;

  if (!householdId)
    return <div className={styles.loading}>Join or create a household first</div>;

  if (isLoading) return <div className={styles.loading}>Loading pantry...</div>;

  if (isError) return <div className={styles.error}>Failed to load pantry</div>;

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Pantry</h1>

          <div className={styles.actions}>
          

            <button
              className={styles.addBtn}
              onClick={() => setShowModal(true)}
            >
              + Add
            </button>
          </div>
        </div>

        <div className={styles.list}>
          {data?.map((item: any) => (
            <div className={styles.card} key={item.id}>
              <span className={styles.itemName}>
                {item.ingredient.name}
              </span>

              <div className={styles.controls}>
                <button
                  className={styles.circleBtn}
                  onClick={() => decrease.mutate(item.id)}
                >
                  -
                </button>

                {editingId === item.id ? (
                  <input
                    type="number"
                    className={styles.quantityInput}
                    value={editValue}
                    autoFocus
                    onChange={(e) => setEditValue(parseInt(e.target.value))}
                    onBlur={() => saveQuantity(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveQuantity(item);
                      if (e.key === "Escape") cancelEdit();
                    }}
                    style={{ width: "60px", textAlign: "center" }}
                  />
                ) : (
                  <span
                    className={styles.quantity}
                    onClick={() => startEdit(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.quantity} {item.unit}
                  </span>
                )}

                <button
                  className={styles.circleBtn}
                  onClick={() => increase.mutate(item.id)}
                >
                  +
                </button>

                <ExpiryTag expiryDate={item.expiry_date} />
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteItem.mutate(item.id)}
                >
                  🗑️
                </button>
                <button
                className={styles.deleteBtn}
                 onClick={() => {
                 setEditingItem(item);
                 setShowEditModal(true);
                  }}
                 >
                📝

                 </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <AddIngredientModal onClose={() => setShowModal(false)} />
      )}
      {showEditModal && (
     <EditPantryModal 
    item={editingItem}
    onClose={() => setShowEditModal(false)}
  />
)}

    </div>
  );
}
