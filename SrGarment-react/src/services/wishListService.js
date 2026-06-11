export const addWishList = async (productId) => {
  console.log("form wishListService", productId);
  try {
    const response = await fetch("http://localhost:3000/addWishlist", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId }),
    });
    const result = await response.json();
    if (!result.succes) {
      return false;
    } else {
      console.log("Added to wishlist successfully", result.data);
      return result.data;
    }
  } catch (err) {
    console.error("Error adding to wishlist:", err);
  }
};
export const getWishList = async () => {
  try {
    const response = await fetch("http://localhost:3000/getWishlist", {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    if (!result.succes) {
      return result.message;
    } else {
      console.log("Wishlist data fetched successfully", result.data);
      return result.data;
    }
  } catch (err) {
    console.error("Error fetching wishlist:", err);
  }
};
export const removeWishList = async (productId) => {
  try {
    const response = await fetch("http://localhost:3000/removeWishlist", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId }),
    });
    const result = await response.json();
    if (!result.data) {
      console.log("Failed to remove from wishlist", result.message);
      return;
    } else {
      console.log("Removed from wishlist successfully", result.data);
      return result;
    }
  } catch (err) {
    console.error("Error removing from wishlist:", err);
  }
};
