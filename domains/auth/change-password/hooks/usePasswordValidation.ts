import { useFormContext } from "react-hook-form";
import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERRORMSG
} from "../../shared/common/constants/constansts";

export default function usePasswordValidation() {
  const { watch } = useFormContext();
  const currentPasswordValue = watch("current-password");

  const validatePassword = (value: string) => {
    return currentPasswordValue === value
      ? "현재 비밀번호와 변경할 비밀번호가 같습니다."
      : true;
  };

  return {
    validatePassword,
    PASSWORD_REGEX,
    PASSWORD_REGEX_ERRORMSG
  };
}
