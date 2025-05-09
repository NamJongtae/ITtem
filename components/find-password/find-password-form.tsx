import { FieldValues } from "react-hook-form";
import { MyForm } from "../commons/my-form/my-form";
import FindPassswordFormConent from "./find-password-form-content";
import Loading from "../commons/loading";
import useResetPasswordMutate from "@/hooks/react-query/mutations/auth/useResetPasswordMutate";

export default function Form() {
  const { resetPasswordMutate, resetPasswordLoading } = useResetPasswordMutate();

  if (resetPasswordLoading) {
    return <Loading />;
  }

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
      <FindPassswordFormConent />
    </MyForm>
  );
}
