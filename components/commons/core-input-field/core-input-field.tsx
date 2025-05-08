import useCoreInputField from "@/hooks/commons/core-Input-field/useCoreInputField";
import XIcon from "@/public/icons/x-icon.svg";
import { MutableRefObject } from "react";
import { FieldValues, Validate, ValidationRule } from "react-hook-form";

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
  inputKeydown?: React.KeyboardEventHandler<HTMLInputElement>;
  disabled?: boolean;
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
  inputOnBlur,
  inputRef,
  inputRequired,
  inputPattern,
  inputValidate,
  hideError,
  labelHidden = true,
  labelClassName,
  inputKeydown,
  disabled = false
}: IProps) {
  const { ref, rest, error, value, resetInput } = useCoreInputField({
    inputName,
    inputRequired,
    inputOnChange,
    inputOnBlur,
    inputPattern,
    inputValidate
  });

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
          onKeyDown={inputKeydown}
          minLength={inputMinLength}
          maxLength={inputMaxLength}
          disabled={disabled}
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
            className="absolute right-0 inline-flex justify-center items-center w-10 h-full"
          >
            <XIcon
              className="w-4 h-4 p-1 rounded-full object-center bg-gray-500 fill-white"
              aria-label="초기화"
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
