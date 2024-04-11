import { MyForm } from "../commons/myForm/MyForm";
import FormContent from "./form-content";
import Loading from "../commons/loading";
import useSignup from "@/hooks/useSignup";

export default function SignupForm() {
  const { onSubmit, signupLoading } = useSignup();

  if (signupLoading) {
    return <Loading />;
  }

  return (
    <MyForm
      className="relative max-w-[400px] w-full h-full mx-auto"
      onSubmit={onSubmit}
      formOptions={{
        mode: "onBlur",
        defaultValues: {
          email: "",
          password: "",
          nickname: "",
          profileImg: "",
          introduce: "",
        },
      }}
    >
      <h2 className="sr-only">회원가입</h2>
      <FormContent />
    </MyForm>
  );
}
