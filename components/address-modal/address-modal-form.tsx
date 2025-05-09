import { useAddressInput } from "@/hooks/product-upload/address-modal/useAddressInput";
import useSearchAddressSubmit from "@/hooks/product-upload/address-modal/useSearchAddressSubmit";
import Image from "next/image";
import React from "react";
import AddressModalInput from "./address-modal-input";

interface IProps {
  setAddressList: (addressList: string[]) => void;
}

export default function AddressModalForm({ setAddressList }: IProps) {
  const { addressRef } = useAddressInput();
  const { onSubmit } = useSearchAddressSubmit({
    addressRef,
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
