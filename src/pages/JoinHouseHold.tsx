import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";
import api from "../api/axios";

export default function JoinHousehold() {
  const navigate=useNavigate();
  const [invite, setInvite] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handleJoin() {
    if (!invite.trim()) {
      setError("Invite code is required.");
      return;
    }

    setError("");

    try {
      const res = await api.post("/household_members/join", {
        name,
        invite_code: invite,
      });

      console.log("Joined household:", res.data);
        navigate("/dashboard");

      setError("Joined successfully")
     } catch (err) {
      setError("Invalid invite code or unable to join.");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Join Household</h2>

        {error && <p className={styles.error}>{error}</p>}

        <label>Name</label>
        <input
          placeholder="eg. Joya"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Invite code</label>
        <input
          placeholder="eg. A1B2C3"
          value={invite}
          onChange={(e) => setInvite(e.target.value)}
        />

        <button className={styles.btn} onClick={handleJoin}>
          Join Household
        </button>

        <Link to="/CreateHousehold" className={styles.switch}>
          Wanna create a Household? Click Create Household
        </Link>
      </div>
    </div>
  );
}
