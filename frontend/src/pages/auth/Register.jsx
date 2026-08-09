import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import "./auth.css";
import { registerUser } from "../../services/authService";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

function Register() {
  const { register, handleSubmit, reset } = useForm();

  const [response, setResponse] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const onFormSubmit = async (formData) => {
    try {
      const res = await registerUser(formData);
      setResponse(res.message);
      reset();
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

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" {...register("name")} required />
          </div>
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
          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" {...register("phone")} required />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>
          Already have an account?<Link to="/login">Login</Link>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Register;
