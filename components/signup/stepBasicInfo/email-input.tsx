import { EMAIL_REGEX, EMAIL_REGEX_ERRORMSG } from "@/constants/constant";
import { MutableRefObject } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  isSendToVerifyEmail: boolean;
  emailRef: MutableRefObject<HTMLInputElement | null>;
}

const EmailInput = ({
  isSendToVerifyEmail,
  emailRef,
}: IProps) => {
  const { register } = useFormContext();
  const { ref, ...rest } = register("email", {
    required: "이메일을 입력하세요.",
    pattern: {
      value: EMAIL_REGEX,
      message: EMAIL_REGEX_ERRORMSG,
    },
  });

  return (
    <>
      <div className="flex gap-3 items-center w-full">
        <input
          className={`root_input w-full read-only:bg-gray-100 read-only:text-gray-300`}
          type="email"
          id="email"
          placeholder="이메일을 입력하세요."
          autoComplete="off"
          readOnly={isSendToVerifyEmail}
          {...rest}
          ref={(e) => {
            if (emailRef) emailRef.current = e;
            ref(e);
          }}
        />
      </div>
    </>
  );
};

export default EmailInput;
