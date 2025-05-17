"use client";

import React, { Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

interface IProps {
  suspenseFallback: React.ReactNode;
  errorFallback: React.ReactNode;
  children: React.ReactNode;
}

export default function SuspenseErrorBoundary({
  suspenseFallback,
  errorFallback,
  children
}: IProps) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
