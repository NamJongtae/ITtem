import useReasonModalSubmitBtn from "@/hooks/productManage/useReasonModalSubmitBtn";
import { forwardRef } from "react";

interface IProps {
  name: string;
  submitBtnText: string;
}
const ReasonModalSubmitBtn = forwardRef<HTMLButtonElement | null, IProps>(
  ({ name, submitBtnText }, ref) => {
    const { isDisabled } = useReasonModalSubmitBtn({ name });

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

ReasonModalSubmitBtn.displayName = "ReasonModalSubmitBtn";
export default ReasonModalSubmitBtn;
