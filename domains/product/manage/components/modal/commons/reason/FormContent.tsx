import { RefObject } from "react";
import { isMobile } from "react-device-detect";
import ReasonSelector from "./ReasonSelector";
import ReasonTextarea from "./ReasonTextarea";
import SubmitBtn from "./SubmitBtn";
import CloseBtn from "./CloseBtn";
import { escKeyClose } from "@/shared/common/utils/optimizationKeyboard";

interface IProps {
  name: string;
  title: string;
  selectorRef: RefObject<HTMLSelectElement | null>;
  closeBtnRef: RefObject<HTMLButtonElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  submitBtnRef: RefObject<HTMLButtonElement | null>;
  submitBtnText: string;
  options: string[];
  handleClickCloseBtn: () => void;
}

export default function FormContent({
  name,
  title,
  selectorRef,
  closeBtnRef,
  textareaRef,
  submitBtnRef,
  submitBtnText,
  options,
  handleClickCloseBtn
}: IProps) {
  return (
    <div
      className={`${
        isMobile ? "h-screen" : "max-w-[480px]"
      } fixed center z-30 flex flex-col gap-3 w-full p-8 border bg-white`}
      onKeyDown={(e) => escKeyClose({ event: e, closeCb: handleClickCloseBtn })}
    >
      <h2
        className={`${
          isMobile ? "mt-10" : "mt-3"
        } text-xl text-center font-semibold mb-3`}
      >
        {title}
      </h2>

      <ReasonSelector
        name={name}
        selectorRef={selectorRef}
        closeBtnRef={closeBtnRef}
        textareaRef={textareaRef}
        submitBtnRef={submitBtnRef}
        options={options}
      />

      <ReasonTextarea name={name} title={title} />

      <SubmitBtn name={name} submitBtnText={submitBtnText} ref={submitBtnRef} />

      <CloseBtn
        handleClickCloseBtn={handleClickCloseBtn}
        submitBtnRef={submitBtnRef}
        textareaRef={textareaRef}
        selectorRef={selectorRef}
        ref={closeBtnRef}
      />
    </div>
  );
}
