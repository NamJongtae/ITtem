import useEmailStatus from '@/hooks/signup/basic-info/useEmailStatus';

export default function SignupEmailError() {
  const { errors } = useEmailStatus();

  return (
    errors?.message && (
      <p className="input_error">
        {typeof errors.message === "string" ? errors.message : ""}
      </p>
    )
  );
}
