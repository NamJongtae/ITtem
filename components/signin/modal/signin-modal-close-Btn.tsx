import XIcon from "@/public/icons/x-icon.svg";
import { RefObject, forwardRef } from "react";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import useRouterBackToCloseModal from "@/hooks/commons/useRouterBackToCloseModal";

interface IProps {
  emailRef: RefObject<HTMLInputElement | null>;
  googleLoginBtnRef: RefObject<HTMLButtonElement | null>;
}
const SigninModalCloseBtn = forwardRef<HTMLButtonElement | null, IProps>(
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

SigninModalCloseBtn.displayName = "SigninModalCloseBtn";
export default SigninModalCloseBtn;
