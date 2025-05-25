import { useFormContext } from "react-hook-form";

export default function useCurrentPwValidation() {
  const { watch } = useFormContext();
  const password = watch("password");

  const validatePassword = (value: string) => {
    return password === value
      ? "현재 비밀번호와 변경할 비밀번호가 같습니다."
      : true;
  };

  return { validatePassword };
}
