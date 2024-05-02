import { useFormContext } from "react-hook-form";

export default function ProductUploadReturnPolicyField() {
  const { register, getValues } = useFormContext();
  const returnPolicy = getValues("returnPolicy");

  return (
    <fieldset className="border-b pb-8">
      <legend className="sr-only">반품여부</legend>
      <h3 className="font-semibold text-lg pt-8">
        반품여부 <span className="text-red-500">*</span>
      </h3>
      <div className="mt-5">
        <label>
          <input
            className="mr-2"
            type="radio"
            defaultChecked={returnPolicy === "가능"}
            value={"가능"}
            {...register("returnPolicy", {
              required: true,
            })}
          />
          가능
        </label>
        <label className="ml-3">
          <input
            className="mr-2"
            type="radio"
            defaultChecked={returnPolicy === "불가능"}
            value={"불가능"}
            {...register("returnPolicy", {
              required: true,
            })}
          />
          불가능
        </label>
      </div>
    </fieldset>
  );
}
