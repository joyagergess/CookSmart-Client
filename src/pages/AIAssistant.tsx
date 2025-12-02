import Sidebar from "../components/Sidebar";
import styles from "../styles/AIAssistant.module.css";

export default function AIAssistant() {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.page}>
        <h1 className={styles.title}>AI Assistant</h1>
        <p className={styles.subtitle}>
          Let CookSmart help you decide faster and waste less.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Cook from my pantry</h3>
            <p>Get recipe ideas using only what you already have at home</p>
            <button>Generate recipes</button>
          </div>

          <div className={styles.card}>
            <h3>Smart substitutions</h3>
            <p>Missing an ingredient? get instant alternatives</p>
            <button>Generate missing ingredients</button>
          </div>

          <div className={styles.card}>
            <h3>Weekly summary</h3>
            <p>See how you performed this week: spending, waste & planning</p>
            <button>Generate summary</button>
          </div>

          <div className={styles.card}>
            <h3>AI meal plans</h3>
            <p>Let AI create a full week of meal plans using your pantry & preferences</p>
            <button>Generate plan</button>
          </div>
        </div>
      </div>
    </div>
  );
}
