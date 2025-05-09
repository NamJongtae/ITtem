import { FieldValues } from "react-hook-form";
import useProductReturnRequestMutate from "../react-query/mutations/trading/useProductReturnRequestMutate";

interface IParams {
  closeModal: () => void;
  productId: string;
}

export default function useProductReturnSubmit({
  closeModal,
  productId,
}: IParams) {
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
