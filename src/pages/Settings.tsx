import Sidebar from "../components/SideBar";
import { useHouseholdInfo } from "../hooks/useHouseholdInfo";
import { useHouseholdMembers } from "../hooks/useHouseholdMembers";
import { useUpdateHousehold } from "../hooks/useUpdateHousehold";

import { useState, useEffect } from "react";
import styles from "../styles/Settings.module.css";

export default function Settings() {
  const { data: household } = useHouseholdInfo();
  const { data: members } = useHouseholdMembers();
  const updateHousehold = useUpdateHousehold();

  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    if (household) {
      setName(household.name);
      setInviteCode(household.invite_code);
    }
  }, [household]);

  function handleSave() {
  updateHousehold.mutate({
    id: household.id,
    name,
    invite_code: inviteCode
  });
}


  function regenerateCode() {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteCode(newCode);
  }

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.page}>
        <h1 className={styles.title}>Settings</h1>

        <div className={styles.card}>
          <h3>Household Information</h3>

          <label>Name</label>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Invite Code</label>
          <div className={styles.inviteRow}>
            <input
              className={styles.input}
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />
            <button className={styles.smallBtn} onClick={regenerateCode}>
              Regenerate
            </button>
          </div>

          <button
           className={styles.saveBtn}
           onClick={handleSave}
           disabled={updateHousehold.isPending}
              >
            {updateHousehold.isPending ? "Saving..." : "Save changes"}
            </button>

        </div>

        <div className={styles.card}>
          <h3>Household Members</h3>

          {members?.map((m: any) => (
            <div key={m.id} className={styles.member}>
              <p>{m.user.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
