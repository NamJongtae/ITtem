import { useFocusing } from "@/hooks/commons/useFocusing";
import { optModalTabFocus } from "@/lib/optimizationTabFocus";
import Image from "next/image";
import { useRef } from "react";

interface IProps {
  handleClickCloseBtn: () => void;
}

export default function TradeDetailModalCloseBtn({
  handleClickCloseBtn,
}: IProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  useFocusing(closeBtnRef);

  return (
    <button
      type="button"
      onClick={() => {
        handleClickCloseBtn();
      }}
      className="absolute top-3 right-3 bg-gray-500 rounded-full p-[6px]"
      ref={closeBtnRef}
      onKeyDown={(e) =>
        optModalTabFocus({
          event: e,
          previousTarget: closeBtnRef.current,
          nextTarget: closeBtnRef.current,
        })
      }
    >
      <Image src={"/icons/x_icon.svg"} alt="닫기" width={12} height={12} />
    </button>
  );
}
