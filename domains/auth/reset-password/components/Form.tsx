import { FieldValues } from "react-hook-form";
import MyForm from "@/shared/common/components/MyForm";
import FormConent from "./FormContent";
import useResetPasswordMutate from "../hooks/useResetPasswordMutate";
import { EmailVerificationContextProvider } from "../../shared/email-verification/context/EmailVerificationProvider";

export default function Form() {
  const { resetPasswordMutate } = useResetPasswordMutate();

  return (
    <MyForm
      className="max-w-[400px] w-full h-[calc(100%-28px)] mx-auto"
      onSubmit={(values: FieldValues) =>
        resetPasswordMutate({ email: values.email, password: values.password })
      }
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
      <h2 className="py-5 font-semibold text-xl">비밀번호 찾기</h2>
      <EmailVerificationContextProvider>
        <FormConent />
      </EmailVerificationContextProvider>
    </MyForm>
  );
}
