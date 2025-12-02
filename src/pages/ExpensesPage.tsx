import { useState } from "react";
import Sidebar from "../components/SideBar";
import { WeekSelector } from "../components/WeekSelector";
import  { useExpenses } from "../hooks/useExpenses";
import { useExpenseMutations } from "../hooks/useExpenseMutations";
import  AddExpenseModal from "../components/AddExpenseModal";

import styles from "../styles/ExpensesPage.module.css";
import ReceiptModal from "../components/ReceiptModal";

export default function ExpensesPage() {
const [activeExpense, setActiveExpense] = useState<any | null>(null);

  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    return monday;
  });

  const weekStartStr = weekStart.toISOString().slice(0, 10);

  const { data: expenses, isLoading } = useExpenses(weekStartStr);
  const { deleteExpense } = useExpenseMutations();

  const [showModal, setShowModal] = useState(false);

  if (isLoading)
    return <div className={styles.loading}>Loading expenses...</div>;

  const total = expenses?.reduce((sum: number, e: any) => sum + Number(e.amount), 0) || 0;

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Expenses</h1>

          <button className={styles.addBtn} onClick={() => setShowModal(true)}>
            + Add expenses
          </button>
        </div>

        <WeekSelector weekStart={weekStart} onChange={setWeekStart} />

        <h2 className={styles.total}>Total: ${total.toFixed(2)}</h2>

        <div className={styles.list}>
          {expenses?.map((expense: any) => (
            <div key={expense.id} className={styles.card}>
              <div className={styles.info}>
                <strong>{expense.store}</strong>
                <span>{expense.date}</span>
              </div>

              <span className={styles.amount}>${expense.amount}</span>

              <button
                className={styles.receiptBtn}
               onClick={() => setActiveExpense(expense)}
                  >
                Receipt
               </button>


              <button
                className={styles.deleteBtn}
                onClick={() => deleteExpense.mutate(expense.id)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <AddExpenseModal
          weekStart={weekStartStr}
          onClose={() => setShowModal(false)}
        />
      )}
{activeExpense && (
  <ReceiptModal
    expense={activeExpense}
    onClose={() => setActiveExpense(null)}
  />
)}

    </div>
  );
}
