import { useEffect, useState } from "react";

function StaffDashboard() {

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // 🔥 NEW: remarks state per complaint
  const [remarks, setRemarks] = useState({});

  const staffId = localStorage.getItem("userId");

  useEffect(() => {
    // ❗ CHANGE: only assigned complaints
    fetch(`https://university-maintenance-portal.onrender.com/api/complaint/staff/${staffId}`)
      .then(res => res.json())
      .then(data => setComplaints(data));
  }, [staffId]);

  // 🔥 UPDATED: status + remark
  const updateStatus = (id, status) => {

    fetch(`https://university-maintenance-portal.onrender.com/api/complaint/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        remark: remarks[id] || ""
      })
    }).then(() => {
      setComplaints(prev =>
        prev.map(c =>
          c._id === id ? { ...c, status } : c
        )
      );

      alert("Updated successfully!");
    });
  };

  const getStatusColor = (status) => {
    if (status === "Pending") return "#facc15";
    if (status === "In Progress") return "#3b82f6";
    if (status === "Completed") return "#22c55e";
    return "#6b7280";
  };

  const getPriorityColor = (priority) => {
    if (priority === "High") return "#ef4444";
    if (priority === "Medium") return "#f59e0b";
    if (priority === "Low") return "#16a34a";
    return "#6b7280";
  };

  const filteredComplaints = complaints.filter(item => {
    const matchSearch =
      item.location?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || item.status === statusFilter;

    const matchPriority =
      priorityFilter === "All" || item.priority === priorityFilter;

    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div style={{
      padding: "40px",
      background: "linear-gradient(to right, #eef2ff, #f8fafc)",
      minHeight: "100vh"
    }}>

      <h2 style={{ marginBottom: "25px" }}>
        Staff Dashboard
      </h2>

      {/* 🔍 FILTERS (UNCHANGED) */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        display: "flex",
        gap: "15px",
        flexWrap: "wrap"
      }}>

        <input
          placeholder="Search by location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

      </div>

      {/* 🔥 COMPLAINT LIST */}
      {filteredComplaints.map(item => (
        <div key={item._id} style={{
          background: "white",
          borderRadius: "15px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
        }}>

          <div style={{ marginBottom: "10px" }}>
            <span style={{
              background: getStatusColor(item.status),
              color: "white",
              padding: "5px 12px",
              borderRadius: "20px",
              fontSize: "12px"
            }}>
              {item.status}
            </span>
          </div>

          <p>
            <b>Priority:</b>{" "}
            <span style={{
              color: getPriorityColor(item.priority),
              fontWeight: "600"
            }}>
              {item.priority}
            </span>
          </p>

          <p><b>Description:</b> {item.description}</p>
          <p><b>Location:</b> {item.location}</p>

          {item.latitude && item.longitude && (
            <p>
              <a
                href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                target="_blank"
                rel="noreferrer"
              >
                📍 View Live Location
              </a>
            </p>
          )}

          {item.image && (
            <img
              src={`https://university-maintenance-portal.onrender.com/uploads/${item.image}`}
              width="200"
              alt="complaint"
              style={{ borderRadius: "10px" }}
            />
          )}

          {/* 🔥 NEW: Remark Input */}
          <div style={{ marginTop: "10px" }}>
            <input
              placeholder="Add remark..."
              style={{ padding: "5px", width: "200px" }}
              onChange={(e) =>
                setRemarks(prev => ({
                  ...prev,
                  [item._id]: e.target.value
                }))
              }
            />
          </div>

          {/* 🔥 BUTTONS */}
          <div style={{ marginTop: "15px" }}>
            <button
              onClick={() => updateStatus(item._id, "In Progress")}
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
                marginRight: "10px"
              }}
            >
              In Progress
            </button>

            <button
              onClick={() => updateStatus(item._id, "Completed")}
              style={{
                background: "#22c55e",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px"
              }}
            >
              Completed
            </button>
          </div>

        </div>
      ))}

    </div>
  );
}

export default StaffDashboard;