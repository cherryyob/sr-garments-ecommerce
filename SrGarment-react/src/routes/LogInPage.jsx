import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [activeInput, setActiveInput] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 5 + 3,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  return (
    <div
      className="position-relative overflow-hidden d-flex align-items-center py-5"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left,#7f1d1d 0%,transparent 30%), radial-gradient(circle at bottom right,#ef4444 0%,transparent 25%), #f5f5f5",
      }}
    >
      {/* Floating Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="position-absolute rounded-circle"
          style={{
            bottom: "-20px",
            background: "rgba(239, 68, 68, 0.15)",
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatParticle ${p.duration}s linear ${p.delay}s infinite`,
          }}
        ></span>
      ))}

      <div
        className="container"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div
          className="row mx-auto overflow-hidden shadow-lg border border-white border-opacity-25"
          style={{
            maxWidth: "1000px", // Marginally tighter width optimized for standard login setups
            borderRadius: "35px",
            background: "rgba(255, 255, 255, 0.65)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* LEFT SIDE (Matches Signup Page Accents Exactly) */}
          <div
            className="col-lg-5 d-flex flex-column justify-content-center p-4 p-md-5 text-white position-relative overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #7f1d1d, #b91c1c, #ef4444)",
            }}
          >
            {/* Circle Decorative Layer */}
            <div
              className="position-absolute bg-white bg-opacity-10 rounded-circle"
              style={{
                width: "350px",
                height: "350px",
                top: "-120px",
                right: "-120px",
              }}
            />

            <div
              className="logo-box d-flex align-items-center justify-content-center rounded-4 fw-bold mb-4 bg-white bg-opacity-10"
              style={{ width: "75px", height: "75px", fontSize: "32px" }}
            >
              N
            </div>

            <h1 className="fw-bold display-4 text-white">
              Welcome <span style={{ color: "#ffe4e6" }}>Back.</span>
            </h1>

            <p className="mt-4 opacity-75" style={{ lineHeight: "1.9" }}>
              Log into your account securely to access your dashboard, custom
              settings, and creator metrics.
            </p>

            <div
              className="mt-5 p-4 rounded-4 text-center bg-white bg-opacity-10"
              style={{ backdropFilter: "blur(10px)" }}
            >
              <p className="m-0 small opacity-75">Secured Gateway</p>
              <h5 className="fw-bold m-0 mt-1">🔒 256-Bit Encryption</h5>
            </div>
          </div>

          {/* RIGHT SIDE (Form Area) */}
          <div className="col-lg-7 bg-white p-4 p-md-5 d-flex align-items-center">
            <div className="mx-auto w-100" style={{ maxWidth: "450px" }}>
              <h2 className="fw-bold">Account Login</h2>
              <p className="text-muted mb-4">Glad to see you again!</p>

              {/* EMAIL */}
              <div
                className="custom-input w-100 d-flex align-items-center px-4 mb-3 rounded-4 border border-2"
                style={{
                  height: "65px",
                  background: activeInput === "email" ? "white" : "#f9fafb",
                  borderColor:
                    activeInput === "email" ? "#ef4444" : "transparent",
                  boxShadow:
                    activeInput === "email"
                      ? "0 10px 35px rgba(239,68,68,0.12)"
                      : "none",
                }}
              >
                <div className="text-danger me-3 fs-5">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-100 border-0 bg-transparent text-dark"
                  style={{ outline: "none", fontSize: "15px" }}
                  onFocus={() => setActiveInput("email")}
                  onBlur={() => setActiveInput("")}
                />
              </div>

              {/* PASSWORD */}
              <div
                className="custom-input w-100 d-flex align-items-center px-4 mb-3 rounded-4 border border-2"
                style={{
                  height: "65px",
                  background: activeInput === "password" ? "white" : "#f9fafb",
                  borderColor:
                    activeInput === "password" ? "#ef4444" : "transparent",
                  boxShadow:
                    activeInput === "password"
                      ? "0 10px 35px rgba(239,68,68,0.12)"
                      : "none",
                }}
              >
                <div className="text-danger me-3 fs-5">
                  <FaLock />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-100 border-0 bg-transparent text-dark"
                  style={{ outline: "none", fontSize: "15px" }}
                  onFocus={() => setActiveInput("password")}
                  onBlur={() => setActiveInput("")}
                />
              </div>

              {/* REMEMBER ME & FORGOT PASSWORD */}
              <div className="d-flex justify-content-between align-items-center mb-4 px-1">
                <div
                  className="form-check cursor-pointer"
                  onClick={() => setRememberMe(!rememberMe)}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    className="form-check-input text-danger shadow-none"
                    type="checkbox"
                    id="rememberCheck"
                    checked={rememberMe}
                    onChange={() => {}}
                    style={{ cursor: "pointer", accentColor: "#ef4444" }}
                  />
                  <label
                    className="form-check-label text-muted small"
                    htmlFor="rememberCheck"
                    style={{ cursor: "pointer" }}
                  >
                    Remember me
                  </label>
                </div>
                <span
                  className="text-danger small fw-bold text-decoration-none"
                  style={{ cursor: "pointer" }}
                >
                  Forgot Password?
                </span>
              </div>

              {/* ACTION BUTTON */}
              <button
                className="login-btn w-100 btn text-white fw-bold d-flex align-items-center justify-content-center position-relative overflow-hidden"
                style={{
                  height: "65px",
                  borderRadius: "22px",
                  background: "linear-gradient(135deg, #dc2626, #ef4444)",
                  fontSize: "17px",
                }}
              >
                Log In
                <FaArrowRight className="ms-2" />
              </button>
              <Link
                to={"/SignUpPage"}
                className="text-decoration-none text-dark position-relative"
              >
                <div className="text-center mt-4 text-muted">
                  Don't have an account yet?
                  <span
                    className="text-danger fw-bold ms-1"
                    style={{ cursor: "pointer" }}
                  >
                    Sign Up
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Kept minimal utility styles strictly for matching hover mechanics & animations */}
      <style>{`
        .logo-box, .custom-input, .login-btn {
          transition: transform 0.35s ease, background-color 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .logo-box:hover {
          transform: rotate(10deg) scale(1.05);
          background: white !important;
          color: #ef4444 !important;
        }
        .custom-input:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(239,68,68,0.08) !important;
        }
        .login-btn::before {
          content: '';
          position: absolute;
          width: 50px;
          height: 160%;
          background: rgba(255,255,255,0.35);
          top: -20px;
          left: -60px;
          transform: rotate(20deg);
          transition: 0.6s;
        }
        .login-btn:hover::before { left: 120%; }
        .login-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px rgba(239,68,68,0.25) !important;
        }
        @keyframes floatParticle {
          from { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          to { transform: translateY(-120vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
