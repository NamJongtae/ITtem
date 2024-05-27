import ProductManageModal from "../product-manage-modal";
import useReturnRejectMutate from "@/hooks/querys/useReturnReceiptReject.Mutate";
import { FieldValues } from "react-hook-form";

interface IProps {
  productId: string;
  closeModal: () => void;
}

export default function ProductReturnRejectModal({
  productId,
  closeModal,
}: IProps) {
  const { returnRejectMutate } = useReturnRejectMutate();

  const onSubmit = (values: FieldValues) => {
    const rejectReason: string =
      values.rejectReason === "직접입력"
        ? values.rejectReasonText
        : values.rejectReason;

    returnRejectMutate({ productId, rejectReason });
    closeModal();
  };

  return (
    <ProductManageModal
      closeModal={closeModal}
      title={"상품 반품 거절"}
      options={["거절사유 선택", "구매자 파손 상품", "반품 기간 만료", "직접입력"]}
      name={"rejectReason"}
      submitBtnText={"반품거절"}
      onSubmit={onSubmit}
    />
  )
}
