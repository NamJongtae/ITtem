import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const emailRegexErrorMsg = "이메일 형식을 확인해주세요.";

export default function EmailField() {
  const [sendToEmail, setSendToEmail] = useState(false);
  const [verifiedEmail, setverfiedEmail] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const verifyNumberRef = useRef<HTMLInputElement | null>(null);

  const { register, formState, setError, clearErrors } = useFormContext();
  const error = formState.errors["email"];
  const isEmailDirty = formState.dirtyFields["email"];

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!emailRegex.test(e.target.value)) {
      setError("email", {
        type: "onChange",
        message: "",
      });
    } else {
      clearErrors("email");
    }
  };

  const handleClickSendToEmail = () => {
    setSendToEmail(true);
    // 이메일 전송 로직
  };

  const handleClickVerifyEmail = () => {
    // 인증번호 확인 로직
    setverfiedEmail(true);
  };

  const resetVerifyEmail = () => {
    setSendToEmail(false);
    if (!emailRef.current) return;
    emailRef.current.focus();
  };

  useEffect(() => {
    if (!verifyNumberRef.current) return;
    verifyNumberRef.current.focus();
  }, [sendToEmail]);

  return (
    <div>
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
          readOnly={sendToEmail}
          {...register("email", {
            required: "이메일을 입력하세요.",
            onChange: handleChangeEmail,
            pattern: {
              value: emailRegex,
              message: emailRegexErrorMsg,
            },
          })}
          ref={(e) => {
            if (emailRef.current) emailRef.current = e;
            register("email").ref(e);
          }}
        />
        {!sendToEmail && (
          <button
            className="basis-1/4 button_primary disabled:bg-blue-200 text-sm"
            onClick={handleClickSendToEmail}
            type="button"
            disabled={!!error || !isEmailDirty}
          >
            인증받기
          </button>
        )}
      </div>
      {sendToEmail && !verifiedEmail && (
        <div className="flex gap-3 items-center mt-3">
          <label className="sr-only" htmlFor="verifyNumber">
            인증번호입력
          </label>
          <input
            className="root_input"
            name="verifyNumber"
            id="verifyNumber"
            ref={verifyNumberRef}
            placeholder="인증번호를 입력해주세요."
          />

          <button
            onClick={handleClickVerifyEmail}
            className="basis-1/4 button_primary disabled:bg-blue-200 text-sm"
            type="button"
          >
            인증하기
          </button>
        </div>
      )}
      {sendToEmail && !verifiedEmail && (
        <div className="text-sm text-center mt-2">
          <p>
            인증번호가 오지 않았나요?{" "}
            <button
              className="text-gray-400 underline underline-offset-2"
              type="button"
            >
              재요청
            </button>
          </p>
          <p>
            이메일을 잘못입력하셨나요?{" "}
            <button
              onClick={resetVerifyEmail}
              className="text-gray-400 underline underline-offset-2 mt-1"
              type="button"
            >
              이메일 변경하기
            </button>
          </p>
        </div>
      )}
      {error?.message && (
        <p className="text-xs ml-1 mt-1 text-red-400">
          {typeof error.message === "string" ? error.message : ""}
        </p>
      )}
    </div>
  );
}
