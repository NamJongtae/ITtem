import { FieldValues } from "react-hook-form";
import useSignupMutate from "../querys/useSignupMutate";
import { SocialType } from "@/types/apiTypes";

export default function useSignup() {
  const { signupMutate, signupLoading } = useSignupMutate();
  const onSubmit = async (data: FieldValues) => {
    signupMutate({
      socialType: SocialType.EMAIL,
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      profileImg: data.profileImg,
      introduce: data.introduce,
    });
  };

  return { onSubmit, signupLoading };
}
