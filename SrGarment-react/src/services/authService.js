export const logoutService = async () => {
  try {
    const res = await fetch("http://localhost:3000/logout", {
      method: "post",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("logout unsucsessfull:", data.message);
    }
    console.log("logout done");
    return data;
  } catch (err) {
    console.log("logout error", err.message);
  }
};
