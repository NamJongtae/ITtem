import { MyForm } from "../commons/myForm/MyForm";
import { FieldValues } from "react-hook-form";
import SigninFormContent from "./signin-form-content";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";

export default function SigninForm() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, []);

  const onSubmit = async (data: FieldValues) => {
    const email = data.email;
    const password = data.password;
    console.log(email, password);
  };

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
