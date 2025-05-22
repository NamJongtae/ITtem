import { useFormContext } from "react-hook-form";

export default function useProductUploadTransactionField() {
  const { register, getValues } = useFormContext();
  const transaction = getValues("transaction");

  return { register, transaction };
}
