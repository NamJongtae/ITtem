import React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface IProps {
  emailError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export default function EmailError({ emailError }: IProps) {
  return (
    emailError?.message && (
      <p className="text-xs ml-1 mt-1 text-red-400">
        {typeof emailError.message === "string" ? emailError.message : ""}
      </p>
    )
  );
}
