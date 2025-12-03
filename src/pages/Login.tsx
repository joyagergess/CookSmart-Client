import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Auth.module.css";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setError("");

    const ok = await login(email, password);

    if (!ok) {
      setError("Invalid email or password.");
      return;
    }
   if (ok.user_type_id === 1) {
      navigate("/admin");
     return;
    }else{
    navigate("/JoinHouseHold");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Login</h2>

        {error && <p className={styles.error}>{error}</p>}

        <label>Email</label>
        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.btn} onClick={handleLogin} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        <Link to="/signup" className={styles.switch}>
          No account? Signup
        </Link>
      </div>
    </div>
  );
}
