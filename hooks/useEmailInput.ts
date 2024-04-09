import { useFormContext } from "react-hook-form";

const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

export default function useEmailInput() {
  const { formState, setError, clearErrors } = useFormContext();
  const emailError = formState.errors["email"];
  const isEmailDirty = formState.dirtyFields["email"];

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!emailRegex.test(e.target.value)) {
      setError("email", {
        type: "onChange",
        message: "",
      });
    } else {
      clearErrors("email");
    }
  };

  return { emailError, isEmailDirty, handleChangeEmail };
}
