import React, { forwardRef } from "react";

const AddressModalInput = forwardRef<HTMLInputElement | null>((_, ref) => {
  return (
    <input
      ref={ref}
      className="w-full border border-gray-400 py-3 px-5 pr-10"
      placeholder="주소 입력"
    />
  );
});
AddressModalInput.displayName = "AddressModalInput";

export default AddressModalInput;
