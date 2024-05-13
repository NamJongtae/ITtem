import Image from "next/image";
import { MutableRefObject, useRef } from "react";
import {
  FieldValues,
  Validate,
  ValidationRule,
  useFormContext,
} from "react-hook-form";

interface IProps {
  inputClassName?: string;
  label: string;
  inputId: string;
  inputName: string;
  inputType: "text" | "password" | "email" | "number";
  inputPlaceholder?: string;
  inputReadOnly?: boolean;
  inputMaxLength?: number;
  inputMinLength?: number;
  inputOnChange?: React.ChangeEventHandler<HTMLInputElement>;
  inputOnFocus?: React.FocusEventHandler<HTMLInputElement>;
  inputOnBlur?: React.FocusEventHandler<HTMLInputElement>;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
  inputRequired?: string | ValidationRule<boolean> | undefined;
  inputPattern?: ValidationRule<RegExp> | undefined;
  inputValidate?:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>
    | undefined;
  hideError?: boolean;
  labelHidden?: boolean;
  labelClassName?: string;
}

export default function CoreInputField({
  inputClassName,
  label,
  inputId,
  inputName,
  inputType,
  inputPlaceholder,
  inputReadOnly,
  inputMinLength,
  inputMaxLength,
  inputOnChange,
  inputOnFocus,
  inputOnBlur,
  inputRef,
  inputRequired,
  inputPattern,
  inputValidate,
  hideError,
  labelHidden = true,
  labelClassName,
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
    clearErrors(inputName);
    setValue(inputName, "", {
      shouldDirty: true,
    });
  };

  return (
    <>
      <label
        className={labelHidden ? "sr-only" : labelClassName}
        htmlFor={inputId}
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          className={`${inputClassName ? inputClassName : "root_input"}`}
          id={inputId}
          type={inputType}
          placeholder={inputPlaceholder}
          autoComplete="off"
          readOnly={inputReadOnly}
          onFocus={inputOnFocus}
          minLength={inputMinLength}
          maxLength={inputMaxLength}
          {...rest}
          ref={(e) => {
            ref(e);
            if (inputRef) inputRef.current = e;
          }}
        />
        {value && !inputReadOnly && (
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

      {error && !hideError && (
        <p className="input_error">
          {typeof error.message === "string" && error.message}
        </p>
      )}
    </>
  );
}
