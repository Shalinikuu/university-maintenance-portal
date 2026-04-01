import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      const response = await fetch(
        "https://university-maintenance-portal.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);
        localStorage.setItem("userId", data.userId);

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

    <div style={{
      backgroundImage: "url('/bg.jpg')",
      height: "100vh",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div style={{
        background: "rgba(255, 255, 255, 0.85)",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        textAlign: "center",
        width: "300px"
      }}>

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
        <br /><br />

        <button 
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;