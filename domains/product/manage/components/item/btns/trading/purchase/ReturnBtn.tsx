import useModal from "@/shared/common/hooks/useModal";
import ProductReturnModal from "../../../../modal/purchase/ProductReturnModal";

interface IProps {
  productId: string;
}

export default function ReturnBtn({ productId }: IProps) {
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal();
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 bg-gray-500 text-white font-semibold betterhover:hover:bg-gray-600"
      >
        반품 요청
      </button>
      {isOpenModal && (
        <ProductReturnModal
          productId={productId}
          handleClickCloseBtn={handleClickCloseBtn}
        />
      )}
    </>
  );
}
