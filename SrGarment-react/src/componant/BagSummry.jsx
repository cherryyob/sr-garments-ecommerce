import { useMemo } from "react";
import { useSelector } from "react-redux";
const BagSummary = () => {
  const itemDetails = useSelector(
    (store) => store.bagItemsState.bagItemFullDetails,
  );
  const cartSummry = useMemo(() => {
    return itemDetails.reduce(
      (acc, item) => {
        acc.totalPrice += item.original_price;
        acc.totalPrieAfterDiscount += item.current_price;
        return acc;
      },
      {
        totalPrice: 0,
        totalPrieAfterDiscount: 0,
      },
    );
  }, [itemDetails]);
  console.log(cartSummry);
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
          PRICE DETAILS ({itemDetails.length} Items){" "}
        </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{cartSummry.totalPrice}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{cartSummry.totalPrice - cartSummry.totalPrieAfterDiscount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">
            ₹{cartSummry.totalPrieAfterDiscount}
          </span>
        </div>
      </div>
      <button className="btn-place-order">
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
    </div>
  );
};
export default BagSummary;
