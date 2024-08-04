import { useRouter } from "next/navigation";
import XIcon from "@/public/icons/x-icon.svg";
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
        <XIcon className="fill-black w-3 h-3" aria-label="닫기" />
      </button>
    );
  }
);

SigninModalCloseBtn.displayName = "SigninModalCloseBtn";
export default SigninModalCloseBtn;
