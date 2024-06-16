import useProductUploadSellTypeField from '@/hooks/productUpload/useProductUploadSellTypeField';

export default function ProductUploadSellTypeField() {
  const { register, sellType } = useProductUploadSellTypeField();

  return (
    <fieldset className="border-b pb-8">
      <legend className="sr-only">판매유형</legend>
      <h3 className="font-semibold text-lg pt-8">
        판매유형 <span className="text-red-500">*</span>
      </h3>
      <div className="mt-5">
        <label>
          <input
            className="mr-2"
            type="radio"
            defaultChecked={sellType === "중고거래"}
            value={"중고거래"}
            {...register("sellType", {
              required: true
            })}
          />
          중고거래
        </label>
        <label className="ml-3">
          <input
            className="mr-2"
            type="radio"
            defaultChecked={sellType === "무료나눔"}
            value={"무료나눔"}
            {...register("sellType",{
              required: true
            })}
          />
          무료나눔
        </label>
      </div>
    </fieldset>
  );
}
