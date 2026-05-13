import { useMemo } from "react";
import { useSelector } from "react-redux";
import { MdOutlineLocalOffer, MdSecurity } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi"; // Better icon for "Know More"
import EmptyCart from "./emptyCart";

const BagSummary = () => {
  const conventionFee = 99;
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
      { totalPrice: 0, totalPrieAfterDiscount: 0 },
    );
  }, [itemDetails]);

  const discount = cartSummry.totalPrice - cartSummry.totalPrieAfterDiscount;
  const finalAmount = cartSummry.totalPrieAfterDiscount + conventionFee;

  return (
    <>
      {itemDetails.length > 0 ? (
        /* Removed maxWidth to allow full container width */
        <div className="card shadow-sm border-0 w-100 mt-3 mt-lg-0 bag-summary-card">
          <div className="card-body p-4">
            <h6 className="text-muted fw-bold mb-4 text-uppercase small letter-spacing">
              Price Details ({itemDetails.length} Items)
            </h6>

            <div className="d-flex justify-content-between mb-3">
              <span className="text-secondary">Total MRP</span>
              <span className="fw-medium">₹{cartSummry.totalPrice}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span className="text-secondary">Discount on MRP</span>
              <span className="text-success fw-medium">-₹{discount}</span>
            </div>

            {/* Fixed overlapping: Wrapped in a div and used align-items-center */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-1">
                <span className="text-secondary">Convenience Fee</span>
                <button
                  className="btn btn-link p-0 text-decoration-none fw-bold small text-primary"
                  style={{ fontSize: "0.75rem" }}
                >
                  Know More
                </button>
              </div>
              <span className="fw-medium">₹{conventionFee}</span>
            </div>

            <hr className="my-4" />

            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-5">Total Amount</span>
              <span className="fw-bold fs-5 text-dark">₹{finalAmount}</span>
            </div>

            <button className="btn btn-danger w-100 fw-bold py-3 shadow-sm order-btn">
              PLACE ORDER
            </button>

            <div className="mt-4 pt-2 border-top">
              <div className="d-flex align-items-center gap-2 text-muted small fw-medium">
                <MdSecurity className="text-success fs-5" />
                <span>100% Safe and Secure Payments</span>
              </div>
            </div>
          </div>

          <style>{`
            .bag-summary-card {
              animation: fadeInRight 0.6s ease-in-out;
              border-radius: 8px;
            }
            
            .letter-spacing {
              letter-spacing: 0.5px;
            }

            .order-btn {
              transition: all 0.3s ease;
              letter-spacing: 1.5px;
              border-radius: 4px;
              background-color: #ff3f6c; /* Standard E-commerce Red */
              border: none;
            }

            .order-btn:hover {
              transform: scale(1.02);
              background-color: #e63962 !important;
              box-shadow: 0 4px 15px rgba(255, 63, 108, 0.4) !important;
            }

            @keyframes fadeInRight {
              from { opacity: 0; transform: translateX(20px); }
              to { opacity: 1; transform: translateX(0); }
            }
          `}</style>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default BagSummary;
