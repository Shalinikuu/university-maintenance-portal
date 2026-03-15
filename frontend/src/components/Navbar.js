import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#1f2937",
        color: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
      }}
    >
      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
        onClick={() => navigate("/")}
      >
        Maintenance Portal
      </div>

      <div style={{ display: "flex", gap: "15px" }}>

        {role === "user" && (
          <>
            <button
              onClick={() => navigate("/user")}
              style={{
                background: "#2563eb",
                color: "white",
                borderRadius: "6px"
              }}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/upload")}
              style={{
                background: "#10b981",
                color: "white",
                borderRadius: "6px"
              }}
            >
              New Complaint
            </button>
          </>
        )}

        {role === "staff" && (
          <button
            onClick={() => navigate("/staff")}
            style={{
              background: "#2563eb",
              color: "white",
              borderRadius: "6px"
            }}
          >
            Staff Dashboard
          </button>
        )}

        {role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            style={{
              background: "#2563eb",
              color: "white",
              borderRadius: "6px"
            }}
          >
            Admin Dashboard
          </button>
        )}

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "white",
            borderRadius: "6px"
          }}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;