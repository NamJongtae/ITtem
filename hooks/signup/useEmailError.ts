import { useFormContext } from 'react-hook-form';

export default function useEmailError() {
  const { formState } = useFormContext();
  const error = formState.errors["email"];

  return { error };
}
