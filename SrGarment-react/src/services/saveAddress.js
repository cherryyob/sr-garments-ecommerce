export const saveAddress = async (addressData) => {
  try {
    //  Send data to the backend using fetch
    const response = await fetch("http://localhost:3000/userAddress", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addressData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return alert("network error drink some water may be network work:");
  }
};
export const getAddress = async () => {
  try {
    const response = await fetch("http://localhost:3000/getAddress", {
      credentials: "include",
      method: "GET",
    });
    const add = await response.json();
    console.log("get address response:", add.message, add.data);
    return add.data;
  } catch (err) {
    return alert("network error drink some water may be network work:");
  }
};
