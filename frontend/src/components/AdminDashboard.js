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

 useEffect(() => {

  const fetchData = () => {
    fetch("http://university-maintenance-portal.onrender.com/api/complaint/all")
      .then(res => res.json())
      .then(data => {
        const pending = data.filter(c => c.status === "Pending").length;
        const inProgress = data.filter(c => c.status === "In Progress").length;
        const completed = data.filter(c => c.status === "Completed").length;

        setStats({ pending, inProgress, completed });
      });
  };

  fetchData();

  const interval = setInterval(fetchData, 5000);

  return () => clearInterval(interval);

}, []);

  const chartData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        data: [stats.pending, stats.inProgress, stats.completed],
        backgroundColor: [
          "#f39c12",
          "#3498db",
          "#2ecc71"
        ]
      }
    ]
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>Admin Dashboard</h2>

      <div style={{ width: "400px", margin: "0 auto" }}>
        <Pie data={chartData} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <p>Total Complaints: {stats.pending + stats.inProgress + stats.completed}</p>
      </div>
    </div>
  );
}

export default AdminDashboard;