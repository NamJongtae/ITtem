import useModal from "@/shared/common/hooks/useModal";
import ReviewModal from "../../../../modal/commons/review/Modal";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import Loading from "@/shared/common/components/Loading";

interface IProps {
  productId: string;
}

export default function ReviewBtn({ productId }: IProps) {
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal();

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold betterhover:hover:bg-red-600"
      >
        리뷰 보기
      </button>
      {isOpenModal && (
        <SuspenseErrorBoundary
          suspenseFallback={<Loading />}
          errorMessage={
            "리뷰 정보를 불러올 수 없습니다\n잠시 후 다시 시도해주세요."
          }
        >
          <ReviewModal
            productId={productId}
            handleClickCloseBtn={handleClickCloseBtn}
          />
        </SuspenseErrorBoundary>
      )}
    </>
  );
}
