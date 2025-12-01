import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>CookSmart</h2>

      <ul className={styles.menu}>
        <li><Link to="/pantry">📦 Pantry</Link></li>
        <li><Link to="/recipes">📘 Recipes</Link></li>
        <li><Link to="/meal-plan">🥗 Meal Plan</Link></li>
        <li><Link to="/shopping-list">🛒 Shopping List</Link></li>
        <li><Link to="/expenses">💲 Expenses</Link></li>
        <li><Link to="/ai">✨ AI assistant</Link></li>
        <li><Link to="/settings">⚙ Settings</Link></li>
      </ul>

      <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
    </div>
  );
}
