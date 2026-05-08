import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoHeartOutline,
  IoHeart,
  IoTrashOutline,
  IoBagAddOutline,
  IoGridOutline,
  IoShirtOutline,
  IoChevronForward,
} from "react-icons/io5";

const WishList = () => {
  const [activeFilter, setActiveFilter] = useState("All Items");

  // Sample data for Wishlist items
  const wishlistItems = [
    {
      id: 1,
      name: "Premium Denim Jacket",
      price: "2,499",
      oldPrice: "4,999",
      brand: "Urban Threads",
      img: "https://via.placeholder.com/200x250?text=Denim+Jacket",
      category: "Men",
    },
    {
      id: 2,
      name: "Floral Summer Dress",
      price: "1,899",
      oldPrice: "3,799",
      brand: "Zara",
      img: "https://via.placeholder.com/200x250?text=Dress",
      category: "Women",
    },
    {
      id: 3,
      name: "Graphic Cotton Tee",
      price: "799",
      oldPrice: "1,599",
      brand: "Adidas",
      img: "https://via.placeholder.com/200x250?text=Tshirt",
      category: "Men",
    },
    {
      id: 4,
      name: "Leather Tote Bag",
      price: "3,200",
      oldPrice: "6,400",
      brand: "H&M",
      img: "https://via.placeholder.com/200x250?text=Tote+Bag",
      category: "Beauty",
    },
  ];

  // Filtering logic
  const filteredItems = wishlistItems.filter(
    (item) => activeFilter === "All Items" || item.category === activeFilter,
  );

  const filterMenu = [
    {
      icon: <IoGridOutline />,
      label: "All Items",
      count: wishlistItems.length,
    },
    { icon: <IoShirtOutline />, label: "Men", count: 2 },
    { icon: <IoShirtOutline />, label: "Women", count: 1 },
    { icon: <IoShirtOutline />, label: "Kids", count: 0 },
    { icon: <IoHeart />, label: "On Sale", count: 4 }, // All have old prices
  ];

  return (
    <div className="container-fluid min-vh-100 bg-light p-0">
      <div className="row g-0 min-vh-100">
        {/* LEFT SIDE: Filtering Sidebar (3 Columns) */}
        <div className="col-lg-3 col-md-4 bg-white border-end p-4 shadow-sm">
          <div className="wishlist-header mb-5">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="rounded-4 p-3 bg-soft-danger text-danger">
                <IoHeart size={30} />
              </div>
              <h3 className="fw-bold mb-0">Your Wishlist</h3>
            </div>
            <p className="text-muted small">Items you've saved to buy later</p>
          </div>

          <nav className="nav flex-column gap-2">
            {filterMenu.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(item.label)} // Use tab switching state here
                className={`d-flex align-items-center p-3 rounded-4 cursor-pointer transition-all ${
                  activeFilter === item.label
                    ? "bg-danger text-white shadow"
                    : "text-secondary hover-bg-light"
                }`}
                style={{ cursor: "pointer", transition: "0.3s" }}
              >
                <span className="me-3 fs-5">{item.icon}</span>
                <div className="flex-grow-1 fw-bold small mb-0">
                  {item.label}
                </div>

                {item.count > 0 && (
                  <span
                    className={`badge rounded-pill px-3 ms-2 ${activeFilter === item.label ? "bg-white text-danger" : "bg-light text-muted"}`}
                  >
                    {item.count}
                  </span>
                )}
                <IoChevronForward
                  size={14}
                  className={`ms-3 ${activeFilter === item.label ? "text-white" : "text-muted"}`}
                />
              </motion.div>
            ))}
          </nav>
        </div>

        {/* RIGHT SIDE: Wishlist Grid (9 Columns) */}
        <div className="col-lg-9 col-md-8 p-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">{activeFilter}</h2>
            <p className="text-muted mb-0">
              {filteredItems.length} Products Found
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              <div className="row g-4">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30, scale: 0.8 }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      damping: 15,
                    }}
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                  >
                    <WishlistItemCard item={item} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 bg-white rounded-5 shadow-sm">
                <IoHeartOutline
                  size={80}
                  className="text-muted opacity-25 mb-3"
                />
                <h4 className="text-muted">No Items in '{activeFilter}'</h4>
                <p className="text-secondary">
                  Explore products and add some to your wishlist!
                </p>
                <button className="btn btn-danger px-4 py-2 mt-2 rounded-pill fw-bold">
                  Continue Shopping
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Adding custom hover styles and badge */}
      <style>{`
        .hover-bg-light:hover { background-color: #f8f9fa; }
        .bg-soft-danger { background-color: #fff1f4; }
        .wishlist-card { transition: all 0.3s ease; }
        .wishlist-card:hover { transform: translateY(-5px); box-shadow: 0 1rem 3rem rgba(0,0,0,.08); }
        .old-price { text-decoration: line-through; }
      `}</style>
    </div>
  );
};

// Reusable Card Component for each Wishlist product
const WishlistItemCard = ({ item }) => {
  return (
    <div className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm wishlist-card bg-white position-relative">
      {/* Delete button absolute */}
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "#dc3545" }}
        whileTap={{ scale: 0.9 }}
        className="position-absolute top-0 end-0 m-3 btn btn-light rounded-circle p-2 shadow"
        style={{ zIndex: 2 }}
      >
        <IoTrashOutline size={18} className="text-muted hover-text-white" />
      </motion.button>

      <img
        src={item.img}
        className="card-img-top p-3 rounded-5"
        alt={item.name}
      />
      <div className="card-body p-3">
        <span className="text-muted small fw-bold text-uppercase">
          {item.brand}
        </span>
        <h6 className="fw-bold mt-1 text-truncate" title={item.name}>
          {item.name}
        </h6>

        <div className="d-flex align-items-center gap-2 mt-2">
          <span className="fw-bold text-danger fs-5">₹{item.price}</span>
          <span className="small old-price text-muted">₹{item.oldPrice}</span>
        </div>

        <div className="d-grid mt-3 gap-2">
          <button className="btn btn-outline-danger fw-bold rounded-pill py-2 d-flex align-items-center justify-content-center gap-2">
            <IoBagAddOutline size={18} />
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishList;
