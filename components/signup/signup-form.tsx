import { MyForm } from "../commons/my-form/my-form";
import SignupFormContent from "./signup-form-content";
import { FieldValues } from "react-hook-form";
interface IProps {
  onSubmit: (data: FieldValues) => Promise<void>;
}
export default function SignupForm({ onSubmit }: IProps) {
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
