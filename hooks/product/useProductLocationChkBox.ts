import { useEffect } from "react";
import useLocation from "../commons/useLocation";
import useLocationStore from "@/store/location-store";

export default function useProductLocationChkBox() {
  const { fetchCurrentLocation } = useLocation();

  const checkedLoacation = useLocationStore((state) => state.checkedLoacation);
  const actions = useLocationStore((state) => state.actions);

  const checked = checkedLoacation;

  const handleClickCheck = () => {
    actions.setCheckLocation(!checked);
  };

  useEffect(() => {
    if (checked) {
      fetchCurrentLocation();
    } else {
      actions.resetLocation();
    }
  }, [checked, fetchCurrentLocation, actions]);

  return { checked, handleClickCheck };
}
