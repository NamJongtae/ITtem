import usePurchaseRequestRejectMutate from "@/hooks/reactQuery/mutations/trade/usePurchaseRequestRejectMutate";
import ProductManageModal from "../product-manage-modal";
import { FieldValues } from "react-hook-form";

interface IProps {
  productId: string;
  closeModal: () => void;
}

export default function PurchaseRequestRejectModal({
  productId,
  closeModal,
}: IProps) {
  const { purchaseRequestRejectMutate } = usePurchaseRequestRejectMutate();

  const onSubmit = (values: FieldValues) => {
    const rejectReason: string =
      values.rejectReason === "직접입력"
        ? values.rejectReasonText
        : values.rejectReason;

    purchaseRequestRejectMutate({ productId, rejectReason });
    closeModal();
  };

  return (
    <ProductManageModal
      closeModal={closeModal}
      title={"상품 구매 요청 거절"}
      options={[
        "거절사유 선택",
        "상품을 잘못 등록",
        "상품에 이상이 생김",
        "상품 오류",
        "직접입력",
      ]}
      name={"rejectReason"}
      submitBtnText={"구매요청 거절"}
      onSubmit={onSubmit}
    />
  );
}
