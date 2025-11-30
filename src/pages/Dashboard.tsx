import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Dashboard</h1>
      <p>You are logged in.</p>

      <button 
        onClick={handleLogout}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          background: "#00a33d",
          color: "white",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}
