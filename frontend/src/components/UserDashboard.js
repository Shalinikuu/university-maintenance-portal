import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // 🔐 Route Protection
    if (!token || !userId) {
      navigate("/", { replace: true });
      return;
    }

    const fetchData = () => {
      fetch(`http://university-maintenance-portal.onrender.com/api/complaint/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          setComplaints(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);

  }, [navigate]);

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto"
      }}
    >

      <h2 style={{
        marginBottom: "25px",
        fontSize: "26px",
        fontWeight: "600"
      }}>
        Your Complaints
      </h2>

      <button
        onClick={() => navigate("/upload")}
        style={{
          marginBottom: "30px",
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        + New Complaint
      </button>

      {loading ? (
        <p style={{ fontSize: "16px" }}>Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p style={{ fontSize: "16px" }}>No complaints found</p>
      ) : (
        complaints.map((item) => (
          <div
            key={item._id}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "0.2s ease"
            }}
          >

            <p style={{ marginBottom: "8px" }}>
              <b>Status:</b> {item.status}
            </p>

            <p style={{ marginBottom: "8px" }}>
              <b>Priority:</b>{" "}
              <span
                style={{
                  color:
                    item.priority === "High"
                      ? "#dc2626"
                      : item.priority === "Medium"
                      ? "#f59e0b"
                      : "#16a34a",
                  fontWeight: "600"
                }}
              >
                {item.priority}
              </span>
            </p>

            {item.location && (
              <p style={{ marginBottom: "8px" }}>
                <b>Location:</b> {item.location}
              </p>
            )}

            {item.description && (
              <p style={{ marginBottom: "8px" }}>
                <b>Description:</b> {item.description}
              </p>
            )}

            {/* 🔥 NEW: LIVE LOCATION MAP LINK */}
            {item.latitude && item.longitude && (
              <p style={{ marginBottom: "8px" }}>
                <a
                  href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#2563eb",
                    fontWeight: "600",
                    textDecoration: "none"
                  }}
                >
                  📍 View on Google Maps
                </a>
              </p>
            )}

            {item.image && (
              <img
                src={`http://http://university-maintenance-portal.onrender.com/uploads/${item.image}`}
                alt="complaint"
                style={{
                  width: "220px",
                  marginTop: "12px",
                  borderRadius: "8px"
                }}
              />
            )}

          </div>
        ))
      )}

    </div>
  );
}

export default UserDashboard;