import { useFormContext } from "react-hook-form";

const nicknameRegx = /^(?![0-9]+$)([a-zA-Z0-9가-힣]{4,8})$/;
const nicknameErrorMsg = "4-8자 닉네임(영문, 한글, 숫자조합)을 입력해주세요.";
export default function NicknameField() {
  const { register, formState, setError, clearErrors } = useFormContext();
  const error = formState.errors["nickname"];

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!nicknameRegx.test(e.target.value)) {
      setError("nickname", {
        type: "onChange",
        message: "",
      });
    } else {
      clearErrors("nickname");
    }
  };

  return (
    <div>
      <label className="sr-only" id="nickname">
        닉네임
      </label>
      <input
        className="root_input"
        type="text"
        id="nickname"
        placeholder="닉네임을 입력해주세요."
        autoComplete="off"
        minLength={4}
        maxLength={8}
        {...register("nickname", {
          required: "닉네임을 입력해주세요.",
          onChange: handleChangeNickname,
          pattern: {
            value: nicknameRegx,
            message: nicknameErrorMsg,
          },
        })}
      />
      {error && (
        <p className="text-xs ml-1 mt-1 text-red-400">
          {typeof error.message === "string" && error.message}
        </p>
      )}
    </div>
  );
}
