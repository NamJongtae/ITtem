import Modal from "../commons/reason/Modal";
import usePurchaseCancelSubmit from "@/domains/product/manage/hooks/usePurchaseCancelSubmit";

interface IProps {
  productId: string;
  handleClickCloseBtn: () => void;
}

export default function PurchaseCancelModal({
  productId,
  handleClickCloseBtn
}: IProps) {
  const { onSubmit } = usePurchaseCancelSubmit({
    closeModal: handleClickCloseBtn,
    productId
  });

  return (
    <Modal
      handleClickCloseBtn={handleClickCloseBtn}
      title={"상품 구매 취소"}
      options={["취소사유 선택", "단순 변심", "가격이 비쌈", "직접입력"]}
      name={"cancelReason"}
      submitBtnText={"구매취소"}
      onSubmit={onSubmit}
    />
  );
}
