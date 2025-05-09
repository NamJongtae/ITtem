import Portal from "../commons/portal/Portal";
import { isMobile } from "react-device-detect";
import useAddressList from "@/hooks/product-upload/address-modal/useAddressList";
import AddressModalForm from "./address-modal-form";
import AddressModalList from "./address-modal-list";
import AddressModalCloseBtn from "./address-modal-close- btn";
import AddressModalHeader from "./address-modal-header";
import AddressModalBackdrop from "./address-modal-backdrop";

interface IProps {
  closeModal: () => void;
  addAddress: (address: string) => void;
}

export default function AddressModal({ closeModal, addAddress }: IProps) {
  const { addressList, setAddressList } = useAddressList();

  return (
    <Portal>
      <AddressModalBackdrop closeModal={closeModal} />
      <div
        className={`${
          isMobile ? "w-full h-screen" : "w-[500px] h-[500px]"
        } fixed center bg-white p-5 rounded-sm z-50`}
      >
        <AddressModalHeader />
        <AddressModalForm setAddressList={setAddressList} />
        <AddressModalList addAddress={addAddress} addressList={addressList} />
        <AddressModalCloseBtn closeModal={closeModal} />
      </div>
    </Portal>
  );
}
