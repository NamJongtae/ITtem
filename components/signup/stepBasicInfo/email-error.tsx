import useEmailError from "@/hooks/signup/useEmailError";

export default function EmailError() {
  const { error } = useEmailError();

  return (
    error?.message && (
      <p className="input_error">
        {typeof error.message === "string" ? error.message : ""}
      </p>
    )
  );
}
