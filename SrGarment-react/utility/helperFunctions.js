import { addingToBag, removeFromFullDetails } from "../store/bagItemSlice";

const userFromStorge =
  localStorage.getItem("userlFind") &&
  localStorage.getItem("userlFind") !== "undefined"
    ? JSON.parse(localStorage.getItem("userlFind"))
    : null;

export const handelAddToBagButton = async (id, dispatch) => {
  try {
    if (!userFromStorge) {
      alert("Please login to add items to your bag.");

      window.location.href = "/LoginPage";

      return;
    } else {
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
        dispatch(addingToBag(updatedBagCount));
      }
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
