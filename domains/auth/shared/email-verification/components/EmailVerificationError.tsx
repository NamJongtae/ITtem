import useVerificationCodeStatus from "../hooks/useVerificationCodeStatus";

export default function EmailVerificationError() {
  const { errors } = useVerificationCodeStatus();

  return (
    errors?.message && (
      <p className="input_error">
        {typeof errors.message === "string" && errors.message}
      </p>
    )
  );
}
