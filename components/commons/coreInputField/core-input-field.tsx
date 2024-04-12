import Image from "next/image";
import { HTMLInputTypeAttribute, MutableRefObject, useRef } from "react";
import {
  FieldValues,
  Validate,
  ValidationRule,
  useFormContext,
} from "react-hook-form";

interface IProps {
  className?: string;
  label: string;
  inputId: string;
  inputName: string;
  inputType: "text" | "password" | "number";
  inputPlaceholder: string;
  inputOnChange?: React.ChangeEventHandler<HTMLInputElement>;
  inputOnBlur?: React.FocusEventHandler<HTMLInputElement>;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
  inputRequired?: string | ValidationRule<boolean> | undefined;
  inputPattern?: ValidationRule<RegExp> | undefined;
  inputValidate?:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>
    | undefined;
}

export default function CoreInputField({
  className,
  label,
  inputId,
  inputName,
  inputType,
  inputPlaceholder,
  inputOnChange,
  inputOnBlur,
  inputRef,
  inputRequired,
  inputPattern,
  inputValidate,
}: IProps) {
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
    setValue(inputName, "", {
      shouldValidate: false,
      shouldDirty: true,
    });
  };

  return (
    <>
      <label className="sr-only" htmlFor={inputId}>
        {label}
      </label>
      <div className="relative w-full">
        <input
          className={className + " root_input"}
          id={inputId}
          type={inputType}
          placeholder={inputPlaceholder}
          {...rest}
          ref={(e) => {
            ref(e);
            if (inputRef) inputRef.current = e;
          }}
        />
        {value && (
          <button
            type="button"
            onClick={resetInput}
            className="absolute right-3 bg-gray-700 bg-opacity-50 rounded-full p-1 top-1/2 -translate-y-1/2"
          >
            <Image
              className="w-2 h-2 object-cover object-center"
              src={"/icons/x_icon.svg"}
              alt="초기화"
              width={10}
              height={10}
            />
          </button>
        )}
      </div>

      {error && (
        <p className="input_error">
          {typeof error.message === "string" && error.message}
        </p>
      )}
    </>
  );
}
