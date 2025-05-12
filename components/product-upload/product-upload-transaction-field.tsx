import useProductUploadTransactionField from "@/hooks/product-upload/useProductUploadTransactionField";

export default function ProductUploadTransactionField() {
  const { register, transaction } = useProductUploadTransactionField();

  return (
    <fieldset className="border-b pb-8">
      <legend className="sr-only">거래방식</legend>
      <h3 className="font-semibold text-lg pt-8">
        거래방식 <span className="text-red-500">*</span>
      </h3>
      <div className="mt-5">
        <label>
          <input
            className="mr-2"
            type="radio"
            value="직거래"
            defaultChecked={transaction === "직거래"}
            {...register("transaction", {
              required: true,
            })}
          />
          직거래
        </label>
        <label className="ml-3">
          <input
            className="mr-2"
            type="radio"
            value="택배"
            defaultChecked={transaction === "택배"}
            {...register("transaction", {
              required: true,
            })}
          />
          택배
        </label>
        <label className="ml-3">
          <input
            className="mr-2"
            type="radio"
            value="모두"
            defaultChecked={transaction === "모두"}
            {...register("transaction", {
              required: true,
            })}
          />
          모두( 직거래, 택배 )
        </label>
      </div>
    </fieldset>
  );
}
