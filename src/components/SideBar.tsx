import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import { useAuth } from "../context/AuthContext";
import { useHouseholdInfo } from "../hooks/useHouseholdInfo";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { data: household } = useHouseholdInfo(); 

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>CookSmart</h2>

      {household && (
        <p className={styles.householdName}>
          {household.name}
        </p>
      )}

     <ul className={styles.menu}>
  <li>
    <Link to="/pantry">
      <span className={styles.icon}>📦</span> Pantry
    </Link>
  </li>
  <li>
    <Link to="/recipes">
      <span className={styles.icon}>📘</span> Recipes
    </Link>
  </li>
  <li>
    <Link to="/meal">
      <span className={styles.icon}>🥗</span> Meal Plan
    </Link>
  </li>
  <li>
    <Link to="/shoppingList">
      <span className={styles.icon}>🛒</span> Shopping List
    </Link>
  </li>
  <li>
    <Link to="/expenses">
      <span className={styles.icon}>💲</span> Expenses
    </Link>
  </li>
  <li>
    <Link to="/ai">
      <span className={styles.icon}>✨</span> AI Assistant
    </Link>
  </li>
  <li>
    <Link to="/settings">
      <span className={styles.icon}>⚙</span> Settings
    </Link>
  </li>
</ul>

      <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
    </div>
  );
}
