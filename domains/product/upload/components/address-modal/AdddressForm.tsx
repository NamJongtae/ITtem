import useSearchAddressSubmit from "../../hooks/address-modal/useSearchAddressSubmit";
import Image from "next/image";
import AddressModalInput from "./AddressInput";

interface IProps {
  setAddressList: (addressList: string[]) => void;
}

export default function AdddressForm({ setAddressList }: IProps) {
  const { addressRef, onSubmit } = useSearchAddressSubmit({
    setAddressList
  });

  return (
    <form className="relative mt-5" onSubmit={onSubmit}>
      <AddressModalInput ref={addressRef} />
      <button
        type="submit"
        className="absolute top-1/2 -translate-y-1/2 right-3"
      >
        <Image
          src={"/icons/search-icon.svg"}
          alt="주소 검색"
          width={30}
          height={30}
        />
      </button>
    </form>
  );
}
