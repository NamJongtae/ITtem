import useReasonSubmitDisabled from "@/domains/product/manage/hooks/useReasonSubmitDisabled";
import { forwardRef } from "react";

interface IProps {
  name: string;
  submitBtnText: string;
}
const SubmitBtn = forwardRef<HTMLButtonElement | null, IProps>(
  ({ name, submitBtnText }, ref) => {
    const { isDisabled } = useReasonSubmitDisabled({ name });

    return (
      <button
        type="submit"
        className="w-full mx-auto mt-5 py-2 px-4 bg-[#66a2fb] text-white font-medium betterhover:hover:bg-[#3c87f8] disabled:opacity-50"
        disabled={isDisabled}
        ref={ref}
      >
        {submitBtnText}
      </button>
    );
  }
);

SubmitBtn.displayName = "ReasonModalSubmitBtn";
export default SubmitBtn;
