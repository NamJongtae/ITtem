"use client";

import { MyForm } from "../commons/myForm/MyForm";
import SigninFormContent from "./signin-form-content";
import Loading from "@/app/loading";
import useSigninForm from "@/hooks/signin/useSigninForm";

interface IProps {
  isModal?: boolean;
}

export default function SigninForm({ isModal }: IProps) {
  const { signinLoading, handleSingnin } = useSigninForm();

  if (signinLoading) {
    return <Loading />;
  }

  return (
    <MyForm
      onSubmit={handleSingnin}
      formOptions={{
        mode: "onChange",
        defaultValues: {
          email: "",
          password: "",
        },
      }}
      className={`${
        isModal ? "py-10 bg-white rounded-md" : "pt-[113px] md:pt-[127px]"
      } center w-full max-w-96 px-8 fixed flex flex-col z-10`}
    >
      <SigninFormContent isModal={isModal} />
    </MyForm>
  );
}
