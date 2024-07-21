import { useRouter } from "next/navigation";
import CloseIcon from "@/public/icons/x_icon.svg";
import { MutableRefObject, forwardRef } from "react";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";

interface IProps {
  emailRef: MutableRefObject<HTMLInputElement | null>;
  googleLoginBtnRef: MutableRefObject<HTMLButtonElement | null>;
}
const SigninModalCloseBtn = forwardRef<HTMLButtonElement | null, IProps>(
  ({ emailRef, googleLoginBtnRef }, ref) => {
    const router = useRouter();
    const handleClickClose = () => {
      router.back();
    };

    return (
      <button
        onClick={handleClickClose}
        className="absolute top-5 right-5"
        ref={ref}
        onKeyDown={(e) =>
          optimizationTabFocus({
            event: e,
            previousTarget: googleLoginBtnRef.current,
            nextTarget: emailRef.current,
          })
        }
      >
        <CloseIcon className="w-3 h-3" />
      </button>
    );
  }
);

SigninModalCloseBtn.displayName = "SigninModalCloseBtn";
export default SigninModalCloseBtn;
