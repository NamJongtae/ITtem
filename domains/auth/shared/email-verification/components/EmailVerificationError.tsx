import useEmailVerificationStatus from '../hooks/useEmailVerificationStatus';

export default function EmailVerificationError() {
  const { errors } = useEmailVerificationStatus();

  return (
    errors?.message && (
      <p className="input_error">
        {typeof errors.message === "string" && errors.message}
      </p>
    )
  );
}
