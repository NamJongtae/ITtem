import { isMobile } from "react-device-detect";
import ReviewUploadModalReviewStar from "./review-upload-modal-review-star";
import ReviewUploadModalReviewTags from "./review-upload-modal-review-tags";
import ReviewUploadModalReviewTextarea from "./review-upload-modal-review-textarea";
import ReviewUploadModalSubmitBtn from "./review-upload-modal-submit-btn";
import ReviewUploadModalCloseBtn from "./review-upload-modal-close-btn";
import useReviewModalRefs from "@/domains/product/hooks/manage/useReviewModalRefs";
import ReviewUploadModalHeader from "./review-upload-modal-header";
import { escKeyClose } from "@/utils/optimizationKeyboard";

interface IProps {
  handleClickCloseBtn: () => void;
}

export default function ReviewUploadModalFormContents({
  handleClickCloseBtn
}: IProps) {
  const { starRef, textareaRef, submitBtnRef, closeBtnRef } =
    useReviewModalRefs();

  return (
    <div
      className={`${
        isMobile ? "h-screen" : "max-w-[480px]"
      } fixed center z-30 flex flex-col gap-3 w-full p-8 border bg-white`}
      onKeyDown={(e) => escKeyClose({ event: e, closeCb: handleClickCloseBtn })}
    >
      <ReviewUploadModalHeader />

      <ReviewUploadModalReviewStar ref={starRef} closeBtnRef={closeBtnRef} />

      <ReviewUploadModalReviewTags />

      <ReviewUploadModalReviewTextarea ref={textareaRef} />

      <ReviewUploadModalSubmitBtn ref={submitBtnRef} />

      <ReviewUploadModalCloseBtn
        handleClickCloseBtn={handleClickCloseBtn}
        ref={closeBtnRef}
        textareaRef={textareaRef}
        starRef={starRef}
        submitBtnRef={submitBtnRef}
      />
    </div>
  );
}
