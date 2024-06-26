import { FieldValues } from "react-hook-form";
import useProductReturnRequestMutate from "../reactQuery/mutations/trade/useProductReturnRequestMutate";

interface IPrarms {
  closeModal: () => void;
  productId: string;
}

export default function useProductReturnModal({
  closeModal,
  productId,
}: IPrarms) {
  const { productReturnRequestMutate } = useProductReturnRequestMutate();
  const onSubmit = (values: FieldValues) => {
    const returnReason: string =
      values.returnReason === "직접입력"
        ? values.returnReasonText
        : values.returnReason;

    productReturnRequestMutate({ productId, returnReason });
    closeModal();
  };

  return { onSubmit };
}
