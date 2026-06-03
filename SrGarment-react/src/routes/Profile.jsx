import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import {
  IoSettingsOutline,
  IoLogOutOutline,
  IoWalletOutline,
  IoLocationOutline,
  IoGiftOutline,
  IoChevronForward,
  IoPersonOutline,
  IoBagCheckOutline,
} from "react-icons/io5";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  
  const [activeTab, setActiveTab] = useState("Orders");

  const menuItems = [
    {
      icon: <IoBagCheckOutline />,
      label: "Orders",
      description: "Check your order status",
    },
    {
      icon: <IoWalletOutline />,
      label: "Payments",
      description: "Saved cards and wallets",
    },
    {
      icon: <IoLocationOutline />,
      label: "Addresses",
      description: "Save addresses for faster checkout",
    },
    {
      icon: <IoGiftOutline />,
      label: "Coupons",
      description: "Manage your promo codes",
    },
    {
      icon: <IoPersonOutline />,
      label: "Edit Profile",
      description: "Change password and details",
    },
    {
      icon: <IoSettingsOutline />,
      label: "Settings",
      description: "Privacy and notifications",
    },
  ];

  return (
    <div className="container-fluid min-vh-100 bg-light p-0">
      <div className="row g-0 min-vh-100">
        {/* LEFT SIDE: Navigation Sidebar (4 Columns) */}
        <div className="col-lg-3 col-md-4 bg-white border-end p-4 shadow-sm">
          <div className="profile-header text-center mb-5">
            <motion.img
              whileHover={{ rotate: 5 }}
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              className="rounded-circle border p-1 mb-3"
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#fff1f4",
              }}
            />
            <h5 className="fw-bold mb-0">
              {user?.firstname} {user?.lastname}
            </h5>
            <p className="text-muted small">
              {user?.email || "sruser@example.com"}
            </p>
          </div>

          <nav className="nav flex-column gap-2">
            {menuItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(item.label)}
                className={`d-flex align-items-center p-3 rounded-4 cursor-pointer transition-all ${
                  activeTab === item.label
                    ? "bg-danger text-white shadow"
                    : "text-secondary hover-bg-light"
                }`}
                style={{ cursor: "pointer", transition: "0.3s" }}
              >
                <span className="me-3 fs-5">{item.icon}</span>
                <div className="flex-grow-1">
                  <div className="fw-bold small mb-0">{item.label}</div>
                </div>
                <IoChevronForward
                  size={14}
                  className={
                    activeTab === item.label ? "text-white" : "text-muted"
                  }
                />
              </motion.div>
            ))}

            <div className="mt-5 pt-5 border-top">
              <button className="btn btn-link text-danger fw-bold text-decoration-none d-flex align-items-center gap-2">
                <IoLogOutOutline size={20} /> Logout
              </button>
            </div>
          </nav>
        </div>

        {/* RIGHT SIDE: Details View (9 Columns) */}
        <div className="col-lg-9 col-md-8 p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">{activeTab}</h2>
                <span className="badge bg-soft-danger text-danger px-3 py-2 rounded-pill">
                  {activeTab === "Orders"
                    ? "12 Items Found"
                    : "Manage your info"}
                </span>
              </div>

              {/* Dynamic Content Based on Selection */}
              <div
                className="card border-0 shadow-sm rounded-5 p-4 bg-white"
                style={{ minHeight: "60vh" }}
              >
                {activeTab === "Orders" ? (
                  <div className="text-center py-5">
                    <IoBagCheckOutline size={80} className="text-light mb-3" />
                    <h4 className="text-muted">No Recent Orders</h4>
                    <p className="text-secondary">
                      Your recently purchased items will appear here.
                    </p>
                    <button className="btn btn-danger px-4 py-2 mt-2 rounded-pill fw-bold">
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <h5 className="text-muted">
                      Details for {activeTab} coming soon...
                    </h5>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Adding custom hover style */}
      <style>{`
        .hover-bg-light:hover { background-color: #f8f9fa; }
        .bg-soft-danger { background-color: #fff1f4; }
      `}</style>
    </div>
  );
};

export default ProfilePage;
