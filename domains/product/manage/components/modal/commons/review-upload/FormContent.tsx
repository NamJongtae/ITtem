import { isMobile } from "react-device-detect";
import ReviewStar from "./ReviewStar";
import ReviewTags from "./ReviewTags";
import ReviewTextarea from "./ReviewTextarea";
import SubmitBtn from "./SubmitBtn";
import ModalCloseBtn from "./CloseBtn";
import useReviewModalRefs from "@/domains/product/manage/hooks/useReviewModalRefs";
import Header from "./Header";
import { escKeyClose } from "@/shared/common/utils/optimizationKeyboard";

interface IProps {
  handleClickCloseBtn: () => void;
}

export default function FormContent({ handleClickCloseBtn }: IProps) {
  const { starRef, textareaRef, submitBtnRef, closeBtnRef } =
    useReviewModalRefs();

  return (
    <div
      className={`${
        isMobile ? "h-screen" : "max-w-[480px]"
      } fixed center z-30 flex flex-col gap-3 w-full p-8 border bg-white`}
      onKeyDown={(e) => escKeyClose({ event: e, closeCb: handleClickCloseBtn })}
    >
      <Header />

      <ReviewStar ref={starRef} closeBtnRef={closeBtnRef} />

      <ReviewTags />

      <ReviewTextarea ref={textareaRef} />

      <SubmitBtn ref={submitBtnRef} />

      <ModalCloseBtn
        handleClickCloseBtn={handleClickCloseBtn}
        ref={closeBtnRef}
        textareaRef={textareaRef}
        starRef={starRef}
        submitBtnRef={submitBtnRef}
      />
    </div>
  );
}
