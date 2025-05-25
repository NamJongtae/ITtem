import Modal from "../commons/reason/Modal";
import useProductReturnSubmit from "@/domains/product/manage/hooks/useProductReturnSubmit";

interface IProps {
  productId: string;
  handleClickCloseBtn: () => void;
}

export default function ProductReturnModal({
  productId,
  handleClickCloseBtn
}: IProps) {
  const { onSubmit } = useProductReturnSubmit({
    closeModal: handleClickCloseBtn,
    productId
  });

  return (
    <Modal
      handleClickCloseBtn={handleClickCloseBtn}
      title={"상품 반품 요청"}
      options={[
        "반품사유 선택",
        "단순 변심",
        "파손된 상품",
        "제품 하자 발생",
        "설명과 다른 제품",
        "직접입력"
      ]}
      name={"returnReason"}
      submitBtnText={"반품요청"}
      onSubmit={onSubmit}
    />
  );
}
