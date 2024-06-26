import { MyForm } from "../commons/myForm/MyForm";
import SigninFormContent from "./signin-form-content";
import Loading from "../commons/loading";
import useSigninForm from "@/hooks/signin/useSigninForm";

export default function SigninForm() {
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
      className={
        "center w-full px-4 max-w-96 fixed flex flex-col pt-[113px] md:pt-[127px]"
      }
    >
      <SigninFormContent />
    </MyForm>
  );
}
