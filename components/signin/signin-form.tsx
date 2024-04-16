import { MyForm } from "../commons/myForm/MyForm";
import { FieldValues } from "react-hook-form";
import SigninFormContent from "./signin-form-content";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import useSigninMutate from '@/hooks/querys/useSigninMutate';
import Loading from "../commons/loading";


export default function SigninForm() {
  const [mobile, setMobile] = useState(false);
  const { signinMutate, signinLoading } = useSigninMutate();

  useEffect(() => {
    setMobile(isMobile);
  }, []);

  const onSubmit = async (data: FieldValues) => {
    const email = data.email;
    const password = data.password;
    signinMutate({ email, password });
  };

  if (signinLoading) {
    return <Loading />;
  }

  return (
    <MyForm
      onSubmit={onSubmit}
      formOptions={{
        mode: "onChange",
        defaultValues: {
          email: "",
          password: "",
        },
      }}
      className={`${
        mobile ? "pt-8 left-1/2 -translate-x-1/2" : "center"
      } w-full px-4 max-w-96 fixed flex flex-col`}
    >
      <SigninFormContent />
    </MyForm>
  );
}
