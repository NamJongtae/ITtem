import useReviewSubmitDisabled from "@/domains/product/manage/hooks/useReviewSubmitDisabled";
import { forwardRef } from "react";

const SubmitBtn = forwardRef<HTMLButtonElement | null>((props, ref) => {
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
});

SubmitBtn.displayName = "ReviewUploadModalSubmitBtn";
export default SubmitBtn;
