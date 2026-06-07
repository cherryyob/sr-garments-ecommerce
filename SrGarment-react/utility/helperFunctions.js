import { addingToBag, removeFromFullDetails } from "../store/bagItemSlice";

export const handelAddToBagButton = async (id, dispatch) => {
  console.log("id in helper function", id);
  try {
    const response = await fetch("http://localhost:3000/bag", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id: id }),
    });
    if (!response.ok) {
      throw new Error("FaildTo Add To Bag");
    } else {
      const updatedBagCount = await response.json();
      console.log("updatedBagCount", updatedBagCount);
      dispatch(addingToBag(updatedBagCount));
    }
  } catch (err) {
    console.log("errr may be already in your cart:", err);
  }
};
export const handelRemoveButton = async (id, dispatch) => {
  const response = await fetch("http://localhost:3000/removeItemById", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id }),
  });
  const updatedBagCount = await response.json();
  dispatch(addingToBag(updatedBagCount));
  dispatch(removeFromFullDetails(id));
};
