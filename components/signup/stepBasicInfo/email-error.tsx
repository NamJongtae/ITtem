import {
  useFormContext,
} from "react-hook-form";

export default function EmailError() {
  const { formState } = useFormContext();
  const error = formState.errors["email"];

  return (
    error?.message && (
      <p className="input_error">
        {typeof error.message === "string" ? error.message : ""}
      </p>
    )
  );
}
