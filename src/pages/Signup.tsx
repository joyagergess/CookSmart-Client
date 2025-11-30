import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Auth.module.css";

export default function Signup() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignup() {
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (name.length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");

    const ok = await register(name, email, password);

    if (!ok) {
      setError("Email already exists or invalid data.");
      return;
    }

    navigate("/JoinHouseHold");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Create Account</h2>

        {error && <p className={styles.error}>{error}</p>}

        <label>Name</label>
        <input
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Create a password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.btn} onClick={handleSignup} disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <Link to="/login" className={styles.switch}>
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
