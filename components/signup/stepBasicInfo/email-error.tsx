import {
  useFormContext,
} from "react-hook-form";

export default function EmailError() {
  const { formState } = useFormContext();
  const error = formState.errors["email"];

  return (
    error?.message && (
      <p className="text-xs ml-1 mt-1 text-red-400">
        {typeof error.message === "string" ? error.message : ""}
      </p>
    )
  );
}
