import Footer from "../../components/Footer";
import Header from "../../components/Header";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import {
  checkEmailExists,
  checkPhoneExists,
  registerUser,
} from "../../services/authService";

import "./auth.css";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

  const [response, setResponse] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const onFormSubmit = async (formData) => {
    try {
      const res = await registerUser(formData);
      setResponse(res.message);
      reset();
    } catch (error) {
      const data = error.data;

      if (data?.message) {
        setErrorMessage(data.message);
      } else if (data && typeof data === "object") {
        Object.entries(data).forEach(([field, message]) => {
          setError(field, { type: "server", message: message });
        });
      } else {
        setErrorMessage("Something went wrong, Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="auth-form">
        <h2>Register</h2>

        {response && <p style={{ color: "green" }}>{response}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name shouldn't be empty",
                },
                pattern: {
                  value: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
                  message: "Enter a valid name",
                },
              })}
            />
            <span className="validate-error">{errors.name?.message}</span>
          </div>
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
                validate: {
                  notAdmin: (fieldValue) => {
                    return (
                      !fieldValue.toLowerCase().startsWith("admin") ||
                      "Email can't have the word 'admin'"
                    );
                  },
                  emailEsists: async (fieldValue) => {
                    const data = await checkEmailExists(fieldValue);
                    return !data || "Email already exists";
                  },
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
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                  message:
                    "Password must contain at least one(lowercase, uppercase, digit, special character(@$!%*?&#)), total 8 characters(minimum)",
                },
              })}
            />
            <span className="validate-error">{errors.password?.message}</span>
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Phone shouldn't be empty",
                },
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10 digits no",
                },
                validate: {
                  phoneExists: async (fieldValue) => {
                    const data = await checkPhoneExists(fieldValue);
                    return !data || "Phone number already exists";
                  },
                },
              })}
            />
            <span className="validate-error">{errors.phone?.message}</span>
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
