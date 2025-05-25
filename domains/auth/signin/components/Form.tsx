"use client";

import MyForm from "@/shared/common/components/MyForm";
import FormContent from "./FormContent";
import useSigninHandler from "../hooks/useSigninHandler";

interface IProps {
  isModal?: boolean;
}

export default function Form({ isModal }: IProps) {
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
      <FormContent isModal={isModal} />
    </MyForm>
  );
}
