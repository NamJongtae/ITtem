import { useEffect } from "react";
import useLocation from "../commons/useLocation";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { locationSlice } from "@/store/slice/location-slice";

export default function useProductLocationChkBox() {
  const { fetchCurrentLocation } = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const checked = useSelector(
    (state: RootState) => state.location.checkLoacation
  );

  const handleClickCheck = () => {
    dispatch(locationSlice.actions.setCheckLocation(!checked));
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
