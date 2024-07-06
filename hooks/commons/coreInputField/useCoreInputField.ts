import {
  FieldValues,
  Validate,
  ValidationRule,
  useFormContext,
} from "react-hook-form";

interface IParams {
  inputName: string;
  inputRequired?: string | ValidationRule<boolean> | undefined;
  inputOnChange?: React.ChangeEventHandler<HTMLInputElement>;
  inputOnBlur?: React.FocusEventHandler<HTMLInputElement>;
  inputOnFocus?: React.FocusEventHandler<HTMLInputElement>;
  inputPattern?: ValidationRule<RegExp> | undefined;
  inputValidate?:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>
    | undefined;
}

export default function useCoreInputField({
  inputName,
  inputRequired,
  inputOnChange,
  inputOnFocus,
  inputOnBlur,
  inputPattern,
  inputValidate,
}: IParams) {
  const { register, formState, watch, setValue, clearErrors } =
    useFormContext();
  const { ref, ...rest } = register(inputName, {
    required: inputRequired,
    onChange: inputOnChange,
    onBlur: inputOnBlur,
    pattern: inputPattern,
    validate: inputValidate,
  });
  const error = formState.errors[inputName];
  const value = watch(inputName);
  const resetInput = () => {
    clearErrors(inputName);
    setValue(inputName, "", {
      shouldDirty: true,
    });
  };

  return { ref, rest, error, value, resetInput };
}
