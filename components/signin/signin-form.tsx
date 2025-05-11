"use client";

import { MyForm } from "../commons/my-form/my-form";
import SigninFormContent from "./signin-form-content";
import useSigninHandler from "@/hooks/signin/useSigninHandler";

interface IProps {
  isModal?: boolean;
}

export default function SigninForm({ isModal }: IProps) {
  const { handleSignin } = useSigninHandler({ isModal });

  return (
    <MyForm
      onSubmit={handleSignin}
      formOptions={{
        mode: "onChange",
        defaultValues: {
          email: "",
          password: ""
        }
      }}
      className={`${
        isModal
          ? "py-10 bg-white rounded-md center"
          : "pt-[113px] md:pt-[127px] left-1/2 -translate-x-1/2 "
      } w-full max-w-96 px-8 fixed flex flex-col z-10`}
    >
      <SigninFormContent isModal={isModal} />
    </MyForm>
  );
}
