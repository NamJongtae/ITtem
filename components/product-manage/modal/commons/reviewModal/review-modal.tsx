import Loading from "@/components/commons/loading";
import Portal from "@/components/commons/portal/Portal";
import useProductReviewQuery from "@/hooks/reactQuery/queries/product/useProductReviewQuery";
import { isMobile } from "react-device-detect";
import ReviewModalReviewStar from "./review-modal-review-star";
import ReviewModalReviewTags from "./review-modal-review-tags";
import ReviewModalReviewer from "./review-modal-reviewer";
import ReviewModalReviewContent from "./review-modal-review-content";
import ReviewModalCloseBtn from "./review-modal-close-btn";
import ReviewModalHeader from "./review-modal-header";
import ReviewModalBackDrop from "./review-modal-back-drop";
import { escKeyClose } from "@/lib/optimizationKeyboard";

interface IProps {
  productId: string;
  handleClickCloseBtn: () => void;
}

export default function ReviewModal({
  productId,
  handleClickCloseBtn,
}: IProps) {
  const { data, isLoading } = useProductReviewQuery({
    productId,
    closeModal: handleClickCloseBtn,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Portal>
      <ReviewModalBackDrop handleClickCloseBtn={handleClickCloseBtn} />

      <div
        className={`${
          isMobile ? "h-screen" : "max-w-[480px]"
        } fixed center z-30 flex flex-col gap-3 w-full p-8 border bg-white`}
        onKeyDown={(e) =>
          escKeyClose({ event: e, closeCb: handleClickCloseBtn })
        }
      >
        <ReviewModalHeader />

        <ReviewModalReviewer reviewer={data?.reviewer} />

        <ReviewModalReviewStar reviewScore={data?.reviewScore} />

        <ReviewModalReviewTags reviewTags={data?.reviewTags} />

        <ReviewModalReviewContent reviewContent={data?.reviewContent} />

        <ReviewModalCloseBtn handleClickCloseBtn={handleClickCloseBtn} />
      </div>
    </Portal>
  );
}
