import { useFocusing } from "@/shared/common/hooks/useFocusing";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationKeyboard";
import CloseIcon from "@/public/icons/x-icon.svg";
import { useRef } from "react";

interface IProps {
  handleClickCloseBtn: () => void;
}

export default function CloseBtn({
  handleClickCloseBtn
}: IProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  useFocusing(closeBtnRef);

  return (
    <button
      type="button"
      onClick={handleClickCloseBtn}
      className="absolute top-5 right-5"
      ref={closeBtnRef}
      onKeyDown={(e) =>
        optimizationTabFocus({
          event: e,
          previousTarget: closeBtnRef.current,
          nextTarget: closeBtnRef.current
        })
      }
    >
      <CloseIcon className="fill-black w-3 h-3" />
    </button>
  );
}
