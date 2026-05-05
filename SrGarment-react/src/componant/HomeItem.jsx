import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addingToBag } from "../../store/bagItemSlice";
import { MdAddShoppingCart } from "react-icons/md";
import { FcDeleteDatabase } from "react-icons/fc";

const HomeItem = ({ item }) => {
  const bagItem = useSelector((store) => store.bagItemsState);

  const add = "Add To Bag";
  const dispatch = useDispatch();
  const handelAddToBagButton = async () => {
    try {
      const response = await fetch("http://localhost:3000/bag", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });
      if (!response.ok) {
        throw new Error("FaildTo Add To Bag");
      } else {
        const updatedBagCount = await response.json();
        dispatch(addingToBag(updatedBagCount));
      }
    } catch (err) {
      console.log("errr may be already in your cart:", err);
    }
  };
  const handelRemoveButton = async () => {
    const response = await fetch("http://localhost:3000/removeItemById", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id }),
    });
    const updatedBagCount = await response.json();
    dispatch(addingToBag(updatedBagCount));
  };

  return (
    <>
      <div className="item-container">
        {}
        <img className="item-image" src={item.image} alt="item image" />
        <div className="rating">
          {item.rating.stars} ⭐ | {item.rating.count}
        </div>
        <div className="company-name">{item.company}</div>
        <div className="item-name">{item.item_name}</div>
        <div className="price">
          <span className="current-price">Rs {item.current_price}</span>
          <span className="original-price">Rs {item.original_price}</span>
          <span className="discount">({item.discount_percentage}% OFF)</span>
        </div>
        {bagItem.includes(item.id) ? (
          <button
            type="button"
            className="btn btn-add-bag btn-danger"
            onClick={handelRemoveButton}
          >
            <FcDeleteDatabase /> Remove
          </button>
        ) : (
          <button
            type="button"
            onClick={handelAddToBagButton}
            className="btn btn-add-bag btn-success"
          >
            <MdAddShoppingCart /> Add To Bag
          </button>
        )}
      </div>
    </>
  );
};
export default HomeItem;
