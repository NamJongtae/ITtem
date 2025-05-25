import { FieldValues } from "react-hook-form";
import useSigninMutate from "./mutations/useSigninMutate";

export default function useSigninHandler({ isModal }: { isModal?: boolean }) {
  const { signinMutate, signinLoading } = useSigninMutate({ isModal });

  const handleSignin = async (data: FieldValues) => {
    const email = data.email;
    const password = data.password;
    signinMutate({ email, password });
  };

  return { signinLoading, handleSignin };
}
