import { useFormContext } from "react-hook-form";

export default function useProductUploadDeliveryFeeField() {
  const { register, getValues } = useFormContext();
  const deliveryFee = getValues("deliveryFee");

  return { register, deliveryFee };
}
