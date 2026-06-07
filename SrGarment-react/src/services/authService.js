export const logoutService = async () => {
  try {
    const res = await fetch("http://localhost:3000/logout", {
      method: "post",
      credentials: "include",
    });
    const data = await res.json();
    console.log(data, "datatat");
    if (!res.ok) {
      throw new Error("logout unsucsessfull:", data.message);
    }
    console.log("logout done");
    return data;
  } catch (err) {
    console.log("logout error", err.message);
  }
};
export const loginServices = async (loginData) => {
  try {
    //  Send data to the backend using fetch
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tells backend we are sending JSON
      },
      credentials: "include",
      body: JSON.stringify(loginData), // Converts JS object to JSON string
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    // Handle connection/network errors here
  }
};
export const saveAddress = async (addressData) => {
  console.log("Received address data:", addressData);
  try {
    //  Send data to the backend using fetch
    const response = await fetch("http://localhost:3000/userAddress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addressData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error:", error);
    // Handle connection/network errors here
  }
};
