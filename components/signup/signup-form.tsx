import { MyForm } from "../commons/myForm/MyForm";
import { FieldValues } from "react-hook-form";
import FormContent from "./form-content";

export default function SignupForm() {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

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
