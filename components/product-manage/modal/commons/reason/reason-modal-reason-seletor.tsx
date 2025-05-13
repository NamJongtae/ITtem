import useReasonModalSeletor from "@/hooks/product-manage/useReasonModalSelector";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import { RefObject } from "react";

interface IProps {
  name: string;
  selectorRef: RefObject<HTMLSelectElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  closeBtnRef: RefObject<HTMLButtonElement | null>;
  submitBtnRef: RefObject<HTMLButtonElement | null>;
  options: string[];
}

export default function ReasonModalReasonSeletor({
  name,
  selectorRef,
  closeBtnRef,
  textareaRef,
  submitBtnRef,
  options
}: IProps) {
  const { ref, rest } = useReasonModalSeletor({ name, selectorRef });

  return (
    <select
      className="border rounded-md px-2 py-1"
      {...rest}
      ref={(e) => {
        ref(e);
        if (selectorRef) selectorRef.current = e;
      }}
      onKeyDown={(e) =>
        optimizationTabFocus({
          event: e,
          previousTarget: closeBtnRef.current,
          nextTarget: textareaRef.current?.disabled
            ? submitBtnRef.current?.disabled
              ? closeBtnRef.current
              : submitBtnRef.current
            : textareaRef.current
        })
      }
    >
      {options.map((option, index) => (
        <option value={index === 0 ? "" : option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
