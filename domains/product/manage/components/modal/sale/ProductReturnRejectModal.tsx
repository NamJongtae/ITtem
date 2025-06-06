import Modal from "../commons/reason/Modal";
import useReturnRejectMutate from "../../../hooks/mutations/useReturnReceiptRejectMutate";
import { FieldValues } from "react-hook-form";

interface IProps {
  productId: string;
  handleClickCloseBtn: () => void;
}

export default function ProductReturnRejectModal({
  productId,
  handleClickCloseBtn
}: IProps) {
  const { returnRejectMutate } = useReturnRejectMutate();

  const onSubmit = (values: FieldValues) => {
    const rejectReason: string =
      values.rejectReason === "직접입력"
        ? values.rejectReasonText
        : values.rejectReason;

    returnRejectMutate({ productId, rejectReason });
    handleClickCloseBtn();
  };

  return (
    <Modal
      handleClickCloseBtn={handleClickCloseBtn}
      title={"상품 반품 거절"}
      options={[
        "거절사유 선택",
        "구매자 파손 상품",
        "반품 기간 만료",
        "직접입력"
      ]}
      name={"rejectReason"}
      submitBtnText={"반품거절"}
      onSubmit={onSubmit}
    />
  );
}
