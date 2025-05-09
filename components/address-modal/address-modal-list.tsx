import React from "react";
import { isMobile } from "react-device-detect";

interface IProps {
  addressList: string[];
  addAddress: (address: string) => void;
}

export default function AddressModalList({ addressList, addAddress }: IProps) {
  return (
    <ul
      className={`${
        isMobile ? "h-[calc(100vh-180px)]" : "h-[316px]"
      } mt-5 overflow-y-auto scrollbar`}
    >
      {addressList.map((data) => (
        <li key={data} className="w-full border-b">
          <button
            onClick={() => addAddress(data)}
            className="w-full text-left betterhover:hover:bg-gray-100 p-3"
          >
            {data}
          </button>
        </li>
      ))}
    </ul>
  );
}
