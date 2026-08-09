import Footer from "../../components/Footer";
import Header from "../../components/Header";

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../../services/authService";
import "./auth.css";

import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, reset } = useForm();

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const onFormSubmit = async (credentials) => {
    try {
      const response = await loginUser(credentials);

      const { token, role } = response.data;

      localStorage.setItem("token", token);

      reset();

      if (role === "ADMIN") {
        navigate("/admin-profile");
      } else if (role === "CUSTOMER") {
        navigate("/profile");
      } else {
        navigate("/emp-profile");
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="auth-form">
        <h2>Login</h2>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email")} required />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          New to EduTrack? <Link to="/register">Register</Link>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Login;
