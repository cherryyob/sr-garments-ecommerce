import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const RefSignup = () => {
  // Create a reference container for each input field
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();

  const handleSubmit = async (e) => {
    const navigate = useNavigate();
    e.preventDefault();

    // Pull the current text values directly out of the DOM nodes
    const formData = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
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
        alert("Data sent successfully!");
        console.log(response.json());
        // Resetting the raw HTML elements natively
        navigate("/");
        e.target.reset();
      } else {
        alert("Server error");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Sign Up (useRef Example)</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name *</label>
          <input
            type="text"
            ref={firstnameRef}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" ref={lastnameRef} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address *</label>
          <input
            type="email"
            ref={emailRef}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password *</label>
          <input
            type="password"
            ref={passwordRef}
            className="form-control"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Role</label>
          <select ref={roleRef} className="form-select">
            <option value="host">Host</option>
            <option value="guest">Guest</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RefSignup;
