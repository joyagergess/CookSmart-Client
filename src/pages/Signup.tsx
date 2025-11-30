import { Link } from "react-router-dom";
import styles from "../styles/Auth.module.css";

export default function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Create an Account</h2>

        <label>Name</label>
        <input type="text" placeholder="Enter your name" />

        <label>Email</label>
        <input type="email" placeholder="eg. user@gmail.com" />

        <label>Password</label>
        <input type="password" placeholder="Create a password" />

        <label>Confirm Password</label>
        <input type="password" placeholder="Re-enter your password" />

        <button className={styles.btn}>Sign Up</button>

        <Link to="/login" className={styles.switch}>
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
