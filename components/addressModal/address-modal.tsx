"use client";

import Portal from "../commons/portal/Portal";
import Image from "next/image";
import useAddressModal from "@/hooks/productUpload/useAddressModal";

interface IProps {
  closeModal: () => void;
  addAddress: (address: string) => void;
}

export default function AddressModal({ closeModal, addAddress }: IProps) {
  const { addressData, handleSearch, handleClickAddress, addressRef } =
    useAddressModal(addAddress);

  return (
    <Portal>
      <div
        onClick={closeModal}
        className="fixed bg-black bg-opacity-50 inset-0 z-40"
        role="modal-backdrop"
      />
      <div className="fixed center w-[500px] h-[500px] bg-white p-5 rounded-sm z-50">
        <h2 className="font-semibold text-2xl border-b-2 border-gray-700 pb-5">
          주소 검색
        </h2>
        <form className="relative mt-5" onSubmit={handleSearch}>
          <input
            ref={addressRef}
            className="w-full border border-gray-400 py-3 px-5 pr-10"
            placeholder="주소 입력"
          />
          <button
            type="submit"
            className="absolute top-1/2 -translate-y-1/2 right-3"
          >
            <Image
              src={"/icons/search_icon.svg"}
              alt="주소 검색"
              width={30}
              height={30}
            />
          </button>
        </form>
        <ul className="mt-5 h-[316px] overflow-y-scroll scrollbar">
          {addressData.map((data) => (
            <li key={data} className="w-full border-b">
              <button
                onClick={() => handleClickAddress(data)}
                className="w-full text-left betterhover:hover:bg-gray-100 p-3"
              >
                {data}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-5 right-5 p-1"
        >
          <Image
            src={
              "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj4KICAgIDxwYXRoIGZpbGw9IiMxRTFEMjkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjQxNCAxMGw2LjI5My02LjI5M2ExIDEgMCAxIDAtMS40MTQtMS40MTRMMTAgOC41ODUgMy43MDcgMi4yOTNhMSAxIDAgMCAwLTEuNDE0IDEuNDE0bDYuMjkzIDYuMjkyLTYuMjkzIDYuMjkzYTEgMSAwIDEgMCAxLjQxNCAxLjQxNEwxMCAxMS40MTNsNi4yOTMgNi4yOTNhLjk5Ny45OTcgMCAwIDAgMS40MTQgMCAuOTk5Ljk5OSAwIDAgMCAwLTEuNDE0TDExLjQxNCAxMHoiLz4KPC9zdmc+Cg=="
            }
            alt="닫기"
            width={20}
            height={20}
          />
        </button>
      </div>
    </Portal>
  );
}
