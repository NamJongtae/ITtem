import ReasonModal from "../commons/reasonModal/reason-modal";
import useProductReturnModal from "@/hooks/productManage/useProductReturnModal";

interface IProps {
  productId: string;
  handleClickCloseBtn: () => void;
}

export default function ProductReturnModal({
  productId,
  handleClickCloseBtn,
}: IProps) {
  const { onSubmit } = useProductReturnModal({
    closeModal: handleClickCloseBtn,
    productId,
  });

  return (
    <ReasonModal
      handleClickCloseBtn={handleClickCloseBtn}
      title={"상품 반품 요청"}
      options={[
        "반품사유 선택",
        "단순 변심",
        "파손된 상품",
        "제품 하자 발생",
        "설명과 다른 제품",
        "직접입력",
      ]}
      name={"returnReason"}
      submitBtnText={"반품요청"}
      onSubmit={onSubmit}
    />
  );
}
