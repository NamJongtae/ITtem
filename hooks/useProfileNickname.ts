import { nicknameRegx } from "@/components/signup/stepProfile/nickname-field";
import { useFormContext } from "react-hook-form";

export default function useProfileNickname() {
  const { setError, clearErrors } = useFormContext();

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

  return { handleChangeNickname };
}
