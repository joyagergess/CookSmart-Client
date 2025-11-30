import { Link } from "react-router-dom";
import styles from "../styles/Auth.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Login</h2>

        <label>Email</label>
        <input type="email" placeholder="eg. user@gmail.com" />

        <label>Password</label>
        <input type="password" placeholder="********" />

        <Link to="/signup" className={styles.switch}>
          No account? Signup
        </Link>

        <button className={styles.btn}>Login</button>
      </div>
    </div>
  );
}
