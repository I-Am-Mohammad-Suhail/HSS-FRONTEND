import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      setError("All fields are required");
      return;
    }

    // TEMP LOGIN (backend ke bina test ke liye)
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("role", role);

    if (role === "ADMIN") navigate("/admin");
    if (role === "DOCTOR") navigate("/doctor");
    if (role === "NURSE") navigate("/nurse");
    if (role === "RECEPTIONIST") navigate("/reception");
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>CityCare Hospital</h2>
        <p>Secure Hospital Management Login</p>

        {error && <div className="error">{error}</div>}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="ADMIN">Admin</option>
          <option value="DOCTOR">Doctor</option>
          <option value="NURSE">Nurse</option>
          <option value="RECEPTIONIST">Receptionist</option>
        </select>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}