import { FieldValues } from "react-hook-form";
import useSigninMutate from "../reactQuery/mutations/auth/useSigninMutate";

export default function useSigninForm() {
  const { signinMutate, signinLoading } = useSigninMutate();

  const handleSingnin = async (data: FieldValues) => {
    const email = data.email;
    const password = data.password;
    signinMutate({ email, password });
  };

  return { signinLoading, handleSingnin };
}
