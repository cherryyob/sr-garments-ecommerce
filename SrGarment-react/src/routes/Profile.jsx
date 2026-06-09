import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { saveAddress, getAddress } from "../services/saveAddress";
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
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";

// ==========================================
// SMART ADDRESS SECTION COMPONENT
// ==========================================
const SmartAddressSection = () => {
  // Fetch saved addresses on component load
  const [addresses, setAddresses] = useState([]);
  const [updateAddress, setUpdateAddress] = useState(0); // Trigger re-fetch when address is added/updated

  useEffect(() => {
    const fn = async () => {
      const addr = await getAddress();
      if (addr) {
        console.log("Fetched addresses:", addr);
        setAddresses(addr);
      }
    };
    fn();
  }, [updateAddress]);
  const [formData, setFormData] = useState({
    fullName: "",
    pincode: "",
    streetAddress: "",
    areaAddress: "",
    city: "",
    state: "",
    landmark: "",
  });

  const [loading, setLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [validated, setValidated] = useState(false);

  // Auto-fetch data on pincode match
  const handleChange = async (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === "pincode") {
      if (value.length === 6 && /^[1-9][0-9]{5}$/.test(value)) {
        setLoading(true);
        setPincodeError("");
        try {
          const res = await fetch(
            `https://api.postalpincode.in/pincode/${value}`,
          );
          const data = await res.json();
          if (data[0].Status === "Success") {
            const details = data[0].PostOffice[0];
            setFormData((prev) => ({
              ...prev,
              city: details.District,
              state: details.State,
            }));
          } else {
            throw new Error();
          }
        } catch {
          setPincodeError("Invalid Pincode. Please check and try again.");
          setFormData((prev) => ({ ...prev, city: "", state: "" }));
        } finally {
          setLoading(false);
        }
      } else {
        setFormData((prev) => ({ ...prev, city: "", state: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false || pincodeError) {
      e.stopPropagation();
    } else {
      const savedResult = await saveAddress(formData);
      if (savedResult) {
        alert("Address received successfully!");
        setFormData({
          fullName: "",
          pincode: "",
          streetAddress: "",
          areaAddress: "",
          city: "",
          state: "",
          landmark: "",
        });
        setValidated(false);
        setUpdateAddress((prev) => prev + 1); // Trigger re-fetch of addresses
      } else {
        alert("Failed to save address. Please try again.");
        setValidated(true);
      }
    }
  };

  return (
    <div className="text-start">
      {/* Saved Addresses Section */}
      <div className="mb-5 pb-5 border-bottom">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Your Saved Addresses
        </h3>

        {/* If no addresses are found */}
        {addresses.length === 0 ? (
          <p className="text-gray-500 text-sm italic">
            No addresses saved yet.
          </p>
        ) : (
          /* Grid layout: 1 column on mobile, 2 columns on larger screens */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm relative d-flex flex-column justify-between hover:shadow-md transition-shadow duration-200"
              >
                <div>
                  {/* Badge for Default Address */}
                  {addr.isDefault && (
                    <span className="absolute top-3 right-3 bg-soft-danger text-danger text-xs font-bold px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}

                  {/* User Name */}
                  <h4 className="font-bold text-gray-900 text-base mb-2">
                    {addr.fullName}
                  </h4>

                  {/* Address Details */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-1">
                    {addr.streetAddress}, {addr.areaAddress}
                  </p>

                  {/* Landmark if available */}
                  {addr.landmark && (
                    <p className="text-sm text-gray-500 italic mb-1">
                      Landmark: {addr.landmark}
                    </p>
                  )}

                  {/* City, State & Pincode */}
                  <p className="text-sm text-gray-700 font-medium mb-3">
                    {addr.city}, {addr.state} -{" "}
                    <span className="text-gray-900 font-semibold">
                      {addr.pincode}
                    </span>
                  </p>
                </div>

                {/* Big Prominent Action Buttons */}
                <div className="row g-2 pt-2 mt-auto border-top border-light">
                  <div className="col-6">
                    <button
                      onClick={() => console.log("Edit requested", addr)}
                      className="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center gap-2 small fw-bold rounded-3"
                    >
                      <IoPencilOutline size={16} /> Edit
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      onClick={() => console.log("Delete requested", addr._id)}
                      className="btn btn-outline-dark w-100 py-2 d-flex align-items-center justify-content-center gap-2 small fw-bold rounded-3"
                    >
                      <IoTrashOutline size={16} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Added Extra Top Margin and Padding for Distinct Visual Separation */}
      <div className="mt-5 pt-3">
        <h4 className="fw-bold mb-1 text-dark fs-5">Add New Address</h4>
        <p className="text-muted small mb-4">
          Enter your pincode to automatically pull city and state info.
        </p>

        <form
          className={`needs-validation ${validated ? "was-validated" : ""}`}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="row g-3">
            {/* Full Name */}
            <div className="col-12">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="form-control smart-input py-2"
                placeholder="e.g. Raghav Jha"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Pincode */}
            <div className="col-12 position-relative">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Pincode (ZIP)
              </label>
              <input
                type="text"
                id="pincode"
                className="form-control smart-input py-2"
                placeholder="Enter 6-digit pincode"
                maxLength="6"
                pattern="^[1-9][0-9]{5}$"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
              {loading && (
                <div
                  className="spinner-border spinner-border-sm text-danger position-absolute"
                  style={{ right: "15px", top: "38px" }}
                  role="status"
                />
              )}
              {pincodeError && (
                <div className="text-danger small mt-1">{pincodeError}</div>
              )}
              <div className="invalid-feedback">
                Please enter a valid 6-digit postal code.
              </div>
            </div>

            {/* Street Address */}
            <div className="col-12">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Flat, House no., Building, Apartment
              </label>
              <input
                type="text"
                id="streetAddress"
                className="form-control smart-input py-2"
                placeholder="Floor, Flat/House No., Building Name"
                value={formData.streetAddress}
                onChange={handleChange}
                required
              />
            </div>

            {/* Area Address */}
            <div className="col-12">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Area, Colony, Street, Sector
              </label>
              <input
                type="text"
                id="areaAddress"
                className="form-control smart-input py-2"
                placeholder="Area details"
                value={formData.areaAddress}
                onChange={handleChange}
                required
              />
            </div>

            {/* City (Auto-filled) */}
            <div className="col-md-6">
              <label className="form-label small fw-semibold text-secondary mb-1">
                City / District
              </label>
              <input
                type="text"
                id="city"
                className="form-control smart-input py-2 bg-light"
                placeholder="Auto-filled"
                value={formData.city}
                readOnly
                required
              />
            </div>

            {/* State (Auto-filled) */}
            <div className="col-md-6">
              <label className="form-label small fw-semibold text-secondary mb-1">
                State
              </label>
              <input
                type="text"
                id="state"
                className="form-control smart-input py-2 bg-light"
                placeholder="Auto-filled"
                value={formData.state}
                readOnly
                required
              />
            </div>

            {/* Landmark */}
            <div className="col-12">
              <label className="form-label small fw-semibold text-secondary mb-1">
                Landmark{" "}
                <span className="text-muted font-monospace text-lowercase">
                  (Optional)
                </span>
              </label>
              <input
                type="text"
                id="landmark"
                className="form-control smart-input py-2"
                placeholder="e.g. Near Apollo Hospital"
                value={formData.landmark}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 mt-4 py-2.5 fw-semibold rounded-3 shadow-sm"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// MAIN PROFILE PAGE MODULE
// ==========================================
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
        {/* LEFT SIDE: Navigation Sidebar */}
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

        {/* RIGHT SIDE: Details View */}
        <div className="col-lg-9 col-md-8 p-4 p-md-5">
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
                {activeTab === "Orders" && (
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
                )}

                {activeTab === "Addresses" && <SmartAddressSection />}

                {!["Orders", "Addresses"].includes(activeTab) && (
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

      {/* Global Theme & Animation Modifiers */}
      <style>{`
        .hover-bg-light:hover { background-color: #f8f9fa; }
        .bg-soft-danger { background-color: #fff1f4; }
        
        /* Modern Micro-Interaction Field pop out */
        .smart-input {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #dee2e6;
        }
        .smart-input:hover, 
        .smart-input:focus {
          transform: translateY(-2px);
          border-color: #dc3545 !important;
          box-shadow: 0 5px 12px rgba(220, 53, 69, 0.1) !important;
        }
        .form-control:focus {
          outline: 0;
          background-color: #fff;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
