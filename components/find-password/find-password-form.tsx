import useChangePasswordMutate from "@/hooks/react-query/mutations/auth/useChangePasswordMutate";
import { FieldValues } from "react-hook-form";
import Loading from "@/app/loading";
import { MyForm } from "../commons/my-form/my-form";
import FindPassswordFormConent from "./find-password-form-content";

export default function Form() {
  const { changePasswordMutate, changePasswordLoading } =
    useChangePasswordMutate({ isFindPw: true });

  if (changePasswordLoading) {
    return <Loading />;
  }

  return (
    <MyForm
      className="max-w-[400px] w-full h-[calc(100%-28px)] mx-auto"
      onSubmit={(values: FieldValues) =>
        changePasswordMutate({ email: values.email, password: values.password })
      }
      formOptions={{
        mode: "onChange",
        defaultValues: {
          email: "",
          verifyCode: "",
          password: "",
          nickname: "",
          profileImg: "",
          introduce: "",
        },
      }}
    >
      <h2 className="py-5 font-semibold text-xl">비밀번호 찾기</h2>
      <FindPassswordFormConent />
    </MyForm>
  );
}
