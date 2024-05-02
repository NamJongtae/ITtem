import { useFormContext } from "react-hook-form";

export default function ProductUploadDeliveryFeeField() {
  const { register, getValues } = useFormContext();
  const deliveryFee = getValues("deliveryFee")
  return (
    <fieldset className="border-b pb-8">
      <legend className="sr-only">배송비</legend>
      <h3 className="font-semibold text-lg pt-8">
        배송비 <span className="text-red-500">*</span>
      </h3>
      <div className="mt-3">
        <label>
          <input
            className="mr-2"
            type="radio"
            value="포함"
            {...register("deliveryFee", { required: true })}
            defaultChecked={deliveryFee === "포함"}
          />
          포함
        </label>
        <label className="ml-3">
          <input
            className="mr-2"
            type="radio"
            value="비포함"
            {...register("deliveryFee", { required: true })}
            defaultChecked={deliveryFee === "비포함"}
          />
          비포함
        </label>
      </div>
    </fieldset>
  );
}
