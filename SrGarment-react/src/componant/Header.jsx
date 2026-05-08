import React from "react";

import {
  IoPersonOutline,
  IoPerson,
  IoHeartOutline,
  IoHeart,
  IoBagHandleOutline,
  IoBagHandle,
} from "react-icons/io5";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

const Header = () => {
  const bagCount = useSelector((store) => store.bagItemsState.length || 0);

  const iconVariants = {
    hover: {
      y: -5,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-2">
      <div className="container-fluid px-lg-5">
        {/* Logo Section */}
        <div className="logo_container me-4">
          <Link to="/">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="../../images/logo.png"
              alt="SR GARMENTS Home"
              style={{ height: "45px", width: "auto", cursor: "pointer" }}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="nav_bar d-none d-lg-flex">
          {["Men", "Women", "Kids", "Home & Living", "Beauty"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(/ /g, "-")}`}
              className="nav-link fw-bold text-uppercase mx-2 small text-dark position-relative"
            >
              <motion.span whileHover={{ color: "#ff3f6c" }}>
                {item}
              </motion.span>
            </Link>
          ))}
        </nav>

        {/* Functional Search Bar Integration */}
        <div className="flex-grow-1 d-flex justify-content-center px-4">
          {/* We replace the old static div with your NEW component */}
          <SearchBar />
        </div>

        {/* Action Buttons */}
        <div className="action_bar d-flex align-items-center gap-4">
          <Link to="/profile" className="text-decoration-none text-dark">
            <IconButton
              iconOutline={IoPersonOutline}
              iconFilled={IoPerson}
              label="Profile"
              variants={iconVariants}
            />
          </Link>

          <Link to="/wishlist" className="text-decoration-none text-dark">
            <IconButton
              iconOutline={IoHeartOutline}
              iconFilled={IoHeart}
              label="Wishlist"
              variants={iconVariants}
              activeColor="#ff3f6c"
            />
          </Link>

          <Link
            to="/bag"
            className="text-decoration-none text-dark position-relative"
          >
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={iconVariants}
              className="action_container d-flex flex-column align-items-center cursor-pointer p-1"
            >
              <div className="position-relative">
                <IoBagHandleOutline size={22} className="text-dark" />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileTap={{ opacity: 1 }}
                  className="position-absolute top-0 start-0"
                >
                  <IoBagHandle size={22} className="text-dark" />
                </motion.div>
              </div>

              <span
                className="fw-bold mt-1 text-dark"
                style={{ fontSize: "11px" }}
              >
                Bag
              </span>

              {bagCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white"
                  style={{ fontSize: "10px" }}
                >
                  {bagCount}
                </motion.span>
              )}
            </motion.div>
          </Link>
        </div>
      </div>
    </header>
  );
};

// Reusable IconButton Component
const IconButton = ({
  iconOutline: IconOutline,
  iconFilled: IconFilled,
  label,
  variants,
  activeColor = "inherit",
}) => (
  <motion.div
    initial="rest"
    whileHover="hover"
    whileTap="tap"
    variants={variants}
    className="action_container d-flex flex-column align-items-center cursor-pointer p-1 position-relative"
  >
    <div
      className="icon-stack position-relative"
      style={{ height: "24px", width: "24px" }}
    >
      <motion.div
        className="position-absolute top-0 start-0"
        variants={{ tap: { opacity: 0 } }}
      >
        <IconOutline size={22} className="text-dark" />
      </motion.div>
      <motion.div
        className="position-absolute top-0 start-0"
        initial={{ opacity: 0, scale: 0.5 }}
        variants={{ tap: { opacity: 1, scale: 1, color: activeColor } }}
        transition={{ duration: 0.1 }}
      >
        <IconFilled size={22} />
      </motion.div>
    </div>
    <span className="fw-bold mt-1 text-dark" style={{ fontSize: "11px" }}>
      {label}
    </span>
  </motion.div>
);

export default Header;
