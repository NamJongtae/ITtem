import useReasonModalTextarea from "@/domains/product/manage/hooks/useReasonModalTextarea";
import { forwardRef } from "react";

interface IProps {
  name: string;
  title: string;
}

const ReasonTextarea = forwardRef<HTMLTextAreaElement | null, IProps>(
  ({ name, title }, ref) => {
    const { registerRef, rest, selectValue } = useReasonModalTextarea({
      name
    });

    return (
      <>
        <label className="sr-only" htmlFor={`textarea${name}`}>
          {title} 직접입력
        </label>
        <textarea
          className="root_input resize-none mt-3"
          {...rest}
          ref={(e) => {
            registerRef(e);
            if (ref && typeof ref !== "function") ref.current = e;
          }}
          rows={6}
          id={`textarea${name}`}
          placeholder="직접입력"
          disabled={selectValue !== "직접입력"}
          maxLength={300}
        />
      </>
    );
  }
);

ReasonTextarea.displayName = "ReasonModalReasonTextarea";
export default ReasonTextarea;
