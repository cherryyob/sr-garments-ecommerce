import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addInitialItems } from "../../store/itemSlice";
import {
  markFatchDone,
  fatchingOnWay,
  fatchingFinished,
} from "../../store/fatchingStatushSlice";
import { login } from "../../store/authSlice";

const FatchingItems = () => {
  const dispatch = useDispatch();
  const fatch = useSelector((store) => store.faatchStatus);

  useEffect(() => {
    if (fatch.fatchgDone) return;

    const ctr = new AbortController();
    const signal = ctr.signal;

    dispatch(fatchingOnWay());

    fetch("http://localhost:3000/items", { signal, credentials: "include" })
      .then((res) => res.json())
      .then(({ items, isLogin, user }) => {
        console.log(isLogin, "is login in fatch");
        dispatch(markFatchDone());
        if (isLogin) {
          dispatch(login({ user: user }));
        }

        dispatch(addInitialItems(items));
        dispatch(fatchingFinished());
      });

    return () => {
      try {
        ctr.abort();
      } catch (error) {
        error.name === "AbortError"
          ? console.log("cleaning fatch")
          : console.log("Error while cleaning fatch :", error);
      }
    };
  }, [fatch]);

  return null;
};

export default FatchingItems;
