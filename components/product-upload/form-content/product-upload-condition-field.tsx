import useProductUploadConditionField from "@/hooks/product-upload/useProductUploadConditionField";

export default function ProductUploadConditionField() {
  const { register, currentCondition, getDescription } =
    useProductUploadConditionField();

  const PRODUCT_CONDITION = ["S", "A", "B", "C", "D"];

  return (
    <fieldset className="border-b pb-8 relative">
      <legend className="sr-only">상품상태</legend>
      <h3 className="font-semibold text-lg pt-8">
        상품상태 <span className="text-red-500">*</span>
      </h3>
      <div className="inline-flex flex-col gap-5 mt-5">
        {PRODUCT_CONDITION.map((condition) => (
          <label key={condition}>
            <input
              className="mr-2"
              type="radio"
              value={condition}
              defaultChecked={currentCondition === condition}
              {...register("condition")}
            />
            {condition}급 -{" "}
            <span className="text-sm text-gray-500">
              {getDescription(condition)}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
