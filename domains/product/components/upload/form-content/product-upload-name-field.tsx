import useProductUploadNameField from "../../../hooks/upload/useProductUploadNameField";
import CoreInputField from "@/components/core-input-field/core-input-field";

export default function ProductUploadNameField() {
  const { productName, handleChangeProductName } = useProductUploadNameField();

  return (
    <div className="border-b py-8">
      <h3 className="font-semibold text-lg">
        상품명 <span className="text-red-500">*</span>
      </h3>
      <div className="max-w-[430px] flex gap-3 items-center mt-5">
        <CoreInputField
          label="상품명"
          inputId="name"
          inputName="name"
          inputType="text"
          inputClassName="w-full max-w-sm border border-gray-400 pl-4 pr-6 py-3"
          inputMaxLength={20}
          inputRequired
          inputPlaceholder="상품명을 입력해주세요."
          inputOnChange={handleChangeProductName}
        />
        <span>{productName?.length || 0}/20</span>
      </div>
    </div>
  );
}
