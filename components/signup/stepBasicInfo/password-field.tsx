import { PASSWORD_REGEX, PASSWORD_REGEX_ERRORMSG } from '@/constants/constant';
import { useFormContext } from "react-hook-form";

export default function PasswordField() {
  const { register, formState, setError, clearErrors } = useFormContext();
  const error = formState.errors["password"];

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!PASSWORD_REGEX.test(e.target.value)) {
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
            value: PASSWORD_REGEX,
            message: PASSWORD_REGEX_ERRORMSG,
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
