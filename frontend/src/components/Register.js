import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {

      const response = await fetch(
        "https://university-maintenance-portal.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role: "user"   // 🔥 default role
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registered Successfully ✅");
        navigate("/"); // वापस login
      } else {
        alert(data.message || "Registration failed");
      }

    } catch (error) {
      console.error("Register Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f2f2f2"
    }}>

      <div style={{
        padding: "30px",
        background: "#fff",
        borderRadius: "10px",
        width: "300px",
        textAlign: "center"
      }}>

        <h2>Register</h2>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
        <br /><br />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
        <br /><br />

        <button 
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "10px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Register
        </button>

      </div>
    </div>
  );
}

export default Register;