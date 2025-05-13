import { RefObject } from "react";
import { isMobile } from "react-device-detect";
import ReasonModalReasonSeletor from "./reason-modal-reason-seletor";
import ReasonModalReasonTextarea from "./reason-modal-reason-textarea";
import ReasonModalSubmitBtn from "./reason-modal-submit-btn";
import ReasonModalCloseBtn from "./reason-modal-close-btn";
import { escKeyClose } from "@/lib/optimizationKeyboard";

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

export default function ReasonModalFormContents({
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

      <ReasonModalReasonSeletor
        name={name}
        selectorRef={selectorRef}
        closeBtnRef={closeBtnRef}
        textareaRef={textareaRef}
        submitBtnRef={submitBtnRef}
        options={options}
      />

      <ReasonModalReasonTextarea name={name} title={title} />

      <ReasonModalSubmitBtn
        name={name}
        submitBtnText={submitBtnText}
        ref={submitBtnRef}
      />

      <ReasonModalCloseBtn
        handleClickCloseBtn={handleClickCloseBtn}
        submitBtnRef={submitBtnRef}
        textareaRef={textareaRef}
        selectorRef={selectorRef}
        ref={closeBtnRef}
      />
    </div>
  );
}
