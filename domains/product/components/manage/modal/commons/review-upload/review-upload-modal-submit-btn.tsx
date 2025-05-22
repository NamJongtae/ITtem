import useReviewSubmitDisabled from "@/domains/product/hooks/manage/useReviewSubmitDisabled";
import { forwardRef } from "react";

const ReviewUploadModalSubmitBtn = forwardRef<HTMLButtonElement | null>(
  (props, ref) => {
    const { isDisabled } = useReviewSubmitDisabled();

    return (
      <button
        type="submit"
        className="w-full mx-auto mt-5 py-2 px-4 bg-[#66a2fb] text-white font-medium betterhover:hover:bg-[#3c87f8] disabled:opacity-50"
        disabled={isDisabled}
        ref={ref}
      >
        리뷰 작성
      </button>
    );
  }
);

ReviewUploadModalSubmitBtn.displayName = "ReviewUploadModalSubmitBtn";
export default ReviewUploadModalSubmitBtn;
