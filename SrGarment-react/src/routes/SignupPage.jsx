import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const RefSignup = () => {
  // Create a reference container for each input field
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const roleRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pull the current text values directly out of the DOM nodes
    const formData = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      role: roleRef.current.value,
    };

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const res = await response.json();
        alert(res.err);
        if (!res.err) {
          navigate("/LoginPage");
          e.target.reset();
        }
        // Resetting the raw HTML elements natively
      } else {
        alert("Server error");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card border-0 shadow-lg p-4 p-sm-5 rounded-4 w-100"
        style={{ maxWidth: "450px" }}
      >
        {/* Header Section */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark mb-1">Create Account</h2>
          <p className="text-muted small">
            Sign up to get started with your journey
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Fields (Row Layout) */}
          <div className="row g-3 mb-3">
            <div className="col-sm-6">
              <label className="form-label fw-semibold small text-secondary">
                First Name *
              </label>
              <input
                type="text"
                ref={firstnameRef}
                className="form-control form-control-lg bg-light border-0 rounded-3 fs-6"
                placeholder="John"
                required
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label fw-semibold small text-secondary">
                Last Name
              </label>

              <input
                type="text"
                ref={lastnameRef}
                className="form-control form-control-lg bg-light border-0 rounded-3 fs-6"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-secondary">
              Email Address *
            </label>

            <input
              type="email"
              ref={emailRef}
              className="form-control form-control-lg bg-light border-0 rounded-3 fs-6"
              placeholder="name@example.com"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-secondary">
              Password *
            </label>

            <input
              type="password"
              ref={passwordRef}
              className="form-control form-control-lg bg-light border-0 rounded-3 fs-6"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-secondary">
              Confirm Password *
            </label>

            <input
              type="password"
              ref={confirmPasswordRef}
              className="form-control form-control-lg bg-light border-0 rounded-3 fs-6"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="form-label fw-semibold small text-secondary">
              Role
            </label>

            <select
              ref={roleRef}
              className="form-select form-select-lg bg-light border-0 rounded-3 fs-6"
            >
              <option value="host">Host</option>
              <option value="guest">Guest</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 fw-bold shadow-sm rounded-3 py-2 fs-6"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RefSignup;
