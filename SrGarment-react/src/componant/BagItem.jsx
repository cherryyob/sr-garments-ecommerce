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
      {/* 2. Use .map() to loop through the array */}
      {items.map((item) => (
        <div className="bag-item-container" key={item.id}>
          <div className="item-left-part">
            <img
              className="bag-item-img"
              src={item.image}
              alt={item.item_name}
            />
          </div>
          <div className="item-right-part">
            {/* 3. Removed the '$' from inside the braces */}
            <div className="company">{item.company}</div>
            <div className="item-name">{item.item_name}</div>
            <div className="price-container">
              <span className="current-price">Rs {item.current_price}</span>
              <span className="original-price">Rs {item.original_price}</span>
              <span className="discount-percentage">
                ({item.discount_percentage}% OFF)
              </span>
            </div>
            <div className="return-period">
              <span className="return-period-days">
                {item.return_period} days
              </span>{" "}
              return available
            </div>
            <div className="delivery-details">
              Delivery by{" "}
              <span className="delivery-details-days">
                {item.delivery_date}
              </span>
            </div>
          </div>

          <div
            className="remove-from-cart"
            onClick={() => handelRemoveButton(item.id, dispatch)}
          >
            X
          </div>
        </div>
      ))}
    </>
  );
};

export default BagItem;
