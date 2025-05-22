"use client";

import React, { Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

interface IProps {
  suspenseFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  children: React.ReactNode;
  errorMessage?: string;
}

export default function SuspenseErrorBoundary({
  suspenseFallback = null,
  errorFallback = null,
  errorMessage,
  children
}: IProps) {
  return (
    <ErrorBoundary fallback={errorFallback} errorMessage={errorMessage}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
