import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { modalSlice } from "../store/modalSlice";

export default function useNotification() {
  const isOpenNotification = useSelector(
    (state: RootState) => state.modal.isOpenNotification
  );
  const dispatch = useDispatch<AppDispatch>();
  const notificationRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const openNotification = () => {
    dispatch(modalSlice.actions.openNotification());
  };

  const closeNotification = useCallback(() => {
    if (!notificationRef.current) return;
    notificationRef.current.classList.add("animate-leaving");
    timerRef.current = setTimeout(() => {
      dispatch(modalSlice.actions.closeNotificaiton());
    }, 180);
    return;
  }, []);

  const toggleNotification = () => {
    if (isOpenNotification) {
      closeNotification();
      return;
    }
    openNotification();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        closeNotification();
      }
    };

    if (isOpenNotification) {
      document.addEventListener("mousedown", handleClickOutside);
    }


    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [closeNotification, isOpenNotification]);

  return { isOpenNotification, toggleNotification, notificationRef };
}
