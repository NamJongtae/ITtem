import useReviewUploadModalTextarea from "@/hooks/productManage/useReviewUploadModalTextarea";
import { forwardRef } from "react";

const ReviewUploadModalTextarea = forwardRef((props, ref) => {
  const { registerRef, rest } = useReviewUploadModalTextarea();
  
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

ReviewUploadModalTextarea.displayName = "ReviewUploadModalTextarea";
export default ReviewUploadModalTextarea;
