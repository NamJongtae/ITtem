import ProductReturnRejectModal from "../../../../modal/sale/product-return-reject-modal";
import useModal from "@/hooks/useModal";

interface IProps {
  productId: string;
}

export default function SaleTradingReturnRejectBtn({ productId }: IProps) {
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal();
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
          handleClickCloseBtn={handleClickCloseBtn}
        />
      )}
    </>
  );
}
