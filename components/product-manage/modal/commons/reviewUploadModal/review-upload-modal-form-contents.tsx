import React from "react";
import { isMobile } from "react-device-detect";
import ReviewUploadModalReviewStar from "./review-upload-modal-review-star";
import ReviewUploadModalReviewTags from "./review-upload-modal-review-tags";
import ReviewUploadModalTextarea from "./review-upload-modal-textarea";
import ReviewUploadModalSubmitBtn from "./review-upload-modal-submit-btn";
import ReviewUploadModalCloseBtn from "./review-upload-modal-close-btn";
import useReviewUploadModalFomContents from "@/hooks/productManage/useReviewUploadModalFomContents";

interface IProps {
  handleClickCloseBtn: () => void;
}

export default function ReviewUploadModalFormContents({
  handleClickCloseBtn,
}: IProps) {
  const { starRef, textareaRef, submitBtnRef, closeBtnRef } =
    useReviewUploadModalFomContents();

  return (
    <div
      className={`${
        isMobile ? "h-screen" : "max-w-[480px]"
      } fixed center z-30 flex flex-col gap-3 w-full p-8 border bg-white`}
    >
      <h2
        className={`${
          isMobile ? "mt-10" : "mt-3"
        } text-xl text-center font-semibold mb-3`}
      >
        리뷰 작성
      </h2>

      <ReviewUploadModalReviewStar ref={starRef} closeBtnRef={closeBtnRef} />

      <ReviewUploadModalReviewTags />

      <ReviewUploadModalTextarea ref={textareaRef} />

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
