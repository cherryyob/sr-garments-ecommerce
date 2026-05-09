import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addingToBag } from "../../store/bagItemSlice";
import { MdAddShoppingCart } from "react-icons/md";
import { FcDeleteDatabase } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { handelRemoveButton } from "../../store/bagItemSlice";

const HomeItem = ({ item }) => {
  const bagItem = useSelector((store) => store.bagItemsState.bageItemId);

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
        <div className="d-flex w-100 gap-2">
          {bagItem.includes(item.id) ? (
            <button
              type="button"
              className="btn btn-add-bag btn-danger w-75 btn-pop btn-pop:hover"
              onClick={() => {
                handelRemoveButton(item.id, dispatch);
              }}
            >
              <FcDeleteDatabase /> Remove
            </button>
          ) : (
            <button
              type="button"
              onClick={handelAddToBagButton}
              className="btn btn-add-bag btn-success w-75 btn-pop btn-pop:hover"
            >
              <MdAddShoppingCart /> Add To Bag
            </button>
          )}
          <button
            type="button"
            onClick={handelAddToBagButton}
            className="btn btn-add-bag btn-success w-25  btn-pop btn-pop:hover"
          >
            <FaRegHeart />
          </button>
        </div>
      </div>
    </>
  );
};
export default HomeItem;
