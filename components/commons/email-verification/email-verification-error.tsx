import useVerificationCodeStatus from "@/hooks/commons/email-verification/useVerificationCodeStatus";
import React from "react";

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
