import usePurchaseCancelRequestMutate from "@/hooks/reactQuery/mutations/trade/usePurchaseCancelRequestMutate";
import ProductManageModal from "../product-manage-modal";
import { FieldValues } from "react-hook-form";
import usePurchaseCancelModal from "@/hooks/productManage/usePurchaseCancelModal";

interface IProps {
  productId: string;
  closeModal: () => void;
}

export default function PurchaseCancelModal({ productId, closeModal }: IProps) {
  const { onSubmit } = usePurchaseCancelModal({ closeModal, productId });

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
