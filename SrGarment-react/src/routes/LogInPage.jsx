import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Initializing refs to store the email and password values
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Prepare the payload object matching what your backend expects
    const loginData = {
      email: emailRef.current,
      password: passwordRef.current,
    };

    try {
      // 2. Send data to the backend using fetch
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tells backend we are sending JSON
        },
        credentials: "include",
        body: JSON.stringify(loginData), // Converts JS object to JSON string
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login here (e.g., save token, redirect)
        if (data.status) {
          console.log("Login successful:", data.sms);

          localStorage.setItem("userlFind", JSON.stringify(data.userlFind));
          dispatch(login({ user: data.userlFind }));
          navigate("/");
        } else {
          console.log("Login Unsuccessful:", data.sms);
        }
      } else {
        console.error("Login failed:", data.sms || "Unknown error");
        // Handle server-side errors here
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle connection/network errors here
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <div
        className="card shadow-sm p-4"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-dark">Account Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label text-secondary small fw-semibold">
              Email Address *
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="name@example.com"
              required
              onChange={(e) => {
                emailRef.current = e.target.value;
              }}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">
              Password *
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter your password"
              required
              onChange={(e) => {
                passwordRef.current = e.target.value;
              }}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-dark btn-lg w-100 fw-medium">
            Log In
          </button>
        </form>
        <Link to={"/SignupPage"}>
          <button
            type="button"
            className="btn btn-dark btn-lg  w-100 fw-medium"
          >
            SignUp
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
