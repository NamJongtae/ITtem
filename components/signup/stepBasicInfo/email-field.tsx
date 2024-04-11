import EmailInput from "./email-input";
import EmailError from "./email-error";
import { useFormContext } from "react-hook-form";
import { MutableRefObject } from 'react';

interface IProps {
  isSendToVerifyEmail: boolean;
  handleClickSendToEmail: () => void;
  emailRef:  MutableRefObject<HTMLInputElement | null>;
}

export default function EmailField({
  isSendToVerifyEmail,
  handleClickSendToEmail,
  emailRef
}: IProps) {
  const { formState } = useFormContext();
  const error = formState.errors["email"];
  const isDirty = formState.dirtyFields["email"];

  return (
    <div>
      <label className="sr-only" htmlFor="email">
        이메일
      </label>
      <div className="flex gap-3 items-center">
        <EmailInput
          isSendToVerifyEmail={isSendToVerifyEmail}
          emailRef={emailRef}
        />
        {!isSendToVerifyEmail && (
          <button
            className="basis-1/4 button_primary disabled:bg-blue-200 text-sm"
            onClick={handleClickSendToEmail}
            type="button"
            disabled={!!error || !isDirty}
          >
            인증받기
          </button>
        )}
      </div>

      <EmailError />
    </div>
  );
}
