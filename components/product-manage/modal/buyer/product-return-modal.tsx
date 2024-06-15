import { FieldValues } from "react-hook-form";
import ProductManageModal from "../product-manage-modal";
import useProductReturnRequestMutate from "@/hooks/reactQuery/mutations/trade/useProductReturnRequestMutate";
import useProductReturnModal from "@/hooks/productManage/useProductReturnModal";

interface IProps {
  productId: string;
  closeModal: () => void;
}

export default function ProductReturnModal({ productId, closeModal }: IProps) {
  const { onSubmit } = useProductReturnModal({ closeModal, productId });

  return (
    <ProductManageModal
      closeModal={closeModal}
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
