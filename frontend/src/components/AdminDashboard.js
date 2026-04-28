import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {

  const [stats, setStats] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0
  });

  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA
  useEffect(() => {

    const fetchData = () => {
      fetch("https://university-maintenance-portal.onrender.com/api/complaint/all")
        .then(res => res.json())
        .then(data => {

          setComplaints(data);

          const pending = data.filter(c => c.status === "Pending").length;
          const inProgress = data.filter(c => c.status === "In Progress").length;
          const completed = data.filter(c => c.status === "Completed").length;

          setStats({ pending, inProgress, completed });
          setLoading(false);
        });

      // 👉 staff list fetch (IMPORTANT)
      fetch("https://university-maintenance-portal.onrender.com/api/auth/all")
        .then(res => res.json())
        .then(users => {
          const staff = users.filter(u => u.role === "staff");
          setStaffList(staff);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);

  }, []);

  // 🔥 ASSIGN STAFF
  const assignStaff = (complaintId, staffId) => {
    fetch(`https://university-maintenance-portal.onrender.com/api/complaint/assign/${complaintId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ staffId })
    }).then(() => {
      alert("Staff Assigned!");
      window.location.reload();
    });
  };

  const chartData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        data: [stats.pending, stats.inProgress, stats.completed],
        backgroundColor: ["#f39c12", "#3498db", "#2ecc71"]
      }
    ]
  };

  return (
    <div style={{ padding: "30px" }}>

      <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* 🔥 CHART */}
          <div style={{ width: "300px", margin: "0 auto" }}>
            <Pie data={chartData} />
          </div>

          {/* 🔥 STATS */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px"
          }}>
            <div>🟡 Pending: {stats.pending}</div>
            <div>🔵 In Progress: {stats.inProgress}</div>
            <div>🟢 Completed: {stats.completed}</div>
          </div>

          {/* 🔥 COMPLAINT LIST */}
          <h3 style={{ marginTop: "30px" }}>All Complaints</h3>

          {complaints.map(item => (
            <div key={item._id} style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px"
            }}>

              <p><b>Status:</b> {item.status}</p>
              <p><b>Priority:</b> {item.priority}</p>
              <p><b>Description:</b> {item.description}</p>
              <p><b>Location:</b> {item.location}</p>

              {/* 🔥 Assigned Staff */}
              <p>
                <b>Assigned Staff:</b>{" "}
                {item.assignedStaff
                  ? item.assignedStaff.name
                  : "Not Assigned"}
              </p>

              {/* 🔥 Assign Dropdown */}
              <select
                onChange={(e) =>
                  assignStaff(item._id, e.target.value)
                }
              >
                <option value="">Assign Staff</option>
                {staffList.map(staff => (
                  <option key={staff._id} value={staff._id}>
                    {staff.name}
                  </option>
                ))}
              </select>

            </div>
          ))}

        </>
      )}

    </div>
  );
}

export default AdminDashboard;