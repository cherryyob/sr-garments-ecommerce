import React, { useState, useEffect, useRef } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const items = useSelector((store) => store.store);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Handle Outside Click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Logic
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = items.filter(
      (product) =>
        product.item_name.toLowerCase().includes(query.toLowerCase()) ||
        product.company.toLowerCase().includes(query.toLowerCase()),
    );
    setResults(filtered.slice(0, 7)); // Show top 7 results
  }, [query, items]);

  const handleSelect = (id) => {
    setQuery("");
    setShowDropdown(false);
    navigate(`/product/${id}`); // Redirects to product detail page
  };

  return (
    <div
      className="position-relative"
      style={{ width: "400px" }}
      ref={searchRef}
    >
      {/* Search Input */}
      <div className="d-flex align-items-center bg-light px-3 py-2 rounded-pill border">
        <IoSearchOutline className="text-secondary me-2" size={20} />
        <input
          type="text"
          className="form-control border-0 bg-transparent shadow-none p-0 small"
          placeholder="Search for products, brands and more..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
        />
        {query && (
          <IoCloseOutline
            className="text-secondary ms-2 cursor-pointer"
            onClick={() => setQuery("")}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {showDropdown && query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="position-absolute w-100 bg-white shadow-lg rounded-4 mt-2 overflow-hidden border"
            style={{ zIndex: 1050 }}
          >
            {results.length > 0 ? (
              results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className="d-flex align-items-center p-3 border-bottom hover-result"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={item.image}
                    alt={item.item_name}
                    className="rounded-2 me-3"
                    style={{
                      width: "45px",
                      height: "55px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-0 fw-bold small text-dark">
                      {item.company}
                    </h6>
                    <p
                      className="mb-0 text-muted small text-truncate"
                      style={{ maxWidth: "250px" }}
                    >
                      {item.item_name}
                    </p>
                  </div>
                  <div className="text-danger fw-bold small">
                    ₹{item.current_price}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center">
                <p className="text-muted mb-0 small">
                  No products found for "{query}"
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hover-result:hover { background-color: #fff1f4; }
      `}</style>
    </div>
  );
};

export default SearchBar;
