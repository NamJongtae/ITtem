import useModal from "@/shared/common/hooks/useModal";
import AddressModal from "../address-modal/AddressModal";
import useProductUploadLocationField from "../../hooks/location-field/useProductUploadLocationField";
import useLocationSelector from "../../hooks/location-field/useLocationSelector";

export default function LocationField() {
  const { isOpenModal, openModal, closeModal } = useModal();
  const { register, setLocationValue } = useProductUploadLocationField();
  const { fetchCurrentLocation, selectNoPreferenceAddress, addAddress } =
    useLocationSelector({ setLocationValue, closeModal });

  return (
    <div className="border-b py-8">
      <label className="sr-only" htmlFor="location">
        거래지역
      </label>
      <h3 className="font-semibold text-lg">
        거래지역 <span className="text-red-500">*</span>
      </h3>
      <div className="flex gap-3 mt-5">
        <button
          onClick={fetchCurrentLocation}
          type="button"
          className="border border-gray-400 p-3 betterhover:hover:bg-gray-50"
        >
          내 현재 위치
        </button>
        <button
          onClick={openModal}
          type="button"
          className="border border-gray-400 p-3 betterhover:hover:bg-gray-50"
        >
          주소 검색
        </button>
        <button
          onClick={selectNoPreferenceAddress}
          type="button"
          className="border border-gray-400 p-3 betterhover:hover:bg-gray-50"
        >
          지역 무관
        </button>
      </div>

      <input
        className="mt-3 border border-gray-400 px-4 py-3 focus:outline-none bg-gray-100 placeholder:text-black w-full"
        readOnly
        placeholder="지역 선택"
        {...register("location", {
          required: true
        })}
      />
      {isOpenModal && (
        <AddressModal closeModal={closeModal} addAddress={addAddress} />
      )}
    </div>
  );
}
