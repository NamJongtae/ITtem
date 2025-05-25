import XIcon from "@/public/icons/x-icon.svg";
import { RefObject, forwardRef } from "react";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationKeyboard";
import useRouterBackToCloseModal from "@/shared/common/hooks/useRouterBackToCloseModal";

interface IProps {
  emailRef: RefObject<HTMLInputElement | null>;
  googleLoginBtnRef: RefObject<HTMLButtonElement | null>;
}
const CloseBtn = forwardRef<HTMLButtonElement | null, IProps>(
  ({ emailRef, googleLoginBtnRef }, ref) => {
    const { closeModalHandler } = useRouterBackToCloseModal();

    return (
      <button
        type="button"
        onClick={closeModalHandler}
        className="absolute top-5 right-5"
        ref={ref}
        onKeyDown={(e) =>
          optimizationTabFocus({
            event: e,
            previousTarget: googleLoginBtnRef.current,
            nextTarget: emailRef.current
          })
        }
      >
        <XIcon className="fill-black w-3 h-3" aria-label="닫기" />
      </button>
    );
  }
);

CloseBtn.displayName = "SigninModalCloseBtn";
export default CloseBtn;
