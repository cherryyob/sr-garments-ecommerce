import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemFullDetails } from "../../store/bagItemSlice";
import { handelRemoveButton } from "../../store/bagItemSlice";
const BagItem = () => {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.bagItemsState.bagItemFullDetails);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("http://localhost:3000/bag", { signal })
      .then((data) => data.json())
      .then((bagData) => {
        fetch("http://localhost:3000/bagItemFindInItems", { signal })
          .then((data) => data.json())
          .then((cartFullData) => {
            dispatch(addItemFullDetails(cartFullData));
            console.log(cartFullData);
          });
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {items.map((item) => (
        <div
          className="card mb-3 shadow-sm border-0 position-relative"
          key={item.id}
          style={{ transition: "transform 0.3s, box-shadow 0.3s" }} // Inline style for the hover logic
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.classList.replace("shadow-sm", "shadow");
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.classList.replace("shadow", "shadow-sm");
          }}
        >
          <div className="row g-0 align-items-center p-2">
            {/* Image Part */}
            <div className="col-4 col-md-3">
              <img
                src={item.image}
                className="img-fluid rounded"
                alt={item.item_name}
                style={{ transition: "transform 0.3s" }}
              />
            </div>

            {/* Content Part */}
            <div className="col-8 col-md-9">
              <div className="card-body py-1">
                <div className="d-flex justify-content-between">
                  <h6 className="card-title mb-0 fw-bold text-muted small">
                    {item.company}
                  </h6>
                  <button
                    className="btn-close small"
                    onClick={() => handelRemoveButton(item.idName, dispatch)}
                  ></button>
                </div>
                <p className="card-text mb-1 fw-medium">{item.item_name}</p>

                <div className="mb-2">
                  <span className="fw-bold me-2">₹{item.current_price}</span>
                  <span className="text-decoration-line-through text-muted small">
                    ₹{item.original_price}
                  </span>
                  <span className="text-danger small ms-2 fw-bold">
                    ({item.discount_percentage}% OFF)
                  </span>
                </div>

                <div className="bg-light p-2 rounded border-start border-3 border-success">
                  <p className="mb-0 small">
                    <span className="fw-bold">{item.return_period} days</span>{" "}
                    return available
                  </p>
                  <p className="mb-0 small text-muted">
                    Delivery by{" "}
                    <span className="text-success fw-bold">
                      {item.delivery_date}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BagItem;
