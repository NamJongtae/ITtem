import useVerificationCodeStatus from '../../hooks/email-verification/useVerificationCodeStatus';

export default function EmailVerificationError() {
  const { errors } = useVerificationCodeStatus();

  return (
    errors && (
      <p className="input_error">
        {typeof errors.message === "string" && errors.message}
      </p>
    )
  );
}
