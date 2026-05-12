import { useDispatch } from "react-redux";
import { addingToBag } from "../../store/bagItemSlice";
import { useEffect } from "react";

const FetchBagItem = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("http://localhost:3000/bag", { signal })
      .then((rsl) => rsl.json())
      .then((data) => {
        dispatch(addingToBag(data));
        console.log(data, "data receved as items");
      });
    return () => {
      controller.abort();
    };
  }, []);
};
export default FetchBagItem;
