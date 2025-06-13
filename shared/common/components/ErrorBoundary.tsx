import React, { ReactNode } from "react";
import { toast } from "react-toastify";
import * as Sentry from "@sentry/nextjs";

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
  errorMessage?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    if (this.props.errorMessage) {
      toast.warn(this.props.errorMessage);
    }

    Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
