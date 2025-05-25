import useSignupHandler from "../../signin/hooks/useSignupHandler";
import MyForm from "@/shared/common/components/MyForm";
import SignupFormContent from "./FormContent";

export default function SignupForm() {
  const { onSubmit } = useSignupHandler();

  return (
    <MyForm
      className="relative max-w-[400px] w-full h-full mx-auto"
      onSubmit={onSubmit}
      formOptions={{
        mode: "onChange",
        defaultValues: {
          email: "",
          verificationCode: "",
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
