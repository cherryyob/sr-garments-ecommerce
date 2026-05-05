import { useEffect } from "react";

const BagSummary = () => {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("http://localhost:3000/bag", { signal })
      .then((data) => data.json())
      .then((bagData) => {
        fetch("http://localhost:3000/bagItemFindInItems", { signal })
          .then((data) => data.json())
          .then((cartFullData) => {
            console.log("match item i n item", cartFullData);
          });
        console.log("bagDDtta", bagData);
      });
    return () => {
      controller.abort();
    };
  }, []);

  const summry = {
    totalItem: 3,
    totalMRP: 1200,
    totalDiscount: 200,
    finalPayment: 1000,
  };
  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">
          PRICE DETAILS ({summry.totalItem} Items){" "}
        </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{summry.totalMRP}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{summry.totalDiscount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{summry.finalPayment}</span>
        </div>
      </div>
      <button className="btn-place-order">
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
    </div>
  );
};
export default BagSummary;
