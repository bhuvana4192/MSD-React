import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      // Save login status
      localStorage.setItem("isLoggedIn", "true");
      alert(`Welcome, ${email}!`);
      navigate("/"); // ✅ Navigate to home without reload
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <h2>Login to The Homely Spoon</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <div className="toggle">
          Don’t have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
}
