import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAddShoppingCart } from "react-icons/md";
import { FcDeleteDatabase } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  addWishList,
  removeWishList,
  getWishList,
} from "../services/wishListService";
import {
  handelAddToBagButton,
  handelRemoveButton,
} from "../../utility/helperFunctions";
import { useState } from "react";

const HomeItem = ({ item }) => {
  const [updateAddress, setUpdateAddress] = useState(0);
  //setUpdateAddress((prev) => prev + 1);
  const [wishList, setWishList] = useState([]);
  useEffect(() => {
    const fn = async () => {
      const wishLst = await getWishList();
      setWishList(wishLst || []);
      console.log(wishLst, "jijiji");
    };
    fn();
  }, []);

  const handelWishList = async (productId) => {
    const updatedWishList = await addWishList(productId);
    if (!updatedWishList) {
      alert("Already In You Cart");
    }
    console.log(updatedWishList, "hihihi");
  };
  // Accessing the bag items from the Redux store to determine if the current item is in the bag
  const bagItem = useSelector((store) => store.bagItemsState.bageItemId);

  const dispatch = useDispatch();

  return (
    <>
      <div
        className="item-container card border-0 shadow-sm p-2"
        style={{ cursor: "pointer", transition: "all 0.3s ease" }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.classList.replace("shadow-sm", "shadow");
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.classList.replace("shadow", "shadow-sm");
        }}
      >
        <Link to={`/itemDetails/${item.idName}`}>
          <img
            className="card-img-top rounded"
            src={item.image}
            alt="item image"
            style={{ height: "280px", objectFit: "cover" }}
          />
        </Link>

        <div className="card-body p-2">
          <div className="rating small fw-bold mb-1">
            {item.rating.stars} ⭐ | {item.rating.count}
          </div>
          <div className="company-name fw-bold text-uppercase small text-muted">
            {item.company}
          </div>
          <div className="item-name text-truncate mb-2">{item.item_name}</div>

          <div className="price mb-3">
            <span className="current-price fw-bold me-1">
              Rs {item.current_price}
            </span>
            <span className="original-price text-muted text-decoration-line-through small me-1">
              Rs {item.original_price}
            </span>
            <span className="discount text-danger small fw-bold">
              ({item.discount_percentage}% OFF)
            </span>
          </div>

          <div className="d-flex w-100 gap-2">
            {bagItem.includes(item.idName) ? (
              <button
                type="button"
                className="btn btn-danger flex-grow-1 d-flex align-items-center justify-content-center gap-2 fw-bold"
                onClick={() => handelRemoveButton(item.idName, dispatch)}
              >
                <FcDeleteDatabase /> Remove
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  handelAddToBagButton(item.idName, dispatch);
                }}
                className="btn btn-success flex-grow-1 d-flex align-items-center justify-content-center gap-2 fw-bold"
              >
                <MdAddShoppingCart /> Add To Bag
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                handelWishList(item.idName);
              }}
              className="btn btn-outline-success px-3"
            >
              <FaRegHeart />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomeItem;
