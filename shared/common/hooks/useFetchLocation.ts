import useLocationStore from "../store/locationStore";
import useLocation from "./useLocation";
import { useEffect } from "react";

export default function useFetchLocation() {
  const { fetchCurrentLocation } = useLocation();
  const checkedLoacation = useLocationStore((state) => state.checkedLoacation);
  const actions = useLocationStore((state) => state.actions);
  const checked = checkedLoacation;

  useEffect(() => {
    if (checked) {
      fetchCurrentLocation();
    } else {
      actions.resetLocation();
    }
  }, [checked, fetchCurrentLocation, actions]);
}
