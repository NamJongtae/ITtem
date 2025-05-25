import Portal from "@/shared/common/components/Portal";
import { isMobile } from "react-device-detect";
import useAddressList from "../../hooks/address-modal/useAddressList";
import AddressForm from "./AdddressForm";
import AddressList from "./AddressList";
import ModalCloseBtn from "./ModalCloseBtn";
import AddressHeader from "./AddressHeader";
import Backdrop from "./BackDrop";

interface IProps {
  closeModal: () => void;
  addAddress: (address: string) => void;
}

export default function AddressModal({ closeModal, addAddress }: IProps) {
  const { addressList, setAddressList } = useAddressList();

  return (
    <Portal>
      <Backdrop closeModal={closeModal} />
      <div
        className={`${
          isMobile ? "w-full h-screen" : "w-[500px] h-[500px]"
        } fixed center bg-white p-5 rounded-sm z-50`}
      >
        <AddressHeader />
        <AddressForm setAddressList={setAddressList} />
        <AddressList addAddress={addAddress} addressList={addressList} />
        <ModalCloseBtn closeModal={closeModal} />
      </div>
    </Portal>
  );
}
