import React from "react";
import { MyForm } from "../commons/myForm/MyForm";
import FormConent from "./form-content";
import useChangePassword from "@/hooks/useChangePassword";
import Loading from "../commons/loading";

export default function FindPasswordForm() {
  const { handleSubmit, changePasswordLoading } = useChangePassword();

  if (changePasswordLoading) {
    return <Loading />;
  }

  return (
    <MyForm
      className="max-w-[400px] w-full h-[calc(100%-28px)] mx-auto"
      onSubmit={handleSubmit}
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
      <FormConent />
    </MyForm>
  );
}
