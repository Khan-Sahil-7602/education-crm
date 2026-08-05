import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import "./auth.css";
import { registerUser } from "../../services/authService";

function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "CUSTOMER",
  });

  const [response, setResponse] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(userData);
      setResponse(res.message);
      setUserData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "CUSTOMER",
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Header />

      <div className="auth-form">
        <h2>Register</h2>

        {response && <p style={{ color: "green" }}>{response}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={userData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>

        <p>
          Already have an account?<a href="/login">Login</a>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Register;
