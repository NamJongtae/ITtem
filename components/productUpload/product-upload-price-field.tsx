import useProductUploadPrice from "@/hooks/productUpload/useProductUploadPrice";
import CoreInputField from "../commons/coreInputField/core-input-field";

export default function ProductUploadPriceField() {
  const { onChangePrice } = useProductUploadPrice();

  return (
    <div className="border-b py-8">
      <label className="sr-only">가격</label>
      <h3 className="font-semibold text-lg">
        가격 <span className="text-red-500">*</span>
      </h3>

      <div className="relative flex justify-between items-center mt-5 max-w-xs">
        <CoreInputField
          label="상품가격"
          inputId="price"
          inputName="price"
          inputType="text"
          inputClassName="w-full border border-gray-400 p-3 pr-14"
          inputMaxLength={11}
          inputRequired
          inputPlaceholder="상품 가격을 입력해주세요."
          inputOnChange={onChangePrice}
        />
        <span className="absolute right-9 font-sm text-gray-400">원</span>
      </div>
    </div>
  );
}
