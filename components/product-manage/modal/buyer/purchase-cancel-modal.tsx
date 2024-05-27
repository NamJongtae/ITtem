import usePurchaseCancelRequestMutate from "@/hooks/querys/usePurchaseCancelRequestMutate";
import ProductManageModal from "../product-manage-modal";
import { FieldValues } from "react-hook-form";

interface IProps {
  productId: string;
  closeModal: () => void;
}

export default function PurchaseCancelModal({ productId, closeModal }: IProps) {
  const { purchaseCancelRequestMutate } = usePurchaseCancelRequestMutate();

  const onSubmit = (values: FieldValues) => {
    const cancelReason: string =
      values.cancelReason === "직접입력"
        ? values.cancelReasonText
        : values.cancelReason;

    purchaseCancelRequestMutate({ productId, cancelReason });
    closeModal();
  };

  return (
    <ProductManageModal
      closeModal={closeModal}
      title={"상품 구매 취소"}
      options={["취소사유 선택", "단순 변심", "가격이 비쌈", "직접입력"]}
      name={"cancelReason"}
      submitBtnText={"구매취소"}
      onSubmit={onSubmit}
    />
  );
}
