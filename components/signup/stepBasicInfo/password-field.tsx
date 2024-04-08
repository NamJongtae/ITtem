import { useFormContext } from "react-hook-form";
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
export const passwordRegexErrorMsg =
  "8-16자 특수문자, 숫자, 영문을 포함해야합니다.";

export default function PasswordField() {
  const { register, formState, setError, clearErrors } = useFormContext();
  const error = formState.errors["password"];

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!passwordRegex.test(e.target.value)) {
      setError("password", {
        type: "onChange",
        message: "",
      });
    } else {
      clearErrors("password");
    }
  };

  return (
    <div>
      <label className="sr-only" htmlFor="password">
        비밀번호
      </label>
      <input
        className="root_input"
        type="password"
        placeholder="비밀번호를 입력하세요."
        minLength={8}
        maxLength={16}
        {...register("password", {
          required: "비밀번호를 입력하세요.",
          onChange: handleChangePassword,
          pattern: {
            value: passwordRegex,
            message: passwordRegexErrorMsg,
          },
        })}
      />
      {error?.message && (
        <p className="text-xs ml-1 mt-1 text-red-400">
          {typeof error.message === "string" ? error.message : ""}
        </p>
      )}
    </div>
  );
}
