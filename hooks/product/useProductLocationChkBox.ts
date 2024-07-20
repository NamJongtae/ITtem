import { useEffect, useState } from "react";
import useLocation from "../commons/useLocation";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { locationSlice } from "@/store/locationSlice";

export default function useProductLocationChkBox() {
  const { fetchCurrentLocation } = useLocation();

  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleClickCheck = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    if (checked) {
      fetchCurrentLocation();
    } else {
      dispatch(locationSlice.actions.resetLocation());
    }
  }, [checked, fetchCurrentLocation, dispatch]);

  return { checked, handleClickCheck };
}
