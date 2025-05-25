import useEmailVerificationStatus from "@/domains/auth/shared/email-verification/hooks/useEmailVerificationStatus";

export default function EmailError() {
  const { errors } = useEmailVerificationStatus();

  return (
    errors?.message && (
      <p className="input_error">
        {typeof errors.message === "string" ? errors.message : ""}
      </p>
    )
  );
}
