import useEmailVerificationStatus from '../../../hooks/email-verification/useEmailVerificationStatus';

export default function SignupEmailError() {
  const { errors } = useEmailVerificationStatus();

  return (
    errors?.message && (
      <p className="input_error">
        {typeof errors.message === "string" ? errors.message : ""}
      </p>
    )
  );
}
