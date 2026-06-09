import { useDispatch } from "react-redux";
import { addingToBag } from "../../store/bagItemSlice";
import { useEffect } from "react";

const FetchBagItem = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const storage = localStorage.getItem("userlFind");

    const controller = new AbortController();
    const signal = controller.signal;
    fetch("http://localhost:3000/bag", { credentials: "include", signal })
      .then((rsl) => rsl.json())
      .then((data) => {
        dispatch(addingToBag(data));
      });
    return () => {
      controller.abort();
    };
  }, []);
};
export default FetchBagItem;
