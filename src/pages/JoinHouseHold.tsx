import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";
import api from "../api/axios";
import { useHousehold } from "../context/HouseHoldContext";

export default function JoinHousehold() {
  const { setHouseholdId } = useHousehold();
  const navigate = useNavigate();

  const [invite, setInvite] = useState("");
  const [error, setError] = useState("");
async function handleJoin() {
  if (!invite.trim()) {
    setError("Invite code is required.");
    return;
  }

  setError("");

  try {
    const res = await api.post("/household_members/join", { invite_code: invite });
    const payload = res.data.payload;

    if (payload.error) {
      setError(payload.error);
      return;
    }

    const joinedHouseholdId = payload.payload?.household_id;

    if (!joinedHouseholdId) {
      setError("Could not determine joined household ID.");
      return;
    }

    setHouseholdId(joinedHouseholdId);

    navigate("/Pantry");

  } catch (err) {
    console.error(err);
    setError("Invalid invite code or unable to join.");
  }
}


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Join Household</h2>

        {error && <p className={styles.error}>{error}</p>}

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
