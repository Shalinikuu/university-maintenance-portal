import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      const response = await fetch(
        "http://university-maintenance-portal.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await response.json();
      console.log("FULL LOGIN DATA:", data);

      console.log("Login Response:", data);  // 🔥 debugging ke liye

      if (response.ok) {

        // Local storage me save kar rahe hain
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);
        localStorage.setItem("userId", data.userId);

        // 🔥 Role ke hisaab se redirect
        if (data.role === "user") {
          navigate("/user");
        } 
        else if (data.role === "staff") {
          navigate("/staff");
        } 
        else if (data.role === "admin") {
          navigate("/admin");
        }

      } else {
        alert(data.message || "Login failed");
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

    </div>
  );
}

export default Login;