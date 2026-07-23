import Footer from "../../components/Footer";
import Header from "../../components/Header";

import { useState } from "react";
import { loginUser } from "../../services/authService";
import "./auth.css";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(credentials);

      const { token, role } = response.data;

      localStorage.setItem("token", token);

      if (role === "ADMIN") {
        navigate("/admin-profile");
      } else if (role === "CUSTOMER") {
        navigate("/profile");
      } else {
        navigate("/emp-profile");
      }

      setCredentials({
        email: "",
        password: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />

      <div className="auth-form">
        <h2>Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <p>
          New to EduTrack? <a href="/register">Register</a>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Login;
