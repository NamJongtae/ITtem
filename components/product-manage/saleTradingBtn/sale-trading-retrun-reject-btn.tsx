import ProductReturnRejectModal from "../modal/seller/product-return-reject-modal";
import useModal from "@/hooks/commons/useModal";

interface IProps {
  productId: string;
}

export default function SaleTradingRetrunRejectBtn({ productId }: IProps) {
  const { isOpenModal, openModal, closeModal } = useModal();
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600"
      >
        반품거절
      </button>
      {isOpenModal && (
        <ProductReturnRejectModal
          productId={productId}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
