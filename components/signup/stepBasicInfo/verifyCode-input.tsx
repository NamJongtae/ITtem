import { MutableRefObject } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  counter: number;
  verifyCodeRef: MutableRefObject<HTMLInputElement | null>;
}

export default function VerifyCodeInput({
  counter,
  verifyCodeRef,
}: IProps) {
  const { register } = useFormContext();
  const { ref, ...rest } = register("verifyCode", {
    validate: () => false,
  });

  return (
    <div className="relative flex items-center w-full">
      <input
        className="root_input"
        id="verifyCode"
        type="text"
        placeholder="인증번호를 입력해주세요."
        maxLength={6}
        {...rest}
        ref={(e) => {
          ref(e);
          if (verifyCodeRef) verifyCodeRef.current = e;
        }}
      />
      <span className="absolute right-[10px] text-sm text-gray-400">
        {String(Math.floor(counter / 60)).padStart(2, "0")}:
        {String(counter % 60).padStart(2, "0")}
      </span>
    </div>
  );
}
