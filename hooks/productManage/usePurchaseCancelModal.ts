import usePurchaseCancelRequestMutate from "../reactQuery/mutations/trade/usePurchaseCancelRequestMutate";
import { FieldValues } from "react-hook-form";

interface IPrarms {
  closeModal: () => void;
  productId: string;
}

export default function usePurchaseCancelModal({
  closeModal,
  productId,
}: IPrarms) {
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
