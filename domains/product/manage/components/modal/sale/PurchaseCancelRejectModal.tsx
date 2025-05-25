import Modal from "../commons/reason/Modal";
import useCancelRejectMutate from "../../../hooks/mutations/useCancelRejectMutate";
import { FieldValues } from "react-hook-form";

interface IProps {
  productId: string;
  handleClickCloseBtn: () => void;
}

export default function PurchaseCancelRejectModal({
  productId,
  handleClickCloseBtn
}: IProps) {
  const { purchaseCancelRejectMutate } = useCancelRejectMutate();

  const onSubmit = (values: FieldValues) => {
    const rejectReason: string =
      values.rejectReason === "직접입력"
        ? values.rejectReasonText
        : values.rejectReason;

    purchaseCancelRejectMutate({ productId, rejectReason });
    handleClickCloseBtn();
  };

  return (
    <Modal
      handleClickCloseBtn={handleClickCloseBtn}
      title={"상품 구매 취소 거절"}
      options={["거절사유 선택", "이미 전달된 상품", "직접입력"]}
      name={"rejectReason"}
      submitBtnText={"구매취소 거절"}
      onSubmit={onSubmit}
    />
  );
}
