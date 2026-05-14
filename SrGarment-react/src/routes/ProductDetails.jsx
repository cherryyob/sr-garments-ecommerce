import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { idName } = useParams();
  useEffect(async () => {
    const idNameData = await fetch("http://localhost:3000/bag", {
      method: "post",
      headers: { ContentType: "application/json" },
      body: JSON.stringify({ id: idName }),
    });
  }, [idName]);

  const product = {
    idName: "001",
    image: "https://via.placeholder.com/700x700.png?text=Floral+Studs",
    company: "Carlton London",
    item_name: "Rhodium-Plated CZ Floral Studs",
    original_price: 1045,
    current_price: 606,
    discount_percentage: 42,
    delivery_date: "2023-10-09",
  };

  return (
    <div className="container-fluid min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
      <div className="row bg-white shadow-lg rounded-4 overflow-hidden w-100">
        {/* Left Side - Image */}
        <div className="col-lg-6 p-0">
          <img
            src={product.image}
            alt={product.item_name}
            className="img-fluid w-100 h-100 object-fit-cover"
          />
        </div>

        {/* Right Side - Details */}
        <div className="col-lg-6 p-5 d-flex flex-column justify-content-center">
          <h5 className="text-danger fw-bold mb-2">{product.company}</h5>

          <h1 className="fw-bold display-5 mb-4">{product.item_name}</h1>

          {/* Price */}
          <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
            <span className="fs-1 fw-bold text-dark">
              ₹{product.current_price}
            </span>

            <span className="fs-4 text-secondary text-decoration-line-through">
              ₹{product.original_price}
            </span>

            <span className="badge bg-success fs-6 px-3 py-2">
              {product.discount_percentage}% OFF
            </span>
          </div>

          {/* Delivery */}
          <p className="fs-5 text-muted mb-4">
            Delivery by{" "}
            <span className="fw-semibold text-dark">
              {new Date(product.delivery_date).toDateString()}
            </span>
          </p>

          {/* Buttons */}
          <div className="d-flex gap-3 mb-5 flex-wrap">
            <button className="btn btn-danger btn-lg px-5 py-3">
              Add to Cart
            </button>

            <button className="btn btn-dark btn-lg px-5 py-3">Buy Now</button>
          </div>

          {/* Product Description */}
          <div>
            <h3 className="fw-bold mb-3">Product Details</h3>

            <p className="text-secondary fs-5 lh-lg">
              Elegant floral studs crafted with rhodium plating and premium
              cubic zirconia stones. Stylish, lightweight, and perfect for
              everyday wear, parties, and gifting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
