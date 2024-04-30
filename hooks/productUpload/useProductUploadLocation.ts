import useLocation from "../commons/useLocation";
import { useFormContext } from "react-hook-form";
export default function useProductUploadLocation() {
  const { setValue, getValues } = useFormContext();
  const location = getValues("location");
  const saveLocation = (address: string) => {
    setValue("location", address, { shouldDirty: true });
  };
  const { fetchCurrentLocation } = useLocation(saveLocation);

  const selectAddress = (address: string) => {
    setValue("location", address, { shouldDirty: true });
  };

  const selectNoPreferenceAddress = () => {
    setValue("location", "지역 무관", { shouldDirty: true });
  };

  return {
    selectAddress,
    fetchCurrentLocation,
    selectNoPreferenceAddress,
  };
}
