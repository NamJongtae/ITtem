import { useFormContext } from "react-hook-form";

export default function useProductUploadReturnPolicyField() {
  const { register, getValues } = useFormContext();
  const returnPolicy = getValues("returnPolicy");

  return { register, returnPolicy };
}
