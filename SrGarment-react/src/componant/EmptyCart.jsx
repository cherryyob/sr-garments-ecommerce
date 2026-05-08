import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      {/* Animated Icon Container */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="rounded-circle bg-light p-5 mb-4 shadow-sm"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ff3f6c"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="fw-bold text-dark mb-2">Your bag is empty!</h2>
        <p className="text-muted mb-4 px-3" style={{ maxWidth: "400px" }}>
          Looks like you haven't added anything to your bag yet. Start exploring
          and find something you love!
        </p>
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link to="/">
          <button className="btn btn-outline-danger fw-bold px-5 py-2 text-uppercase">
            Go to Shop
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default EmptyCart;
