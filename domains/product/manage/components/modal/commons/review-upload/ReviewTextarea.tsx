import useReviewModalTextarea from "@/domains/product/manage/hooks/useReviewModalTextarea";
import { forwardRef } from "react";

const ReviewTextarea = forwardRef((props, ref) => {
  const { registerRef, rest } = useReviewModalTextarea();

  return (
    <>
      <label className="sr-only" htmlFor={"content"}>
        리뷰 직접 입력
      </label>
      <textarea
        className="root_input resize-none mt-3"
        {...rest}
        rows={6}
        id={"content"}
        placeholder="리뷰를 입력해주세요."
        maxLength={300}
        ref={(e) => {
          registerRef(e);
          if (ref && typeof ref !== "function") ref.current = e;
        }}
      />
    </>
  );
});

ReviewTextarea.displayName = "ReviewUploadModalReviewTextarea";
export default ReviewTextarea;
