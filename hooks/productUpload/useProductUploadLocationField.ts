import { useFormContext } from "react-hook-form";
import useModal from "../commons/useModal";
import useLocation from '../commons/useLocation';

export default function useProductUploadLocationField() {
  const { register, setValue } = useFormContext();

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

  const { isOpenModal, openModal, closeModal } = useModal();

  const addAddress = (address: string) => {
    selectAddress(address);
    closeModal();
  };

  return {
    register,
    isOpenModal,
    openModal,
    closeModal,
    fetchCurrentLocation,
    selectNoPreferenceAddress,
    addAddress,
  };
}
