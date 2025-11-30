import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";
import api from "../api/axios";

export default function CreateHousehold() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [invite, setInvite] = useState("");
  const [error, setError] = useState("");

  async function handleCreate() {
    if (!name.trim()) {
      setError("Household name is required.");
      return;
    }

    setError("");

    try {
      const res = await api.post("/household/add_update", {
        name,
        invite_code: invite || null,
      });

      console.log("Household created:", res.data);

        navigate("/dashboard");

    } catch (err) {
      setError("Failed to create household.");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Create Household</h2>

        {error && <p className={styles.error}>{error}</p>}

        <label>Name</label>
        <input
          placeholder="eg. Jojo & Evan"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Invite code (optional)</label>
        <input
          placeholder="eg. A1B2C3"
          value={invite}
          onChange={(e) => setInvite(e.target.value)}
        />

        <button className={styles.btn} onClick={handleCreate}>
          Create Household
        </button>

        <Link to="/JoinHousehold" className={styles.switch}>
          Wanna join a Household? Click Join
        </Link>
      </div>
    </div>
  );
}
