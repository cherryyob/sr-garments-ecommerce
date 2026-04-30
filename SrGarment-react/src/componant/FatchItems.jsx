import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addInitialItems } from "../../store/itemSlice";

const FatchingItems = () => {
  const dispatch = useDispatch();
  const fatch = useSelector((store) => store.faatchStatus);

  useEffect(() => {
    if (fatch.fatchgDone) return;
    const ctr = new AbortController();
    const signal = ctr.signal;

    fetch("http://localhost:3000/items", { signal })
      .then((res) => res.json())
      .then(({ items }) => {
        dispatch(addInitialItems(items));
      });
    return () => {
      ctr.abort();
    };
  }, [fatch]);
  return;
};
export default FatchingItems;
