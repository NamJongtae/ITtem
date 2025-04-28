import { MyForm } from "../commons/my-form/my-form";
import Loading from "../commons/loading";
import SignupFormContent from "./signup-form-content";
import useSignupHandler from "@/hooks/signup/useSignupHandler";

export default function SignupForm() {
  const { onSubmit, signupLoading } = useSignupHandler();

  if (signupLoading) {
    return <Loading />;
  }

  return (
    <MyForm
      className="relative max-w-[400px] w-full h-full mx-auto"
      onSubmit={onSubmit}
      formOptions={{
        mode: "onChange",
        defaultValues: {
          email: "",
          verifyCode: "",
          password: "",
          nickname: "",
          profileImg: "",
          introduce: ""
        }
      }}
    >
      <h2 className="sr-only">회원가입</h2>
      <SignupFormContent />
    </MyForm>
  );
}
