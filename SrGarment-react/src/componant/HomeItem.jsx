import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addingToBag } from "../../store/bagItemSlice";

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();
  const addToBag = async () => {
    try {
      await fetch("http://localhost:3000/bag", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });
    } catch (err) {
      console.log("errr while add to bag:", err);
    }
    dispatch(addingToBag(10));
  };

  return (
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
      <button onClick={addToBag} className="btn btn-add-bag btn-success">
        Add to Bag
      </button>
    </div>
  );
};
export default HomeItem;
