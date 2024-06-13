import { MyForm } from "../commons/myForm/MyForm";
import { FieldValues } from "react-hook-form";
import SigninFormContent from "./signin-form-content";
import useSigninMutate from "@/hooks/reactQuery/mutations/auth/useSigninMutate";
import Loading from "../commons/loading";

export default function SigninForm() {
  const { signinMutate, signinLoading } = useSigninMutate();

  const onSubmit = async (data: FieldValues) => {
    const email = data.email;
    const password = data.password;
    signinMutate({ email, password });
  };

  if (signinLoading) {
    return <Loading />;
  }

  return (
    <MyForm
      onSubmit={onSubmit}
      formOptions={{
        mode: "onChange",
        defaultValues: {
          email: "",
          password: "",
        },
      }}
      className={
        "center w-full px-4 max-w-96 fixed flex flex-col pt-[113px] md:pt-[127px]"
      }
    >
      <SigninFormContent />
    </MyForm>
  );
}
