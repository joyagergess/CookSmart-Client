import React from "react";
import styles from "../styles/Admin.module.css";

import { useAdminUsers } from "../hooks/useAdminUsers";
import { useAdminHouseholds } from "../hooks/useAdminHouseholds";
import { useAdminMembers } from "../hooks/useAdminMembers";

import type { AdminUser, AdminHousehold, AdminMember } from "../types/admin";

export default function AdminPage() {
  const { usersQuery, deleteUser } = useAdminUsers();
  const { householdsQuery, deleteHousehold } = useAdminHouseholds();
  const { membersQuery, deleteMember } = useAdminMembers();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CookSmart Admin</h1>

   
      <Section title="User Management">
        {usersQuery.isLoading && <p>Loading users...</p>}
        {usersQuery.data && (
          <Table<AdminUser>
            columns={["ID", "User Type", "Name", "Email", "Created", "Updated", "Actions"]}
            data={usersQuery.data}
            renderRow={(u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.user_type_id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>{u.updated_at}</td>
                <td>
                  <button className={styles.deleteBtn} onClick={() => deleteUser(u.id)}>
                    delete
                  </button>
                </td>
              </tr>
            )}
          />
        )}
      </Section>

    
      <Section title="Household Management">
        {householdsQuery.isLoading && <p>Loading households...</p>}
        {householdsQuery.data && (
          <Table<AdminHousehold>
            columns={["ID", "Name", "Invite Code", "Created", "Actions"]}
            data={householdsQuery.data}
            renderRow={(h) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.name}</td>
                <td>{h.invite_code}</td>
                <td>{h.created_at}</td>
                <td>
                  <button className={styles.deleteBtn} onClick={() => deleteHousehold(h.id)}>
                    delete
                  </button>
                </td>
              </tr>
            )}
          />
        )}
      </Section>

      <Section title="Household Members">
        {membersQuery.isLoading && <p>Loading members...</p>}
        {membersQuery.data && (
          <Table<AdminMember>
            columns={["ID", "Household ID", "User ID", "Joined", "Actions"]}
            data={membersQuery.data}
            renderRow={(m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.household_id}</td>
                <td>{m.user_id}</td>
                <td>{m.joined_at}</td>
                <td>
                  <button className={styles.deleteBtn} onClick={() => deleteMember(m.id)}>
                    delete
                  </button>
                </td>
              </tr>
            )}
          />
        )}
      </Section>
    </div>
  );
}



interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ color: "#4CAF50" }}>{title}</h2>
      {children}
    </div>
  );
}

interface TableProps<T> {
  columns: string[];
  data: T[];
  renderRow: (row: T) => React.ReactNode;
}

function Table<T>({ columns, data, renderRow }: TableProps<T>) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map(renderRow)}</tbody>
      </table>
    </div>
  );
}

