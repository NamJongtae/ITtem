import { EMAIL_REGEX, EMAIL_REGEX_ERRORMSG } from '@/constants/constant';
import { MutableRefObject } from "react";

import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from "react-hook-form";

interface IProps {
  isSendToVerifyEmail: boolean;
  handleChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickSendToEmail: () => void;
  emailError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  isEmailDirty: boolean;
  emailRef: MutableRefObject<HTMLInputElement | null>;
}

const EmailInput = ({
  isSendToVerifyEmail,
  handleChangeEmail,
  handleClickSendToEmail,
  emailError,
  isEmailDirty,
  emailRef,
}: IProps) => {
  const { register } = useFormContext();
  const { ref, ...rest } = register("email", {
    required: "이메일을 입력하세요.",
    onChange: handleChangeEmail,
    pattern: {
      value: EMAIL_REGEX,
      message: EMAIL_REGEX_ERRORMSG,
    },
  });

  return (
    <>
      <label className="sr-only" htmlFor="email">
        이메일
      </label>
      <div className="flex gap-3 items-center">
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
        {!isSendToVerifyEmail && (
          <button
            className="basis-1/4 button_primary disabled:bg-blue-200 text-sm"
            onClick={handleClickSendToEmail}
            type="button"
            disabled={!!emailError || !isEmailDirty}
          >
            인증받기
          </button>
        )}
      </div>
    </>
  );
};

export default EmailInput;
