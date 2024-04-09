import React from "react";
import { useFormContext } from "react-hook-form";

export default function NicknameError() {
  const { formState } = useFormContext();
  const error = formState.errors["nickname"];
  return (
    error && (
      <p className="text-xs ml-1 mt-1 text-red-400">
        {typeof error.message === "string" && error.message}
      </p>
    )
  );
}
