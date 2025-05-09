import useLocation from "../../commons/useLocation";

interface IParams {
  setLocationValue: (address: string) => void;
  closeModal: () => void;
}

export default function useLocationSelector({
  setLocationValue,
  closeModal
}: IParams) {
  const selectAddress = (address: string) => {
    setLocationValue(address);
  };

  const selectNoPreferenceAddress = () => {
    setLocationValue("지역 무관");
  };

  const addAddress = (address: string) => {
    selectAddress(address);
    closeModal();
  };

  const { fetchCurrentLocation } = useLocation(selectAddress);

  return {
    fetchCurrentLocation,
    selectNoPreferenceAddress,
    addAddress
  };
}
