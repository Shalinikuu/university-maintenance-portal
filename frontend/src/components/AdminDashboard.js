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

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = () => {
      fetch("https://university-maintenance-portal.onrender.com/api/complaint/all")
        .then(res => res.json())
        .then(data => {

          const pending = data.filter(c => c.status === "Pending").length;
          const inProgress = data.filter(c => c.status === "In Progress").length;
          const completed = data.filter(c => c.status === "Completed").length;

          setStats({ pending, inProgress, completed });
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
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
        label: "Complaints",
        data: [stats.pending, stats.inProgress, stats.completed],
        backgroundColor: [
          "#f39c12",
          "#3498db",
          "#2ecc71"
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      
      <h2>Admin Dashboard</h2>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div style={{ width: "350px", margin: "0 auto" }}>
            <Pie data={chartData} options={chartOptions} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <p><b>Pending:</b> {stats.pending}</p>
            <p><b>In Progress:</b> {stats.inProgress}</p>
            <p><b>Completed:</b> {stats.completed}</p>
            <p><b>Total:</b> {stats.pending + stats.inProgress + stats.completed}</p>
          </div>
        </>
      )}

    </div>
  );
}

export default AdminDashboard;