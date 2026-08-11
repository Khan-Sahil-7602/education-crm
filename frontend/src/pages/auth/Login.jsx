import Footer from "../../components/Footer";
import Header from "../../components/Header";

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../../services/authService";
import "./auth.css";

import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm();

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const onFormSubmit = async (credentials) => {
    setErrorMsg("");

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
      const data = error.data;

      if (data?.message) {
        setErrorMsg(data.message);
      } else if (data && typeof data === "object") {
        Object.entries(data).forEach(([field, message]) => {
          setError(field, { type: "server", message: message });
        });
      } else {
        setErrorMsg("Something went wrong, Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="auth-form">
        <h2>Login</h2>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email shouldn't be empty",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            <span className="validate-error">{errors.email?.message}</span>
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password shouldn't be empty",
                },
              })}
            />
            <span className="validate-error">{errors.password?.message}</span>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
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
