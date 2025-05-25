import { FieldValues } from "react-hook-form";
import useSignupMutate from '../../signup/hooks/mutations/useSignupMutate';

export default function useSignupHandler() {
  const { signupMutate, signupLoading } = useSignupMutate();
  const onSubmit = async (data: FieldValues) => {
    signupMutate({
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      profileImgFile: data.profileImg,
      introduce: data.introduce
    });
  };

  return { onSubmit, signupLoading };
}
