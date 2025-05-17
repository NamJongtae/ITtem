"use client";

import React, { Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

interface IProps {
  susnpenseFallback: React.ReactNode;
  errorFallback: React.ReactNode;
  children: React.ReactNode;
}

export default function SuspenseErrorBoundary({
  susnpenseFallback,
  errorFallback,
  children
}: IProps) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={susnpenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
