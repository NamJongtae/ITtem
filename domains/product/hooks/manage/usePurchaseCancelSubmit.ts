import usePurchaseCancelRequestMutate from "./mutations/usePurchaseCancelRequestMutate";
import { FieldValues } from "react-hook-form";

interface IParams {
  closeModal: () => void;
  productId: string;
}

export default function usePurchaseCancelSubmit({
  closeModal,
  productId
}: IParams) {
  const { purchaseCancelRequestMutate } = usePurchaseCancelRequestMutate();

  const onSubmit = (values: FieldValues) => {
    const cancelReason: string =
      values.cancelReason === "직접입력"
        ? values.cancelReasonText
        : values.cancelReason;

    purchaseCancelRequestMutate({ productId, cancelReason });
    closeModal();
  };

  return { onSubmit };
}
