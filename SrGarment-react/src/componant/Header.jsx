import React, { useState } from "react";
import {
  IoPersonOutline,
  IoPerson,
  IoHeartOutline,
  IoHeart,
  IoBagHandleOutline,
  IoBagHandle,
  IoLogOutOutline,
  IoLogOut,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import { logout } from "../../store/authSlice";
import { logoutService } from "../services/authService";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
  console.log(isLoggedIn, "is loged in header");

  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const bagCount = useSelector(
    (store) => store.bagItemsState.bageItemId.length || 0,
  );

  const categories = ["Men", "Women", "Kids", "Home & Living", "Beauty"];

  const handleLogout = async () => {
    await logoutService();

    localStorage.removeItem("userlFind");
    dispatch(logout());

    console.log("Logged out successfully");
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className="navbar navbar-light bg-white sticky-top py-2 border-bottom"
        style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.95)",
          zIndex: 1030,
        }}
      >
        <div className="container-fluid px-2 px-md-4">
          <div className="row align-items-center w-100 g-2 flex-nowrap">
            {/* ================= LEFT ================= */}
            <div className="col-auto d-flex align-items-center">
              {/* MENU BUTTON */}
              <motion.button
                whileHover={{
                  rotate: 90,
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="btn border-0 d-xl-none me-2 p-1"
                onClick={() => setIsLeftOpen(true)}
              >
                <IoMenuOutline size={27} />
              </motion.button>

              {/* LOGO */}
              <Link to="/" className="text-decoration-none">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="d-flex align-items-center"
                >
                  <motion.img
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                    }}
                    src="../../images/logo.png"
                    alt="SR GARMENTS"
                    style={{
                      height: "40px",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                </motion.div>
              </Link>
            </div>

            {/* ================= DESKTOP NAV ================= */}
            <div className="col-auto d-none d-xl-flex">
              <nav className="d-flex align-items-center gap-1">
                {categories.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                      className="nav-link fw-bold text-uppercase position-relative px-3 py-2 rounded-pill"
                      style={{
                        fontSize: "13px",
                        color: "#222",
                        transition: "0.3s",
                      }}
                    >
                      <motion.span
                        whileHover={{
                          color: "#ff3f6c",
                        }}
                      >
                        {item}
                      </motion.span>

                      {/* HOVER LINE */}
                      <motion.div
                        className="position-absolute start-50 bottom-0 translate-middle-x"
                        initial={{ width: 0 }}
                        whileHover={{ width: "70%" }}
                        style={{
                          height: "2px",
                          background: "#ff3f6c",
                          borderRadius: "10px",
                        }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* ================= SEARCH BAR ================= */}
            <div className="col px-1">
              <motion.div
                whileHover={{
                  scale: 1.01,
                  y: -1,
                }}
                transition={{ duration: 0.2 }}
                className="w-100"
                style={{
                  borderRadius: "14px",
                  background: "#fff",
                  position: "relative",
                  zIndex: 2000,
                  minWidth: "0",
                }}
              >
                <SearchBar />
              </motion.div>
            </div>
            {/* ================= DESKTOP ACTIONS ================= */}

            <div className="col-auto d-none d-md-flex align-items-center gap-3">
              {isLoggedIn ? (
                <div className="col-auto d-none d-md-flex align-items-center gap-3">
                  <Link
                    to="/profile"
                    className="text-decoration-none text-dark"
                  >
                    <IconButton
                      iconOutline={IoPersonOutline}
                      iconFilled={IoPerson}
                      label="Profile"
                    />
                  </Link>

                  <Link
                    to="/wishlist"
                    className="text-decoration-none text-dark"
                  >
                    <IconButton
                      iconOutline={IoHeartOutline}
                      iconFilled={IoHeart}
                      label="Wishlist"
                      activeColor="#ff3f6c"
                    />
                  </Link>

                  {/* BAG */}

                  <Link
                    to="/bag"
                    className="text-decoration-none text-dark position-relative"
                  >
                    <motion.div
                      whileHover={{
                        y: -3,
                        scale: 1.05,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="d-flex flex-column align-items-center position-relative"
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 2, -2, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                        }}
                      >
                        <IoBagHandleOutline size={23} />
                      </motion.div>

                      <span
                        className="fw-bold mt-1"
                        style={{
                          fontSize: "11px",
                        }}
                      >
                        Bag
                      </span>

                      {bagCount > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                          style={{
                            fontSize: "10px",
                          }}
                        >
                          {bagCount}
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>

                  <Link
                    to={"/LoginPage"}
                    className="text-decoration-none text-dark position-relative"
                  >
                    <IconButton
                      iconOutline={IoLogOutOutline}
                      iconFilled={IoLogOut}
                      label="Logout"
                      activeColor="#dc3545"
                      onClick={handleLogout}
                    />
                  </Link>
                </div>
              ) : (
                <Link
                  to={"/LoginPage"}
                  className="text-decoration-none text-dark position-relative"
                >
                  <IconButton
                    iconOutline={IoLogOutOutline}
                    iconFilled={IoLogOut}
                    label="Login"
                    activeColor="#dc3545"
                    onClick={handleLogout}
                  />
                </Link>
              )}
            </div>

            {/* ================= MOBILE PROFILE ================= */}
            <div className="col-auto d-md-none">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  rotate: 10,
                }}
                whileTap={{ scale: 0.9 }}
                className="btn border-0 p-1"
                onClick={() => setIsRightOpen(true)}
              >
                <IoPersonOutline size={25} />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= LEFT SIDEBAR ================= */}
      <AnimatePresence>
        {isLeftOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
              style={{ zIndex: 1040 }}
              onClick={() => setIsLeftOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="position-fixed top-0 start-0 bg-white h-100 shadow-lg p-3"
              style={{
                width: "280px",
                zIndex: 1050,
                borderTopRightRadius: "18px",
                borderBottomRightRadius: "18px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                <span className="fw-bold text-uppercase small text-muted">
                  Categories
                </span>

                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn border-0 p-1"
                  onClick={() => setIsLeftOpen(false)}
                >
                  <IoCloseOutline size={28} />
                </motion.button>
              </div>

              <div className="d-flex flex-column gap-3">
                {categories.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                    whileHover={{
                      x: 10,
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    <Link
                      to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                      onClick={() => setIsLeftOpen(false)}
                      className="text-decoration-none position-relative overflow-hidden d-flex align-items-center justify-content-between fw-bold text-uppercase px-4 py-3 rounded-4"
                      style={{
                        background: "linear-gradient(135deg,#f8f9fa,#ffffff)",
                        color: "#222",
                        fontSize: "13px",
                        border: "1px solid #f1f1f1",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      }}
                    >
                      {/* Animated Background */}
                      <motion.div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.35 }}
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(255,63,108,0.12), rgba(255,99,132,0.08))",
                          zIndex: 0,
                        }}
                      />

                      {/* Glow Dot */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 250,
                        }}
                        className="position-absolute top-50 translate-middle-y"
                        style={{
                          left: "14px",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#ff3f6c",
                          boxShadow: "0 0 10px rgba(255,63,108,0.8)",
                          zIndex: 2,
                        }}
                      />

                      {/* Text */}
                      <motion.span
                        whileHover={{
                          color: "#ff3f6c",
                          letterSpacing: "1px",
                        }}
                        className="position-relative"
                        style={{
                          zIndex: 2,
                        }}
                      >
                        {item}
                      </motion.span>

                      {/* Arrow */}
                      <motion.span
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        whileHover={{
                          opacity: 1,
                          x: 0,
                        }}
                        className="position-relative"
                        style={{
                          zIndex: 2,
                          color: "#ff3f6c",
                          fontSize: "16px",
                        }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= RIGHT SIDEBAR ================= */}
      <AnimatePresence>
        {isRightOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
              style={{ zIndex: 1040 }}
              onClick={() => setIsRightOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="position-fixed top-0 end-0 bg-white h-100 shadow-lg p-3"
              style={{
                width: "280px",
                zIndex: 1050,
                borderTopLeftRadius: "18px",
                borderBottomLeftRadius: "18px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                <span className="fw-bold text-uppercase small text-muted">
                  My Account
                </span>

                <motion.button
                  whileHover={{ rotate: -90 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn border-0 p-1"
                  onClick={() => setIsRightOpen(false)}
                >
                  <IoCloseOutline size={28} />
                </motion.button>
              </div>

              <div className="d-flex flex-column gap-3">
                <SidebarLink
                  to="/profile"
                  icon={<IoPersonOutline size={22} />}
                  label="Profile"
                  onClick={() => setIsRightOpen(false)}
                />

                <SidebarLink
                  to="/wishlist"
                  icon={<IoHeartOutline size={22} />}
                  label="Wishlist"
                  onClick={() => setIsRightOpen(false)}
                />

                <SidebarLink
                  to="/bag"
                  icon={<IoBagHandleOutline size={22} />}
                  label="Bag"
                  badge={bagCount}
                  onClick={() => setIsRightOpen(false)}
                />

                <motion.div
                  whileHover={{
                    scale: 1.02,
                    x: 5,
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleLogout();
                    setIsRightOpen(false);
                  }}
                  className="d-flex align-items-center gap-3 px-3 py-3 rounded-4 mt-3"
                  style={{
                    background: "#fff1f2",
                    color: "#dc3545",
                    cursor: "pointer",
                  }}
                >
                  <IoLogOutOutline size={22} />
                  <span className="fw-bold small">Logout</span>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/* ================= ICON BUTTON ================= */

const IconButton = ({
  iconOutline: IconOutline,
  iconFilled: IconFilled,
  label,
  activeColor = "#111",
  onClick,
}) => (
  <motion.div
    whileHover={{
      y: -4,
      scale: 1.05,
    }}
    whileTap={{ scale: 0.92 }}
    onClick={onClick}
    className="d-flex flex-column align-items-center position-relative"
    style={{
      cursor: "pointer",
    }}
  >
    <motion.div
      whileHover={{
        rotate: [0, -10, 10, 0],
      }}
      transition={{
        duration: 0.4,
      }}
      className="position-relative"
      style={{
        width: "24px",
        height: "24px",
      }}
    >
      <IconOutline size={22} />

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{
          opacity: 1,
          scale: 1.1,
        }}
        className="position-absolute top-0 start-0"
        style={{
          color: activeColor,
        }}
      >
        <IconFilled size={22} />
      </motion.div>
    </motion.div>

    <span
      className="fw-bold mt-1"
      style={{
        fontSize: "11px",
      }}
    >
      {label}
    </span>
  </motion.div>
);

/* ================= SIDEBAR LINK ================= */

const SidebarLink = ({ to, icon, label, badge, onClick }) => (
  <motion.div
    whileHover={{
      scale: 1.02,
      x: 5,
    }}
    whileTap={{ scale: 0.98 }}
  >
    <Link
      to={to}
      onClick={onClick}
      className="text-decoration-none d-flex align-items-center gap-3 px-3 py-3 rounded-4"
      style={{
        background: "#f8f9fa",
        color: "#222",
      }}
    >
      {icon}

      <span className="fw-bold small">{label}</span>

      {badge > 0 && <span className="badge bg-danger ms-auto">{badge}</span>}
    </Link>
  </motion.div>
);

export default Header;
